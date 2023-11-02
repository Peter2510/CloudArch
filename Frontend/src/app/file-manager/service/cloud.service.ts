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

  public directoriosEspecificosPapelera(directorio_padre:any,propietario:any): Observable<Directorio[]> {
    const params = new HttpParams().set('directorio_padre', directorio_padre).
    set('propietario',propietario);

    return this.http.get<Directorio[]>(`${this.baseURL}/directorios-papelera`, {params} );
      
  }

  public archivosEspecificosPapelera(directorio_padre:any,propietario:any): Observable<Archivo[]> {
    const params = new HttpParams().set('directorio_padre', directorio_padre).
    set('propietario',propietario);

    return this.http.get<Archivo[]>(`${this.baseURL}/archivos-papelera`, {params} );
      
  }

  public directoriosPapeleraInicio(directorio_padre:any): Observable<Directorio[]> {
    const params = new HttpParams().set('directorio_padre',directorio_padre);

    return this.http.get<Directorio[]>(`${this.baseURL}/directorios-papelera-inicio`, {params} );
      
  }

  public archivosPapeleraInicio(directorio_padre:any): Observable<Archivo[]> {
    const params = new HttpParams().set('directorio_padre',directorio_padre);

    return this.http.get<Archivo[]>(`${this.baseURL}/archivos-papelera-inicio`, {params} );
   
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

  public listarDirectorios(propietario:any):Observable<any>{

    const params = new HttpParams().set('propietario',propietario);
    
    return this.http.get<any>(`${this.baseURL}/directorios-usuario`, {params} );
     
  }

  public moverArchivo(id:any,directorio_padre:any):Observable<any>{
    const request = {
      id: id,
      directorio_padre:directorio_padre
    }
      
     return this.http.put<any>(`${this.baseURL}/mover-archivo`, request);
  }

  public eliminarArchivo(id:any):Observable<any>{
    const request = {
      id: id
    }
      
     return this.http.put<any>(`${this.baseURL}/eliminar-archivo`, request);
  }

  public eliminarArchivoCompartido(id:any):Observable<any>{
    const request = {
      id: id
    }
      
     return this.http.put<any>(`${this.baseURL}/eliminar-archivo-compartido`, request);
  }

  public crearArchivo(archivo:any):Observable<any>{
    const request = {
      nombre: archivo.nombre,
      extension: archivo.extension,
      contenido: archivo.contenido,
      directorio_padre: archivo.directorio_padre,
      propietario: archivo.propietario
    }
      
     return this.http.post<any>(`${this.baseURL}/crear-archivo`, request);
  }


  public directorio(directorio:any): Observable<any> {

    const params = new HttpParams().set('nombre', directorio.nombre).
    set('directorio_padre',directorio.directorio_padre).
    set('propietario',directorio.propietario);
    
    return this.http.get<any>(`${this.baseURL}/directorio`, {params} );
      
  }
  
  public crearDirectorio(directorio:any):Observable<any>{
    const request = {
      nombre: directorio.nombre,
      directorio_padre: directorio.directorio_padre,
      propietario: directorio.propietario
    }
      
     return this.http.post<any>(`${this.baseURL}/crear-directorio`, request);
  }

  public detalleDirectorio(id:any): Observable<Directorio> {

    const params = new HttpParams().set('_id', id);
        
    return this.http.get<Directorio>(`${this.baseURL}/detalles-directorio`, {params} );
      
  }

  public eliminarDirectorio(id:any,propietario:any):Observable<any>{
    const request = {
      id: id,
      propietario:propietario
    }
      
     return this.http.put<any>(`${this.baseURL}/eliminar-directorio`, request);
  }

  public copiarArchivo(id:any):Observable<any>{
    const request = {
      id:id
    }
      
     return this.http.post<any>(`${this.baseURL}/copiar-archivo`, request);
  }

  public compartirArchivo(id:any,usuarios:any):Observable<any>{
    const request = {
      usuarios:usuarios,
      id:id
    }
      
     return this.http.post<any>(`${this.baseURL}/compartir-archivo`, request);
  }

  public copiarDirectorio(id:any):Observable<any>{
    const request = {
      id:id
    }
      
     return this.http.post<any>(`${this.baseURL}/copiar-directorio`, request);

  }

  public moverDirectorio(id:any,nuevo_directorio:any):Observable<any>{
    const request = {
      id: id,
      nuevo_directorio_padre:nuevo_directorio
    }
      
     return this.http.put<any>(`${this.baseURL}/mover-directorio`, request);
  }  

  
  
}
