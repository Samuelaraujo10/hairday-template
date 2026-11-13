import { apiConfig } from "./api-config.js";
import { toast } from "../utils/notify.js";

export async function scheduleNew({ id, name, when }) {
    try {
        await fetch(`${apiConfig.baseUrl}/schedules`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                name,
                when
            })
        })
       
        toast.success(
            "O atendimento foi registrado na agenda.",
            "Agendamento confirmado!"
        )
    } catch (error) {
        console.log(error);
        toast.error(
            "Não foi possível concluir o agendamento. Tente novamente!",
            "Falha ao agendar"
        )
    }
}