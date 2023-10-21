import { Component, OnInit } from '@angular/core';
import { CloudService } from './service/cloud.service';
import { LoginService } from '../login/login-service/login-service.service';
import { Directorio } from '../Models/Directorio';
import { Archivo } from '../Models/Archivo';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit{

  rutas: String[] = [];
  root:String = "/";
  path:String;
  directorios:Directorio[];
  archivos:Archivo[];

  constructor(private cloudService:CloudService,private loginService:LoginService){}
    
  ngOnInit(): void {
        this.path = this.root;
        this.obtenerDirectorios();
        this.obtenerArchivos();
    }

  private obtenerDirectorios(){
    
    let usuario = this.loginService.getNombreUsuario();
    this.cloudService.directorios(usuario,this.path).subscribe(data=>{
      this.directorios = data;
    })
  }

  private obtenerArchivos(){
    let usuario = this.loginService.getNombreUsuario();
    this.cloudService.archivos(usuario,this.path).subscribe(data=>{
      this.archivos = data;
    })
  }

  public entrarCarpeta(pathCarpeta:String){
    this.rutas.push(pathCarpeta);  
    this.path = "/"+ this.rutas.join('/');
    this.obtenerDirectorios();
    this.obtenerArchivos();

  }

  public salirCarpeta(){

    this.rutas.pop();

    this.path = "/"+ this.rutas.join('/');
    this.obtenerDirectorios();
    this.obtenerArchivos();


  }



}
