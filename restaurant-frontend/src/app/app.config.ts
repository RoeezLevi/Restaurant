import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const APPICATION_TITLE = new InjectionToken<string>(
  'title of application'
);
export const BASE_SERVER_URL = new InjectionToken<string>('base url of server');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APPICATION_TITLE, useValue: 'restaurant stock' },
    { provide: BASE_SERVER_URL, useValue: 'http://localhost:3000/api' },
    provideHttpClient(),
    provideRouter(routes), provideAnimationsAsync(),
  ],
};
