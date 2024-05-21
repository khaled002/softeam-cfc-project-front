import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {

  private baseUrl = 'http://localhost:8080/api/collaborateur';

  constructor(private http: HttpClient) { }


  calculateCarbonFoorPrint(collaborateurForm : any) : Observable<any> {
    const url = `${this.baseUrl}/cfc`;
    return this.http.post<any>(url,collaborateurForm);
  }

  getCollaborateurByEmail(email: string) {
    return this.http.get(`${this.baseUrl}/email/${email}`);
  }

}
