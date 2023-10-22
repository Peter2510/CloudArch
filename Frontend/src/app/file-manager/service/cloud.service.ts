import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archivo } from 'src/app/Models/Archivo';
import { Directorio } from 'src/app/Models/Directorio';



@Injectable({
  providedIn: 'root'
})
export class CloudService {

  private baseURL = "http://localhost:3000/cloud-arch";

  constructor(private http:HttpClient) { }

  public directorios(usuario: any,directorio_padre:any): Observable<Directorio[]> {
    const params = new HttpParams().set('usuario', usuario).
    set('directorio_padre',directorio_padre);

    return this.http.get<Directorio[]>(`${this.baseURL}/directorios`, {params} );
      
  }

  public archivos(usuario: any,directorio:any): Observable<Archivo[]> {
    const params = new HttpParams().set('usuario', usuario).
    set('directorio_padre',directorio);

    return this.http.get<Archivo[]>(`${this.baseURL}/archivos`, {params} );
   
  }

  public editarContenido(id:any,contenido:any):Observable<any>{
    const request = {
      _id: id,
      contenido:contenido,
    }
     return this.http.put(`${this.baseURL}/editar-contenido`, request);
  }

  public archivo(archivo:any): Observable<any> {

    const params = new HttpParams().set('nombre', archivo.nombre).
    set('extension',archivo.extension).
    set('directorio_padre',archivo.directorio_padre).
    set('propietario',archivo.propietario);
    
    return this.http.get<any>(`${this.baseURL}/archivo`, {params} );
      
  }

  public renombrarArchivo(id:any,nombre:any,extension:any):Observable<any>{
    const request = {
      id: id,
      nombre:nombre,
      extension:extension,
    }
     return this.http.put<any>(`${this.baseURL}/renombrar-archivo`, request);
  }

  public moverArchivo(id:any,directorio_padre:any):Observable<any>{
    const request = {
      _id: id,
      directorio_padre:directorio_padre,
    }
     return this.http.put<any>(`${this.baseURL}/mover-archivo`, request);
  }



  
  
}
