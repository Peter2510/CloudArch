import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archivo } from 'src/app/Models/Archivo';
import { Directorio } from 'src/app/Models/Directorio';


@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  private baseURL = "http://localhost:3000/cloud-arch";

  constructor(private http:HttpClient) { }


  public archivosCompartidoInicio(directorio_padre:any,propietario:any): Observable<Archivo[]> {
    const params = new HttpParams().set('directorio_padre', directorio_padre).
    set('propietario',propietario);

    return this.http.get<Archivo[]>(`${this.baseURL}/archivos-compartido-inicio`, {params} );
   
  }

  public archivosEspecificosCompartido(directorio_padre:any,propietario:any): Observable<Archivo[]> {
    const params = new HttpParams().set('directorio_padre', directorio_padre).
    set('propietario',propietario);

    return this.http.get<Archivo[]>(`${this.baseURL}/archivos-compartido`, {params} );
      
  }

}
