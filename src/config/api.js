// MediMart API Configuration
// Replace with your actual WooCommerce or custom API endpoint
export const API_CONFIG = {
  baseUrl: 'https://medimart.com.bd/wp-json/wc/v3',
  consumerKey: 'YOUR_CONSUMER_KEY',
  consumerSecret: 'YOUR_CONSUMER_SECRET',
  perPage: 20,
  placeholderImage: 'https://via.placeholder.com/300x300.png?text=Medicine',
  hotline: '09610016778',
  whatsapp: '+8801810117100',
};

export const getAuthParams = () => {
  return 'consumer_key=' + API_CONFIG.consumerKey + '&consumer_secret=' + API_CONFIG.consumerSecret;
};
