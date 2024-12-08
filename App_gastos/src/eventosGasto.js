import { getTime } from "date-fns";
import { abrirForumularioGasto } from "./eventoBtnFormularioGasto";
import cargarGastos from "./cargarGastos";
import cargarTotalGastado from "./cargarTotalGastado";

const contenedorGastos = document.getElementById('gastos');

//Función para mostrar los botones
contenedorGastos.addEventListener('click', (e) => {
    //Accedemos al target del gasto
    const gasto = e.target.closest('.gasto');

    //Si gasto existe
    if (gasto) {
        //Nos permite saber en donde se encuentra el scroll
        if (gasto.scrollLeft != 0) {
            //Mostramos el contenedor de botones
            gasto.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest'
            });
        } else {
            //Mostramos el contenedor de botones
            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest'
            });
        }
    }

    //Si da click en el elemento que tiene la clase data-accion de editar gasto
    if (e.target.closest('[data-accion = "editar-gasto"]')) {
        //Obtenemos el id del gasto que queremos editar
        const id = gasto.dataset.id;

        //Obtenemos los gastos y los convertimos en un objeto para poder manipularlos
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        //Variable para guardar los precios
        let precio = '', descripcion = '';

        //Comprobamos si hay gastos
        if (gastosGuardados && gastosGuardados.length > 0) {
            gastosGuardados.forEach((gasto) => {
                if (id === gasto.id) {
                    precio = gasto.precio;
                    descripcion = gasto.descripcion;
                }
            });
            //Accedemos a los inputs del formulario e incrustamos los datos
            document.querySelector('#formulario-gasto #descripcion').value = descripcion;
            document.querySelector('#formulario-gasto #precio').value = precio;
            document.querySelector('#formulario-gasto').dataset.id = id;
            abrirForumularioGasto('editarGasto');
        }
    } else if (e.target.closest('[data-accion = "eliminar-gasto"]')) {
        //Obtenemos el id
        const id = gasto.dataset.id;

        //Obtenemos los gastos guardados
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        //Comprobamos que hay gastos
        if (gastosGuardados && gastosGuardados.length > 0) {
            //Guardamos los resultados del filtro
            const nuevosGastos = gastosGuardados.filter((gasto) => {
                //Si el gasto es diferente al id, guarda el elemento
                if (gasto.id !== id) {
                    return gasto;
                }
            });
            //Seteamos el nuevo arreglo con el metodo json stringify
            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));


        }
        //Recarga la ventana
        cargarGastos();
        cargarTotalGastado();
    }
});