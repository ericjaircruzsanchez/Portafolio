// Encriptado
const inputCodificar = document.getElementById('btn-codificar')
const formularioCodificar = document.getElementById('form-codificar')
const contenedorEncriptado = document.getElementById('contenedor-encriptado')

// Desencriptado
const inputDescodificar = document.getElementById('btn-descodificar')
const formularioDescodificar = document.getElementById('form-descodificar')
const contenedorDesencriptado = document.getElementById('contenedor-desencriptado')

const abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'á', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'é', 'M', 'N', 'Ñ', 'O', 'P', 'ü', 'Q', 'R', 'S', 'ó', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ' ', ',', '.', '-', '*', '/', '(', ')', "'"]

const totalAbecedario = abecedario.length

// Encriptado
inputCodificar.addEventListener('click', (e) => {
    e.preventDefault()

    contenedorEncriptado.innerHTML = '';

    // Normalizamos las letras
    const mensajeCodificar = document.getElementById('text-codificar').value;

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
                    // console.log('La posición nueva es '+posicionFuera+' y la nueva letra es: '+abecedario[posicionFuera])
                    palabraEncriptada.push(abecedario[posicionFuera])
                }else{
                    let letraNuevo = (abecedario[lengthLetra])
                    // console.log(letraNuevo)
                    palabraEncriptada.push(letraNuevo)
                }
            }
        })
    }
    // Creamos la plantilla para el mensaje codificado
    const plantillaEncriptado = `
    <div class=" sm:mx-auto bg-white shadow-lg rounded-lg mt-10 p-5">
        <div>
            <h2 class=" text-4xl text-blue-600 font-bold text-center">Mensaje codificado</h2>
        </div>
        <div class=" my-6">
            <p class="text-4xl font-bold text-center">${palabraEncriptada.join('')}</p>
        </div>
    </div>
    `
    // Incrustamos la plantilla
    contenedorEncriptado.innerHTML = plantillaEncriptado
})


inputDescodificar.addEventListener('click', (e) => {
    e.preventDefault()

    contenedorDesencriptado.innerHTML = '';

    // Normalizamos las letras
    const mensajeDescodificar = document.getElementById('text-descodificar').value;

    let palabraDesencriptada = ['']

    // Iteramos sobre el texto escrito
    for(letra in mensajeDescodificar){
        
        // Recorremos el arreglo de abecedario
        abecedario.forEach((letraAbecedario, posicion) => {
            
            // Si coincide la letra con la letra de abecedario
            if(mensajeDescodificar[letra] === letraAbecedario){

                // Nuestras reglas de encriptación
                let lengthLetra = posicion - 1

                // Manejo de lógica para los valores que se salgan del arreglo de abc
                if(lengthLetra < 0){

                    // Obtenemos la posición en caso de que 
                    let posicionFuera = (lengthLetra + totalAbecedario)
                    // console.log('La posición nueva es '+posicionFuera+' y la nueva letra es: '+abecedario[posicionFuera])

                    palabraDesencriptada.push(abecedario[posicionFuera])
                }else{
                    let letraNuevo = (abecedario[lengthLetra])
                    // console.log(letraNuevo)
                    palabraDesencriptada.push(letraNuevo)
                }
            }
        })
    }

    // console.log(palabraEncriptada.join(''))

    // Creamos la plantilla para el mensaje codificado
    const plantillaDesencriptado = `
    <div class=" sm:mx-auto bg-white shadow-lg rounded-lg mt-10 p-5">
        <div>
            <h2 class=" text-4xl text-blue-600 font-bold text-center">Mensaje codificado</h2>
        </div>
        <div class=" my-6">
            <p class="text-4xl font-bold text-center">${palabraDesencriptada.join('')}</p>
        </div>
    </div>
    `
    // Incrustamos la plantilla
    contenedorDesencriptado.innerHTML = plantillaDesencriptado
})
