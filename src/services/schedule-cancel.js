import { apiConfig } from "./api-config.js";

export async function scheduleCancel({ id }) {
    try {
        await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
            method: 'DELETE', 
        })

        alert("Agendamento cancelado com sucesso!")
    } catch (error) {
        alert("Erro ao cancelar agendamento")
        console.error(error)
    }
}