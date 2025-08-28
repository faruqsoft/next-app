process.env.GCLOUD_KEY_FILE = './gcloud-key.json';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co', 'i.ibb.co.com'], // Adding both possible domains for safety
  },
};

module.exports = nextConfig;
