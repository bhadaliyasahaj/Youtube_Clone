import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { RequestInterceptor } from './request.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), { provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG }, provideHttpClient(), { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }, provideAnimationsAsync()]
};
