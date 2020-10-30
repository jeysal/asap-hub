/* istanbul ignore file */

const {
  SQUIDEX_BASE_URL,
  SQUIDEX_APP_NAME,
  SQUIDEX_CLIENT_ID,
  SQUIDEX_CLIENT_SECRET,
} = process.env;

export default {
  clientId: SQUIDEX_CLIENT_ID || '5eec9b8133e8330001a8aae9',
  clientSecret:
    SQUIDEX_CLIENT_SECRET || 'iwsrcubobxxxrnropuj5k0xe4gjxip42tflvx5pv1a8x',
  appName: SQUIDEX_APP_NAME || 'asap-local',
  baseUrl: SQUIDEX_BASE_URL || 'http://localhost:4004',
};
