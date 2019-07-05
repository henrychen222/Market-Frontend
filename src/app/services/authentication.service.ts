import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, BehaviorSubject} from 'rxjs';

import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { Buyer } from '../models/buyer.model';

const url = 'http://localhost:8080/MarketApp';

@Injectable()
export class AuthenticationService implements OnInit {

  private currentUserSubject: BehaviorSubject<Buyer>;
  public currentUser: Observable<Buyer>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Buyer>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Buyer {
    return this.currentUserSubject.value;
  }

  ngOnInit() {
  }

  userHttpInfo(): void {
    console.log('User http service...');
  }

  login(name, pwd) {
    const buyer = {
      username: name,
      password: pwd
    };
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.post<any>('http://localhost:8080/MarketApp/login', JSON.stringify(buyer), options)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        console.log(user)
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        catchError(this.handleError<any>('login', []));
        return user;
      }));
  }

  /* Wei Chen 4.29 */
  register(name, pwd, eml, fname, lname) {
    const buyer = {
      username: name,
      password: pwd,
      email: eml,
      firstname: fname,
      lastname: lname
    };
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: httpHeaders
    };

    // use observable, options: instance of Observable that can be later subscribed/updated
    // another way is to use Promise https://www.concretepage.com/angular-2/angular-2-http-post-example
    return this.http.post<any>('http://localhost:8080/MarketApp/register', JSON.stringify(buyer), options)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('newUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // added by Wei
    this.router.navigateByUrl('login');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(message);
  }
}
