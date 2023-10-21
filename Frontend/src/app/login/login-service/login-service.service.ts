import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { Usuario } from 'src/app/Models/Usuario';

const baseURL = "http://localhost:3000/cloud-arch";

@Injectable({
  providedIn: 'root'
})

export class LoginService {


  constructor(private http:HttpClient) { }

  public loginStatusSubject = new Subject<boolean>;


public verificarCredenciales(loginData: any): Observable<Usuario> {

  return this.http.post<Usuario>(`${baseURL}/login`, loginData);
    
}

  public sesion(usuario:any){
    //Guarda el objeto retornado en el local storage
    localStorage.setItem('usuario',JSON.stringify(usuario));
  }

  public estaLoggeado(){
    let userStorage = localStorage.getItem('usuario');

    if(userStorage==undefined || userStorage == '' || userStorage == null){
      return false;
    }else{
      return true;
    }

  }

  public logOut(){
    localStorage.removeItem('usuario');
    return true;
  }

  public getUsuario(){
    let userStorage = localStorage.getItem('usuario');
    if(userStorage!=null){
      return JSON.parse(userStorage);
    }else{
      this.logOut();
      return null;
    }
  }

  public getRol(){
    let userStorage = this.getUsuario();
    if(userStorage!=null){
      return userStorage.rol;
    }else{
      this.logOut();
      return null;
    }
  }

  public getNombre(){
    let userStorage = this.getUsuario();
    if(userStorage!=null){
      return userStorage.nombre;
    }else{
      this.logOut();
      return null;
    }
  }

  public getNombreUsuario(){
    let userStorage = this.getUsuario();
    if(userStorage!=null){
      return userStorage.usuario;
    }else{
      this.logOut();
      return null;
    }
  }

}
