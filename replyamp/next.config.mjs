
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const apiUrl = process.env.NEXT_PUBLIC_QR_EMBED_URL || 'https://www.stacklive.dev/';
    let curationPlatformOrigin = '*';
    try {
      curationPlatformOrigin = new URL(apiUrl).origin;
    } catch (error) {
      console.error("Could not parse NEXT_PUBLIC_QR_EMBED_URL for CSP header, falling back to wildcard.", error);
    }

    // CSP allows the app to be embedded in browser extensions
    // frame-ancestors includes chrome-extension:, moz-extension:, and safari-web-extension:
    const csp = `
      default-src 'self' ${curationPlatformOrigin};
      script-src 'self' 'unsafe-inline' 'unsafe-eval' ${curationPlatformOrigin} https://openfpcdn.io https://cdn.jsdelivr.net;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' data:;
      connect-src 'self' ${curationPlatformOrigin} https://openfpcdn.io;
      frame-src 'self' ${curationPlatformOrigin};
      frame-ancestors 'self' ${curationPlatformOrigin} chrome-extension: moz-extension: safari-web-extension: *;
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
    