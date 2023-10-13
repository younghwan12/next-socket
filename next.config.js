/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // 클라이언트 측 번들에서는 'net' 모듈을 제외
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
      }
    }

    return config
  },
}

module.exports = nextConfig
