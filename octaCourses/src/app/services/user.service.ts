import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  connectProviderToStripe(data) {
    return this.http.post('http://localhost:3000/providers/:id/stripe', data)
  }
}
