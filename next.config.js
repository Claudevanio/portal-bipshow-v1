/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // BASE_URL: 'https://hml.uzerticket.com.br:8180/',
    // APP_TOKEN: 'Bearer 91babceebc4dbcc80a89ba7bb1b60805',
    URL_API: 'https://uzerticket.com.br/',
    // APP_TOKEN: 'Bearer a134ead7014d1da52f2c686b07bcf79e',
    BASE_URL_IMAGES: 'https://uzerticket.com.br',
  },
  images: {
    domains: ['uzerpass-imagens.s3.sa-east-1.amazonaws.com', 'uzerticket-imagens.s3.sa-east-1.amazonaws.com'],
  },
  compiler:{
    styledComponents: true,
  }
  // swcMinify: true
}

module.exports = nextConfig
