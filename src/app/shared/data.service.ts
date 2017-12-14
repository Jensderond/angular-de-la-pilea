interface AppConfig {
  tokenName: string;
  apiUrl: string;
  apiUrlDev: string;
}

export const APP_CONFIG: AppConfig = {
  tokenName: 'access_token',
  apiUrl: 'https://morning-fjord-94264.herokuapp.com/api',
  apiUrlDev: 'http://localhost:3010/api'
};
