import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ua.beton.app',
  appName: 'BETON',
  webDir: 'dist',
  server: {
    iosScheme: 'beton',
    androidScheme: 'https'
  }
};

export default config;
