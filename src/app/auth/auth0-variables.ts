interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'yzdNKOs91kGApLZMMHerKpUSgxNcgheJ',
  domain: 'api-de-la-pilea.eu.auth0.com',
  callbackURL: 'http://localhost:4200/callback',
  apiUrl: 'https://api-de-la-pilea.eu.auth0.com/api/v2/'
};
