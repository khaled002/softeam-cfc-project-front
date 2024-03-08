import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurAdminService {

  private baseUrl = 'http://localhost:8080/api/collaborateurs/admin';

  private mailSenderUrl = 'http://localhost:8080/api/collaborateurs/admin/mails';

  constructor(private http: HttpClient) { }



  getAllCollaborateurs(): Observable<any> {
  return this.http.get(this.baseUrl+'/all');
}

addCollaborateur(collaborateur: any): Observable<any> {
  return this.http.put(`${this.baseUrl+'/add'}`, collaborateur);
}

updateCollaborateur(collaborateur:  any): Observable<any> {
  return this.http.put(`${this.baseUrl+'/edit'}`, collaborateur);
}

deleteCollaborateur(id:  any): Observable<any> {
  const url = `${this.baseUrl}/delete/${id}`;
  return this.http.delete(url);
} 

deleteCollaborateurs(ids: any[]): Observable<any> {
    const params = ids.join(',');
  const url = `${this.baseUrl}/delete/all?ids=${params}`;
  return this.http.delete(url);
}

sendEmails(ids : any[]) : Observable<any> {
  const params = ids.join(',');
  const url = `${this.mailSenderUrl}/list`;
  return this.http.post<string[]>(url,ids);
}


}
