import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

export interface authResponseData {
    idToken: string,
    email: string,
    refreshToker: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { }
    signUp(email, password) {

        let postData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo2QStUv80Ay2NbOw8hnycHXV3WtqMGKw', postData)
            .pipe(catchError(this.handleError));
    }

    login(email, password) {
        let postData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo2QStUv80Ay2NbOw8hnycHXV3WtqMGKw', postData)
            .pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg = 'An unknown error...!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'Email already exists...!';
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'Email not registered...!';
        }
        switch (errorRes.error.error.message) {
            case 'INVALID_PASSWORD':
                errorMsg = 'Invalid password, try again with correct password...!';
        }
        switch (errorRes.error.error.message) {
            case 'USER_DISABLED':
                errorMsg = 'User is disabled.. Please contact admin!';
        }
        return throwError(errorMsg);
    }
}