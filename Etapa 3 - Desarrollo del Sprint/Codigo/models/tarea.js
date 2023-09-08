import {v4 as uuidv4}  from 'uuid';
import colors from 'colors';

export class Tarea{
    static fromJson({id,descripcion,completado}){
        const tarea = new Tarea(descripcion);
        console.log('tareas: ',tarea.getDescripcion)
        tarea.#id = id;
        tarea.#completado = completado;
        tarea.#descripcion = descripcion;
        return tarea
    }
    #id ='';
    #descripcion='';
    #completado=null;
    constructor(descripcion){
        this.#descripcion = descripcion;
        this.#id = uuidv4();
        this.#completado = false;
    }
    get getDescripcion(){
        return this.#descripcion;
    }
    get getCompletado(){
        return this.#completado;
    }
    get getId(){
        return this.#id;
    }
    set setCompletado(completado){
        this.#completado = completado;
    }    
}


