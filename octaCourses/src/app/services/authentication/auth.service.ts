import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get token(): String {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWVjOTE4MjVkN2FmODFjYThlMDRjZjQiLCJlbWFpbCI6Im1hYm9jZWwzODFAdW5vbWFpbDkuY29tIiwiZmlyc3ROYW1lIjoiYWhtZWQiLCJsYXN0TmFtZSI6ImFzaHJhZiIsInBob25lIjoiKzIwMTAwNTQ1NjE2NiIsInBlcm1pc3Npb25MZXZlbCI6MSwicmVmcmVzaEtleSI6IjAzQXJQeXZBLzNUSWI5K0c3L0NjRFE9PSIsImlhdCI6MTU5MzQxMDI2OX0.dCWkREOytI_yJZ9eiLQsZ-uB3hewj1Ur_SUxBIZh20M'
    // return localStorage.getItem('token')
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
