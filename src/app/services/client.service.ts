import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/api/clients';

  
  constructor(private http: HttpClient) { }

  getClientsList( ) : Observable<any>{
    return this.http.get(this.baseUrl+'/list');
  }

}
