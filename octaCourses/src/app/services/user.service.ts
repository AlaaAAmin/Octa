import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getStudentInfo() {
    return this.http.get(`http://localhost:3000/student/${localStorage.getItem('userId')}`).toPromise()
  }

  updateStudentInfo(data) {
    return this.http.patch(`http://localhost:3000/student/${localStorage.getItem('userId')}`, data).toPromise()
  }


  connectProviderToStripe(data) {
    return this.http.post('http://localhost:3000/providers/:id/stripe', data)
  }
}
