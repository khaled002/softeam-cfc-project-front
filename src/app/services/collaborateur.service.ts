import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {

  private baseUrl = 'http://localhost:8080/api/collaborateur';
  private eventSubject = new Subject<void>()

  constructor(private http: HttpClient) { }


  emitEvent() {
    this.eventSubject.next();
  }

  getEvent() {
    return this.eventSubject.asObservable();
  }


  calculateCarbonFoorPrint(collaborateurForm : any) : Observable<any> {
    const url = `${this.baseUrl}/cfc`;
    return this.http.post<any>(url,collaborateurForm);
  }

  getCollaborateurByEmail(email: string) {
    return this.http.get(`${this.baseUrl}/email/${email}`);
  }

  getStatiqueCollaborateurs(){
    return this.http.get(`${this.baseUrl}/stats`);
  }

}
