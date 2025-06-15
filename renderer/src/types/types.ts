export type ConnectionState =
  | 'offline'
  | 'loading'
  | 'error'
  | 'connected'
  | 'quitting';

export type ApiConfig = {
  apiEndpoint: string;
  apiToken: string;
};
