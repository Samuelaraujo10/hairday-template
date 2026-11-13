import { apiConfig } from "./api-config.js";
import { toast } from "../utils/notify.js";

export async function scheduleCancel({ id }) {
    try {
        await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
            method: 'DELETE', 
        })

        toast.success(
            "O horário foi liberado novamente na agenda.",
            "Agendamento cancelado!"
        )
    } catch (error) {
        toast.error(
            "Não foi possível cancelar o agendamento.",
            "Erro ao cancelar"
        )
        console.error(error)
    }
}