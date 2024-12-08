//Importamos 
import { v4 as uuidv4 } from 'uuid';
import { cerrarForumularioGasto } from './eventoBtnFormularioGasto';
import cargarGastos from './cargarGastos';
import cargarTotalGastado from './cargarTotalGastado';


const formulario = document.querySelector('#formulario-gasto form');
const descripcion = formulario.descripcion;
const precio = formulario.precio;
const expRegDescripcion = /^[a-zA-Z0-9\_\- ]{4,30}$/;
const expRegPrecio = /^\d+(\.\d+)?$/;

//Comprobación de datos
const comprobarDescripcion = () => {
    if (!expRegDescripcion.test(descripcion.value)) {
        //Agregamos la clase error
        document.querySelector('.formulario-gasto__input').classList.add('formulario-gasto__input--error');

        //Agregamos el mensaje de error
        document.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');

        return false;
    } else {
        //Quitamos la clase error
        document.querySelector('.formulario-gasto__input').classList.remove('formulario-gasto__input--error');

        //Agregamos el mensaje de error
        document.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');
        return true;
    }
}

//Comprobar el precio
const comprobarPrecio = () => {
    if (!expRegPrecio.test(precio.value)) {
        //Agregamos la clase error
        precio.classList.add('formulario-gasto__input--error');

        //Agregamos el mensaje de error
        formulario.precio.parentElement.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');

        return false;
    } else {
        //Agregamos la clase error
        precio.classList.remove('formulario-gasto__input--error');

        //Agregamos el mensaje de error
        formulario.precio.parentElement.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');
        return true;
    }
}

//Ejecutamos blur en el input descripcion
descripcion.addEventListener('blur', (e) => {
    comprobarDescripcion();
})

//
descripcion.addEventListener('keyup', (e) => {
    //Si el usuario tiene error comprobar en todo momento si tiene error
    if ([...e.target.classList].includes('formulario-gasto__input--error')) {
        comprobarDescripcion();
    }
})

//
//Ejecutamos blur en el input descripcion
precio.addEventListener('blur', (e) => {
    comprobarPrecio();
})

precio.addEventListener('keyup', (e) => {
    //Si el usuario tiene error comprobar en todo momento si tiene error
    if ([...e.target.classList].includes('formulario-gasto__input--error')) {
        comprobarPrecio();
    }
})

//Lógica para agregar valores al local storage
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    //Obtenemos el modo del formulario
    const modo = formulario.closest('#formulario-gasto')?.dataset?.modo;

    //Comprobamos que la descripcion y el precio son correctos
    if (comprobarDescripcion() && comprobarPrecio()) {
        const nuevoGasto = {
            id: uuidv4(),
            fecha: new Date(),
            descripcion: descripcion.value,
            precio: precio.value
        };
        //Obtenemos los gastos guardados en el localStorage
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        //Comprobamos el modo del formulario
        if (modo === 'agregarGasto') {
            //Comprobando si hay gastos
            if (gastosGuardados) {
                //Creamos una nueva lista de gastos que incluya el nuevo
                const nuevoGastos = [...gastosGuardados, nuevoGasto];
                window.localStorage.setItem('gastos', JSON.stringify(nuevoGastos));
            } else {
                //Agregamos primer gasto
                window.localStorage.setItem('gastos', JSON.stringify(
                    //Lo transformamos en un arreglo
                    [
                        //El arreglo crea un objeto y dentro tendrá un arreglo
                        { ...nuevoGasto }
                    ]
                ));
            }
        } else if (modo === 'editarGasto') {
            //Obtenemos el id del gasto a editar
            const id = document.getElementById('formulario-gasto').dataset?.id;

            //Obtenemos los valores de la descripcion y el precio

            //Obtenemos el index del elemento a editar
            let indexGastoAEditar;
            if (id && gastosGuardados) {
                //Por cada elemento del objeto junto con su index
                gastosGuardados.forEach((gasto, index) => {
                    //Comprobamos si el gasto tiene el id que tenemos
                    if (id === gasto.id) {
                        //Obtenemos el index
                        indexGastoAEditar = index;
                    }
                });
            }
            //Hacemos una copia del objeto para poder editarlo
            const nuevosGastos = [...gastosGuardados];

            //Del nuevo objeto con el index a editar
            nuevosGastos[indexGastoAEditar] = {
                //Accedemos a gastos guardados y al index
                ...gastosGuardados[indexGastoAEditar],

                //Cambiamos valores
                descripcion: descripcion.value,
                precio: precio.value
            }
            //Seteamos el nuevo arreglo por medio de JSON con stringify
            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
        }

        descripcion.value = '';
        precio.value = '';
        cargarGastos();
        cerrarForumularioGasto();
        cargarTotalGastado();
    }
})