export class Archivo{

_id:String;
nombre:String;
extension:String;
contenido:String;
directorio_padre:String;
propietario:String;
usuario_compartido:String;
fecha_creacion:String;
fecha_compartido:String;
hora_compartido:String;

constructor(nombre:String,extension:String, contenido:String, directorio_padre:String,propietario:String) {
    this.nombre = nombre;
    this.extension = extension;
    this.contenido = contenido
    this.directorio_padre = directorio_padre
    this.propietario = propietario
}

}