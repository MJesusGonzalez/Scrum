import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmarPregunta, mostrarListadoCompletado } from './helpers/menu.js';
import {Tareas} from './models/tareas.js';
console.clear()

const main = async() => { 
    let opcion = '';
    const listaTareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){ //cargar tareas
        //Establecer las tareas
        listaTareas.cargarTareasFromArray(tareasDB).getListado;
    }
    do{
        // Imprimir el menu
        opcion = await inquirerMenu();  
        switch (opcion) {
            case '1':   // Crear tarea
                const desc = await leerInput('Descripcion: ');
                listaTareas.crearTarea(desc);
                break;
            case '2':  // Listar todas las tareas
                listaTareas.listadoCompleto();
                break;
            case '3':  // Listar las tareas completadas
                listaTareas.tareasCompletadasPendientes(true);
                break;
            case '4': // Listar las tareas pendientes
                listaTareas.tareasCompletadasPendientes(false);
                break;
            case '5': // marcar como completadas y pendientes 
                const ids= await mostrarListadoCompletado(listaTareas.getListado);
                listaTareas.toggleCompletadas(ids);
                break;
            case '6': // Borrar tareas
                const id = await listadoTareasBorrar(listaTareas.getListado);
                if (id !== '0') {
                    const confirmar = await confirmarPregunta('Estas Seguro ?');
                    if (confirmar) {
                        listaTareas.borrarTarea(id);
                        console.log('  Tarea borrada');
                    }
                }
                break;
            
        }
        guardarDB(listaTareas.getListado);
        await pausa();
    }while(opcion !== '0');
 }

 main();




