import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

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
        return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo2QStUv80Ay2NbOw8hnycHXV3WtqMGKw', postData);
    }

    login(email, password) {
        let postData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo2QStUv80Ay2NbOw8hnycHXV3WtqMGKw', postData);
    }
}