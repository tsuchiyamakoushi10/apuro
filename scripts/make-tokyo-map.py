"""
対応エリアの地図（public/images/tokyo-map.svg）を作り直すスクリプト。

    curl -sL -o /tmp/tokyo.json \
      https://raw.githubusercontent.com/smartnews-smri/japan-topography/main/data/municipality/geojson/s0010/N03-21_13_210101.json
    python3 scripts/make-tokyo-map.py /tmp/tokyo.json public/images/tokyo-map.svg

もとは国土交通省「国土数値情報（行政区域データ）」。利用約款で出典を書けば商用も可。
**ページに出典表記を残すこと。**

対応エリア（TARGETS）が変わったら作り直す。色はデザイントークンの --blue-soft と --blue。
"""

import json
import math
import sys

TARGETS = {"国分寺市", "小金井市", "小平市"}
ISLAND_CODE = 13361  # これ以上は島嶼部
WIDTH = 1000.0
EPS = 0.0004  # 約35m。寄せたぶん細かく残す。表示幅900pxで1px程度
MIN_AREA = 3e-6  # 小さすぎる飛び地は落とす
MARGIN = 60.0  # 切り取る余白。viewBox の外なので切り口の線は見えない

# 切り取る範囲。対象3市の中心から。東京都全域だと3市が小さくて分からないので寄せる。
# 20kmだと3市が横幅の半分を占める。隣接する市の名前を置く余白も残る
CROP_WIDTH_KM = 20.0
CROP_ASPECT = 1.7  # 横 : 縦
KM_PER_LAT = 110.95


def rings(geom):
    if geom["type"] == "Polygon":
        return geom["coordinates"]
    out = []
    for poly in geom["coordinates"]:
        out.extend(poly)
    return out


def rdp(pts, eps):
    """折れ線の間引き（Douglas-Peucker）"""
    if len(pts) < 3:
        return pts
    ax, ay = pts[0]
    bx, by = pts[-1]
    dx, dy = bx - ax, by - ay
    norm = math.hypot(dx, dy)
    imax, dmax = 0, 0.0
    for i in range(1, len(pts) - 1):
        px, py = pts[i]
        dist = (
            abs(dy * px - dx * py + bx * ay - by * ax) / norm
            if norm
            else math.hypot(px - ax, py - ay)
        )
        if dist > dmax:
            imax, dmax = i, dist
    if dmax > eps:
        return rdp(pts[: imax + 1], eps)[:-1] + rdp(pts[imax:], eps)
    return [pts[0], pts[-1]]


def ring_area(r):
    s = 0.0
    for i in range(len(r) - 1):
        s += r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1]
    return abs(s) / 2


def clip(ring, box):
    """矩形で切る（Sutherland-Hodgman）。範囲の外へ大きく伸びた形を落として軽くする。
    切り口が見えないよう、box は viewBox より一回り大きく取る"""
    x0, y0, x1, y1 = box
    edges = (
        (lambda p: p[0] >= x0, lambda a, b: (x0, a[1] + (b[1] - a[1]) * (x0 - a[0]) / (b[0] - a[0]))),
        (lambda p: p[0] <= x1, lambda a, b: (x1, a[1] + (b[1] - a[1]) * (x1 - a[0]) / (b[0] - a[0]))),
        (lambda p: p[1] >= y0, lambda a, b: (a[0] + (b[0] - a[0]) * (y0 - a[1]) / (b[1] - a[1]), y0)),
        (lambda p: p[1] <= y1, lambda a, b: (a[0] + (b[0] - a[0]) * (y1 - a[1]) / (b[1] - a[1]), y1)),
    )
    poly = ring[:-1] if ring[0] == ring[-1] else ring[:]
    for inside, cross in edges:
        if not poly:
            return []
        out = []
        for i, cur in enumerate(poly):
            prev = poly[i - 1]
            if inside(cur):
                if not inside(prev):
                    out.append(cross(prev, cur))
                out.append(cur)
            elif inside(prev):
                out.append(cross(prev, cur))
        poly = out
    return poly + [poly[0]] if poly else []


def centroid(ring):
    """多角形の重心。ラベルの位置に使う"""
    a = cx = cy = 0.0
    for i in range(len(ring) - 1):
        x0, y0 = ring[i]
        x1, y1 = ring[i + 1]
        cross = x0 * y1 - x1 * y0
        a += cross
        cx += (x0 + x1) * cross
        cy += (y0 + y1) * cross
    if a == 0:
        return ring[0]
    return (cx / (3 * a), cy / (3 * a))


