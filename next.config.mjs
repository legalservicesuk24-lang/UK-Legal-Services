/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next 16 default-restricts optimized quality to [75]; the founder
    // avatars ask for 90 to stay sharp once CSS zooms into the crop.
    qualities: [75, 90],
  },
};

export default nextConfig;
