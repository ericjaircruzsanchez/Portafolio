const btn = document.getElementById('toggle-form-gasto');
const formularioGasto = document.getElementById('formulario-gasto');

//Abrir formulario y en caso de no pasarte parametro que se agrega
const abrirForumularioGasto = (modo = 'agregarGasto') => {
    btn.classList.add('agregar-gasto__btn--active');
    formularioGasto.classList.add('formulario-gasto--active');

    if (modo === 'editarGasto') {
        document.querySelector('.formulario-gasto__titulo').innerText = 'Editar Gasto';
        document.querySelector('.formulario-gasto__btn').innerText = 'Editar Gasto';
        document.getElementById('formulario-gasto').dataset.modo = 'editarGasto';
    } else {
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
        document.querySelector('.formulario-gasto__titulo').innerText = 'Agregar Gasto';
        document.querySelector('.formulario-gasto__btn').innerText = 'Agregar Gasto';
        document.getElementById('formulario-gasto').dataset.modo = 'agregarGasto';
    }
};

//Cerrar formulario
const cerrarForumularioGasto = () => {
    btn.classList.remove('agregar-gasto__btn--active');
    formularioGasto.classList.remove('formulario-gasto--active');
};

btn.addEventListener('click', (e) => {
    //Preguntamos si el formulario está activo, si lo está, que se cierre al siguiente click
    if ([...formularioGasto.classList].includes('formulario-gasto--active')) {
        cerrarForumularioGasto();
    } else {
        //En caso de que no, que se abra
        abrirForumularioGasto();
    }


});

export { cerrarForumularioGasto, abrirForumularioGasto };