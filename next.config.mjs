import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'tenant1.localhost',
                pathname: '/storage/**',
            },
            {
                protocol: 'https',
                hostname: '*.r2.cloudflarestorage.com',
                pathname: '/tenant1-ecommerce-backend-loyaldevs/products/**',
            }
        ],
    }
};

export default withNextIntl(nextConfig);