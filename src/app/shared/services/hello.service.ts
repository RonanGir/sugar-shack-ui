import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  constructor(
    private httpClient: HttpClient
  ) { }

  sayHi(): Observable<any> {
    const baseUrl = 'http://localhost:8080/';
    const token = 'Basic dXNlcjpwYXNzd29yZA==';
    const path = 'public/api/hello';
    const options = {
      headers: new HttpHeaders({
        Authorization: token, // Set the Authorization header
      })
    }
    return this.httpClient.get(`${baseUrl}${path}`, options);
  }


}
