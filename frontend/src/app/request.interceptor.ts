import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req); // Log the request
    const newRequest = req.clone({
      headers: new HttpHeaders({
        token: '12342423423', // Add your custom headers here
      }),
    });
    return next.handle(newRequest); // Pass the new request to the next handler
  }
}
