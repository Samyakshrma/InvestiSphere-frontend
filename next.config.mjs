/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // --- ADD THIS SECTION ---
  // This is the magic part!
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Matches all calls to /api/...
        destination: 'http://localhost:8000/:path*', // Forwards them to your Python backend
      },
    ];
  },
  // --- END OF SECTION TO ADD ---
};

export default nextConfig;

