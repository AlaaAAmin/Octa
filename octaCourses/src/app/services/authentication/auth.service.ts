import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private http: HttpClient) { }

  set UserToken(token) {
    localStorage.setItem('token', token.accessToken)
    localStorage.setItem('refresh_Token', token.refreshToken)
    localStorage.setItem('userId', token.id)
  }
  // loginForProvider is a method that calls api of provider login with provider credentials
  loginForProvider(credentials: { email: String, password: String }) {
    return this.http.post('http://localhost:3000/provider/auth', credentials).toPromise()
  }

  // registerForProvider is a method that calls api of provider registration with provider data
  registerForProvider(registrationData: { name: string, email: string, password: string, phone: string }) {
    return this.http.post('http://localhost:3000/provider/register', registrationData).toPromise()
  }

  // loginForStudent is a method that calls api of student login with student credentials
  loginForStudent(credentials: { email: String, password: String }) {
    return this.http.post('http://localhost:3000/student/auth', credentials).toPromise()
  }

  // registerForStudent is a method that calls api for student with student data
  registerForStudent(registrationData: { firstName: string, lastName: string, email: string, password: string, phone: string }) {
    return this.http.post('http://localhost:3000/student/register', registrationData).toPromise()
  }

}
