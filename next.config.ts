import type { NextConfig } from "next";

/**
 * CSP。静的サイトで middleware を置かないため nonce は使えず、
 * Next のインラインブートストラップと構造化データのぶん 'unsafe-inline' を許可する。
 * フォントは next/font でセルフホストされるため外部オリジンは要らない。
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  // アクセスマップのGoogleマップ埋め込み。maps.google.com は www.google.com へ転送されるので両方要る。
  // 既定は default-src の 'self' で、指定しないと地図が無言で読み込まれない。
  // 地図の中の通信（maps.googleapis.com など）はGoogle側のCSPで、こちらの指定は要らない。
  // Permissions-Policy で geolocation を切ってあるため「現在地」は動かない。地図の表示には要らない
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "font-src 'self'",
  "connect-src 'self'",
  // フォームはGoogleフォームへの外部リンク。自サイトから送信することはない
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
