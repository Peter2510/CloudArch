import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    private baseURL = "http://localhost:3000/cloud-arch";

    constructor(private httpClient: HttpClient) { }
  
    //Obtener los empleados 
    obtenerListaUsuarios():Observable<Usuario[]>{
      return this.httpClient.get<Usuario[]>(`${this.baseURL}/empleados`);
    }

    //Crear empleados
    crearEmpleado(usuario:any):Observable<any>{
      return this.httpClient.post<any>(`${this.baseURL}/agregarUsuario`,usuario);
    }

}
