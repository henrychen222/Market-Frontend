import { Injectable }  from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }
    return next.handle(req);
  }

}
