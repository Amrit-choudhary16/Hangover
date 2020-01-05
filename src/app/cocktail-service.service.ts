import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Drink} from './models/drink';

import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CocktailServiceService {

  basePath = 'https://the-cocktail-db.p.rapidapi.com/filter.php?c=Cocktail';
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
      'x-rapidapi-key': '3f635b6c8dmshd9e0aa027e03335p1a054djsn01f010459a26'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
       console.error('An error occurred:', error.error.message);
    } else {
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    return throwError(
        'Something bad happened; please try again later.');
  }

  getList(): Observable<Drink> {
    return this.http
        .get<Drink>(this.basePath, this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        );
  }
}
