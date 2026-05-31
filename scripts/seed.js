import fetch from "node-fetch"; // Permite importación de la api.
import  paisesA  from "./models/paisesA.js"; 

export async function guardarPaisesSanitizados() {
  const res = await fetch("https://restcountries.com/v3.1/region/america");
  const data = await res.json();

  const paisesSanitizados = data
    .filter(pais => pais.languages && pais.languages.spa)
    .map(pais => ({
      nombreOfficial: pais.translations?.spa?.official || pais.name?.official,
      capital: pais.capital || [],
      languages: Object.values(pais.languages || {}),
      borders: pais.borders || [],
      area: pais.area || 0,
      population: pais.population || 0,
      timezones: pais.timezones || [],
      creador: "MARIA JOSE"
    }));

  // Guardar en MongoDB:
  await paisesA.deleteMany();
  await paisesA.insertMany(paisesSanitizados);
  console.log("Paises sanitizados guardados");
}