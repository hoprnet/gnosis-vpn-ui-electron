export type ConnectionState = 'offline' | 'loading' | 'error' | 'connected';

export type ApiConfig = {
  apiEndpoint: string;
  apiToken: string;
};
