// import { TestBed } from '@angular/core/testing';
// import { HTTP_INTERCEPTORS, HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { RequestInterceptor } from './request.interceptor';
// import { HttpRequest } from '@angular/common/http';
// import { of } from 'rxjs';

// // Mock Next class to simulate HttpHandler
// class MockNext {
//   handle(req: HttpRequest<any>) {
//     return of(req);
//   }
// }

// describe('RequestInterceptor', () => {
//   let interceptor: RequestInterceptor;
//   let httpTestingController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         RequestInterceptor,
//         { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
//       ],
//     });

//     interceptor = TestBed.inject(RequestInterceptor);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   it('should be created', () => {
//     expect(interceptor).toBeTruthy();
//   });

//   it('should add a token to the headers', () => {
//     const mockNext = new MockNext();
//     const mockRequest = new HttpRequest('GET', '/api/rooms');

//     interceptor.intercept(mockRequest, mockNext).subscribe(req => {
//       expect(req.headers.has('token')).toBeTrue();
//       expect(req.headers.get('token')).toBe('12342423423');
//     });
//   });
// });
