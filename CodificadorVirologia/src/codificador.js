// Encriptado
const inputCodificar = document.getElementById('btn-codificar')
const formularioCodificar = document.getElementById('form-codificar')
const contenedorEncriptado = document.getElementById('contenedor-encriptado')
const contendorValidacionEncriptacion = document.querySelector('.contenedor-verificacion-encriptacion')

// Desencriptado
const inputDescodificar = document.getElementById('btn-descodificar')
const formularioDescodificar = document.getElementById('form-descodificar')
const contenedorDesencriptado = document.getElementById('contenedor-desencriptado')
const contendorValidacionDesencriptacion = document.querySelector('.contenedor-verificacion-desencriptacion')

// Definimos el arreglo de caracteres que serán permitidos en el programa 
const abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'á', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'é', 'M', 'N', 'Ñ', 'O', 'P', 'ü', 'Q', 'R', 'S', 'ó', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ' ', ',', '.', '-', '*', '>', '/', '(',  "'", ']', '"', '!', '#', '$', '%', '&', '/', '=', '?', '+',')', '¿', '¡', '¨', '{', '[', '<',  ';', ':', '_', '}']

const totalAbecedario = abecedario.length

// Encriptado
inputCodificar.addEventListener('click', (e) => {
    e.preventDefault()

    // Reiniciamos el contenedor encriptado
    contenedorEncriptado.innerHTML = '';

    // Normalizamos las letras
    const mensajeCodificar = document.getElementById('text-codificar').value;

    if(mensajeCodificar.length === 0){
        contendorValidacionEncriptacion.classList.add('contenedor-verificacion-encriptacion--active')
    }else{
        contendorValidacionEncriptacion.classList.remove('contenedor-verificacion-encriptacion--active')

        // Inicializamos el arreglo
        let palabraEncriptada = ['']

        // Iteramos sobre el texto escrito
        for(letra in mensajeCodificar){
            
            // Recorremos el arreglo de abecedario
            abecedario.forEach((letraAbecedario, posicion) => {
                
                // Si coincide la letra con la letra de abecedario
                if(mensajeCodificar[letra] === letraAbecedario){

                    // Nuestras reglas de encriptación
                    let lengthLetra = posicion + 1

                    // Manejo de lógica para los valores que se salgan del arreglo de abc
                    if(lengthLetra >= totalAbecedario){

                        // Obtenemos la posición en caso de que 
                        let posicionFuera = (lengthLetra - totalAbecedario)

                        // Agregamos un valor al arreglo
                        palabraEncriptada.push(abecedario[posicionFuera])
                    }else{
                        // En caso de que el valor se mantenga dentro del arreglo
                        let letraNuevo = (abecedario[lengthLetra])
                        // Agregamos letra al arreglo
                        palabraEncriptada.push(letraNuevo)
                    }
                }
            })
        }
        // Creamos la plantilla para el mensaje codificado y convertimos el arreglo a un string con join('')
        const plantillaEncriptado = `
        <div class=" sm:mx-auto bg-white shadow-lg rounded-lg mt-10 p-5">
            <div>
                <h2 class=" text-4xl text-blue-600 font-bold text-center">Mensaje codificado</h2>
            </div>
            <div class=" my-6">
                <p class="text-4xl font-bold text-center break-words">${palabraEncriptada.join('')}</p>
            </div>
        </div>
        `
        // Incrustamos la plantilla al contenedor encriptado
        contenedorEncriptado.innerHTML = plantillaEncriptado
    }
})


// Desencriptado
inputDescodificar.addEventListener('click', (e) => {
    e.preventDefault()

    // Reiniciamos el contenedor encriptado
    contenedorDesencriptado.innerHTML = '';

    // Normalizamos las letras
    const mensajeDescodificar = document.getElementById('text-descodificar').value;

    if(mensajeDescodificar.length === 0){
        contendorValidacionDesencriptacion.classList.add('contenedor-verificacion-desencriptacion--active')
    }else{
        contendorValidacionDesencriptacion.classList.remove('contenedor-verificacion-desencriptacion--active')

        let palabraDesencriptada = ['']

        // Iteramos sobre el texto encriptado
        for(letra in mensajeDescodificar){
            
            // Recorremos el arreglo de abecedario
            abecedario.forEach((letraAbecedario, posicion) => {
                
                // Si coincide la letra con la letra de abecedario
                if(mensajeDescodificar[letra] === letraAbecedario){

                    // Nuestras reglas de desencriptación
                    let lengthLetra = posicion - 1

                    // Manejo de lógica para los valores que se salgan del arreglo de abc
                    if(lengthLetra < 0){

                        // Obtenemos la posición en caso de que 
                        let posicionFuera = (lengthLetra + totalAbecedario)

                        palabraDesencriptada.push(abecedario[posicionFuera])
                    }else{
                        let letraNuevo = (abecedario[lengthLetra])
                        palabraDesencriptada.push(letraNuevo)
                    }
                }
            })
        }
        // Creamos la plantilla para el mensaje desencriptado
        const plantillaDesencriptado = `
        <div class=" sm:mx-auto bg-white shadow-lg rounded-lg mt-10 p-5">
            <div>
                <h2 class=" text-4xl text-blue-600 font-bold text-center">Mensaje descodificado</h2>
            </div>
            <div class=" my-6">
                <p class="text-4xl font-bold text-center break-words">${palabraDesencriptada.join('')}</p>
            </div>
        </div>
        `
        // Incrustamos la plantilla
        contenedorDesencriptado.innerHTML = plantillaDesencriptado
    }
})
