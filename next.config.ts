import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|jpeg|webp)$/i,
      type: 'asset/resource'
    })
    return config
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during the build process
  }
}

export default nextConfig
