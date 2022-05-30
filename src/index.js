const fs = require('fs')

/**
 * Esta funcion busca si una palabra tiene conexiones dentro de un array
 * @param {string} palabra - palabra que tiene la conexion
 * @param {string[]} palabras - lista de palabras donde buscar conexiones
 * @returns {number} indice - retorna la primer posicion que se puede conectar
 */
function buscarConexion(param1, param2) {
  // hacemos una copia de solo lectura de los parametros
  const palabra = param1;
  const palabras = param2;

  // guardamos la ultima letra
  const ultima_letra = palabra[palabra.length - 1];

  // iteramos sobre el array
  for (let i = 0; i < palabras.length; i++) {
    if (palabras[i][0] === ultima_letra) {
      return i;
    }
  }

  return false;
}
/**
 * Esta funcion crea un objeto cache
 * @param {string[]} cadena - recibe por parametro un array de strings
 * @returns {Object} cache - retorna un objeto cache
 */

// creamos una funcion interna para mantener el cache
function inicializarCache(param1) {
  // inicializamos con una copia de la cadena
  const cadena = param1;

  const ultimaPalabra = cadena[cadena.length - 1];
  const primeraLetra = ultimaPalabra[0];
  const ultimaLetra = ultimaPalabra[ultimaPalabra.length - 1];

  return {
    ultimaPalabra,
    primeraLetra,
    ultimaLetra,
  };
}

/**
 * Esta funcion determina si las palabras se pueden encadenar para formar un
  círculo
 * @param {string[]} palabras - lista de palabras
 * @returns {Array|Boolean} palabras - retorna un array de palabras si puede formar un circulo, caso contrario retorna false
 */

function puedeFormarUnCirculo(param1) {
  // hacemos una copia de solo lectura de los parametros
  const palabras = param1.sort();

  // seleccionamos la primer palabra de la cadena de forma arbitraria
  const cadena = palabras.splice(0, 1);

  // inicializamos el cache
  let cache = inicializarCache(cadena);

  // iteramos hasta que no queden valores dentro del array
  while (palabras.length) {
    // buscamos la primer posicion que tenga una conexion
    const conexion = buscarConexion(cache.ultimaPalabra, palabras);

    // si encontro conexion
    if (conexion !== false) {
      // movemos el elemento al array de la cadena
      cadena.push(palabras.splice(conexion, 1)[0]);

      // actualizamos el cache
      cache = inicializarCache(cadena);
    }

    /* 
        si la primera y ultima letra se pueden encadenar 
        pero todavia existen valores en el array de palabras
        devolvemos la ultima posicion de la cadena al final del array de palabras
    */
    if (cache.ultimaLetra === cache.primeraLetra && palabras.length) {
      palabras.push(cadena.splice(cadena.length - 1, 1)[0]);
    }

    // Si la cadena no esta cerrada y no encuentra conexion retorna false
    if (
      cache.ultimaLetra !== cache.primeraLetra &&
      palabras.length > 0 &&
      conexion === false
    ) {
      return false;
    }
  }
  
  // declaramos la ruta donde vamos a guardar el archivo
  const ruta = 'result/test.txt';

  // si el archivo existe lo eliminamos
  const archivoExiste = fs.existsSync(ruta)

  if(archivoExiste){
      fs.unlinkSync(ruta)
  }

   return new Promise((resolve, reject) => {
       // creamos el archivo
        const file = fs.createWriteStream(ruta);

        // si hay algun error lo rechazamos la promesa
        file.on('error', (error) => reject(error))

        // escribimos los valores de la cadena separado por salto de linea
        cadena.forEach(palabra => file.write(`${palabra}\n`));

        // cerramos el archivo
        file.end();

        // resolvemos la promesa
        resolve()
   })
}

module.exports = puedeFormarUnCirculo;
