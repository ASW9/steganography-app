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
  }
}

export default nextConfig