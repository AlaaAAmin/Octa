import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get token(): String {
    return localStorage.getItem('token')
  }

  loginForProvider(credentials: { email: String, password: String }) {
    return this.http.post('http://localhost:3000/provider/auth', credentials).toPromise()
  }

  registerForProvider() {

  }

  loginForStudent() {

  }

  registerForStudent() {

  }

}
