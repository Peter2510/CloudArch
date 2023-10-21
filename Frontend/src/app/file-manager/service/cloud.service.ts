import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archivo } from 'src/app/Models/Archivo';
import { Directorio } from 'src/app/Models/Directorio';

const baseURL = "http://localhost:3000/cloud-arch";

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(private http:HttpClient) { }

  public directorios(usuario: any,directorio:any): Observable<Directorio[]> {

    const params = new HttpParams().set('usuario', usuario).
    set('directorio',directorio);

    return this.http.get<Directorio[]>(`${baseURL}/directorios`, {params} );
      
  }

  public archivos(usuario: any,directorio:any): Observable<Archivo[]> {

    const params = new HttpParams().set('usuario', usuario).
    set('directorio',directorio);

    return this.http.get<Archivo[]>(`${baseURL}/archivos`, {params} );
      
  }
  
}
