import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.auth.currentUserValue;

    if (currentUser && currentUser.token) {
      //azért kell klónozni, hogy ne változzon benne semmi,
      //csak a token kerüljön be a fejlécbe!
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}


//az interceptor feladata, hogy minden kimenő http hívás fejlécébe
//beleépítse a tokent, ha van.