//
import paisesARepository from "../repositories/paisesARepository.mjs";

export async function obtenerDeApiPaisAmericano() {
    return await paisesARepository.obtenerDeApiP()
}
export async function insertarDeApiPaisAmericano(datosPais) {
    return await paisesARepository.importarDeApiP(datosPais)
}
export async function obtenerTodosLosPaisesAmericanos() {
    return await paisesARepository.obtenerTodos();
}
export async function crearPaisesAmericanos(valor) {
    console.log("estoy capa Services-crear");
    return await paisesARepository.crearPaisesA(valor);
}
// para editar 2:
export async function obtenerPaisesAPorId(id) {
    return await paisesARepository.obtenerPorId(id);
}
export async function actualizarPaisesA(id, datos) {
    return await paisesARepository.actualizarPaisesA(id, datos);
}