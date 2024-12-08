import { isThisMonth, parseISO } from "date-fns";

const cargarTotalGastado = () => {
    //
    const contenedorTotalGastado = document.getElementById('total-gastado');

    //Transformamos la información con JSON parse para poder manipular la información
    const gastos = JSON.parse(window.localStorage.getItem('gastos'));

    //Variable total
    let total = 0;

    //Si hay gastos
    if (gastos) {
        //Guardamos los gastos del mes que sean del mes actual
        const gastosDelMes = gastos.filter((gasto) => {
            //Comprobamos que el gasto sea del mes
            if (isThisMonth(parseISO(gasto.fecha))) {
                return gasto;
            }
        });
        if (gastosDelMes) {
            gastosDelMes.forEach((gasto) => {
                //Lo transformamos de texto a numero
                total += parseFloat(gasto.precio);
            });
        }
        //Formateamos el numero y lo agregamos al contenedor
        const formatoMoneda = new Intl.NumberFormat('en-MX', {
            style: 'currency',
            currency: 'MXN'
        });
        contenedorTotalGastado.innerText = formatoMoneda.format(total);
    }
}

export default cargarTotalGastado;