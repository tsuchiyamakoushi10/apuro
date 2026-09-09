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
ISLAND_CODE = 13361  # これ以上は島嶼部。東京の形が横に伸びるので外す
WIDTH = 1000.0
EPS = 0.0012  # 約110m。表示幅900pxで1px程度なので見た目は変わらない
MIN_AREA = 3e-6  # 小さすぎる飛び地は落とす


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


def main(src, dest):
    data = json.load(open(src))
    feats = []
    for f in data["features"]:
        p = f["properties"]
        name, code = p.get("N03_004"), p.get("N03_007")
        if not name or not code or int(code) >= ISLAND_CODE:
            continue
        feats.append((name, f["geometry"]))

    xs, ys = [], []
    for _, g in feats:
        for r in rings(g):
            for x, y in r:
                xs.append(x)
                ys.append(y)
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)

    # 正距円筒。緯度に合わせて横を縮める。この範囲なら歪みは出ない
    kx = math.cos(math.radians((miny + maxy) / 2))
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
            d = [f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"]
            d += [f"L{x:.1f} {y:.1f}" for x, y in pts[1:-1]]
            d.append("Z")
            subs.append("".join(d))

    missing = TARGETS - set(by_name)
    if missing:
        raise SystemExit(f"対応エリアが元データに見つからない: {missing}")

    others = "".join("".join(v) for k, v in by_name.items() if k not in TARGETS)
    mine = "".join("".join(by_name[k]) for k in TARGETS)
    stroke = 'stroke="#FFFFFF" stroke-width="1.4" stroke-linejoin="round"'
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH:.0f} {height:.0f}">'
        f'<path d="{others}" fill="#DCEAF3" {stroke}/>'
        f'<path d="{mine}" fill="#2A6FA8" {stroke}/>'
        "</svg>"
    )
    open(dest, "w").write(svg)
    print(f"{dest} {len(svg)} bytes / viewBox 0 0 {WIDTH:.0f} {height:.0f}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
