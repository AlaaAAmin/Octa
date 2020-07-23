import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  createCourse(data) {
    return this.http.post('http://localhost:3000/courses/add', data).toPromise()
  }

  purchaseCourse(courseId, token) {
    return this.http.post(`http://localhost:3000/courses/${courseId}/checkout`, { token: token }).toPromise()
  }
}