def main(src, dest):
    data = json.load(open(src))
    feats = []
    for f in data["features"]:
        p = f["properties"]
        name, code = p.get("N03_004"), p.get("N03_007")
        if not name or not code or int(code) >= ISLAND_CODE:
            continue
        feats.append((name, f["geometry"]))

    # 対象3市の真ん中を中心に切り取る
    txs, tys = [], []
    for name, g in feats:
        if name in TARGETS:
            for r in rings(g):
                for x, y in r:
                    txs.append(x)
                    tys.append(y)
    lon0 = (min(txs) + max(txs)) / 2
    lat0 = (min(tys) + max(tys)) / 2
    kx = math.cos(math.radians(lat0))
    half_lon = CROP_WIDTH_KM / 2 / (KM_PER_LAT * kx)
    half_lat = CROP_WIDTH_KM / CROP_ASPECT / 2 / KM_PER_LAT
    minx, maxx = lon0 - half_lon, lon0 + half_lon
    miny, maxy = lat0 - half_lat, lat0 + half_lat

    # 範囲に掛からない市区町村は落とす。SVGは viewBox の外を切るので、掛かるものはそのまま置く
    def touches(g):
        for r in rings(g):
            for x, y in r:
                if minx <= x <= maxx and miny <= y <= maxy:
                    return True
        return False

    feats = [(n, g) for n, g in feats if touches(g)]

    # 正距円筒。緯度に合わせて横を縮める。この範囲なら歪みは出ない
    scale = WIDTH / ((maxx - minx) * kx)
    height = (maxy - miny) * scale

    by_name = {}
    for name, g in feats:
        subs = by_name.setdefault(name, [])
        for r in rings(g):
            if len(r) < 4 or ring_area(r) < MIN_AREA:
                continue
            simple = rdp(r, EPS)
            if len(simple) < 4:
                continue
            pts = [(((x - minx) * kx * scale), ((maxy - y) * scale)) for x, y in simple]
            pts = clip(pts, (-MARGIN, -MARGIN, WIDTH + MARGIN, height + MARGIN))
            if len(pts) < 4:
                continue
            d = [f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"]
            d += [f"L{x:.1f} {y:.1f}" for x, y in pts[1:-1]]
            d.append("Z")
            subs.append("".join(d))

    missing = TARGETS - set(by_name)
    if missing:
        raise SystemExit(f"対応エリアが元データに見つからない: {missing}")

    # ラベルはHTML側に置く（SVGに入れると画面幅で文字まで拡大縮小してしまうため）。
    # ページに書く位置をここで出す。端に寄りすぎるものは切れるので落とす
    INSET = 6.0
    for group in (True, False):
        print("  --- 対応エリア ---" if group else "  --- 近隣 ---")
        for name, g in feats:
            if (name in TARGETS) is not group:
                continue
            biggest = max(rings(g), key=ring_area)
            cx, cy = centroid(biggest)
            left = (cx - minx) / (maxx - minx) * 100
            top = (maxy - cy) / (maxy - miny) * 100
            if not (INSET <= left <= 100 - INSET and INSET <= top <= 100 - INSET):
                continue
            print(f'  {{ name: "{name}", left: "{left:.1f}%", top: "{top:.1f}%" }},')

    others = "".join("".join(v) for k, v in by_name.items() if k not in TARGETS)
    mine = "".join("".join(by_name[k]) for k in TARGETS)
    stroke = 'stroke="#FFFFFF" stroke-width="1.4" stroke-linejoin="round"'
    # width と height を必ず書く。書かないと SVG に元の大きさがなく、
    # <img> の height:auto でブラウザが高さを決められずに潰れる
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH:.0f}" height="{height:.0f}"'
        f' viewBox="0 0 {WIDTH:.0f} {height:.0f}">'
        f'<path d="{others}" fill="#DCEAF3" {stroke}/>'
        f'<path d="{mine}" fill="#2A6FA8" {stroke}/>'
        "</svg>"
    )
    open(dest, "w").write(svg)
    print(f"{dest} {len(svg)} bytes / viewBox 0 0 {WIDTH:.0f} {height:.0f}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
