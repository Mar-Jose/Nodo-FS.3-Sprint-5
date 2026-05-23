import fetch from "node-fetch";
import { writeFile } from "fs/promises";

async function generarPaisesSanitizados() {
  try {
    // Consulta la API de países de América.
    const response = await fetch("https://restcountries.com/v3.1/region/america");

    // Convierte la respuesta HTTP a JSON.
    const data = await response.json();

    // Filtra solo los países que tienen español entre sus idiomas y arma un objeto más simple.
    const paises = data
      // Conserva únicamente países cuyo objeto languages contiene la clave spa.
      .filter(pais => pais.languages && pais.languages.spa)
      // Transforma cada país al formato sanitizado requerido.
      .map(pais => ({
        // Usa la traducción oficial al español; si no existe, usa el nombre oficial general.
        nombre: pais.translations?.spa?.official || pais.name?.official,
        // Guarda la capital o un arreglo vacío si no viene informada.
        capital: pais.capital || [],
        // Guarda los países limitrofes o un array vacío si el país no tiene/declara límites.
        borders: pais.borders || [],
        // Guarda el área o 0 si no está disponible.
        area: pais.area || 0,
        // Guarda la población o 0 si no está disponible.
        population: pais.population || 0,
        
        // Guarda las zonas horarias o un arreglo vacío si faltan.
        timezones: pais.timezones || [],
        // Agrega un campo fijo con el nombre del creador.
        creador: "MARIA"
      }));

    // Suma la población total de todos los países sanitizados.
    const totalPopulation = paises.reduce((acc, p) => acc + p.population, 0);
    // Suma el área total de todos los países sanitizados.
    const totalArea = paises.reduce((acc, p) => acc + p.area, 0);

    // Construye el objeto final que se va a guardar en disco.
    const salidaJson = {
      paises,
      totales: {
        // Incluye la suma total de población.
        population: totalPopulation,
        // Incluye la suma total de área.
        area: totalArea,
        // Incluye el promedio del índice Gini.
       // promedioGini: avgGini
      }
    };

    // Escribe el resultado sanitizado en un archivo JSON dentro de la misma carpeta.
    await writeFile(
      new URL("./paises-sanitizados.json", import.meta.url),
      JSON.stringify(salidaJson, null, 2),
      "utf8"
    );

    // Informa por consola que el archivo fue generado correctamente.
    console.log("Archivo generado: paises-sanitizados.json");
  } catch (err) {
    // Muestra el error en consola si falla la consulta, el procesamiento o la escritura.
    console.error("Error procesando datos:", err.message);
    // Marca la ejecución como fallida sin interrumpir abruptamente el proceso.
    process.exitCode = 1;
  }
}

// Ejecuta la función principal del script.
await generarPaisesSanitizados();
