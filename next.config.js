/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/supervision', destination: '/experience', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },
    ];
  },
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'www.schongenial.at'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.schongenial.at', pathname: '/**' },
      { protocol: 'https', hostname: 'static.neshanmap.ir', pathname: '/**' },
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/**' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'en.tums.ac.ir', pathname: '/**' },
    ],
    unoptimized: false,
  },
}

module.exports = nextConfig
