import Config from '@config/config';

export default (Config.isDev
    ? {
          'process.env.COUPONS_PRODUCTS_SERVICE_HOST': JSON.stringify(
              'https://us-east-1-rnd-integration-microservices.daytwo-app.net/coupons-products-service'
          ),
          'process.env.BILLING_SERVICE_HOST': JSON.stringify(
              'https://us-east-1-rnd-integration-microservices.daytwo-app.net/billing-service'
          )
      }
    : {});
