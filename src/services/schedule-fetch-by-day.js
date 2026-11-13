import dayjs from "dayjs";
import { apiConfig } from "./api-config.js";
import { toast } from "../utils/notify.js";


export async function scheduleFetchByDay({ date }) {
    try {
        // faz a requisição
        const response = await fetch(`${apiConfig.baseUrl}/schedules`)

        // Converte para JSON
        const data = await response.json()

        // filtra agendamentos pelo dia selecionado.
        const dailySchedules = data.filter((schedule) => dayjs(date).isSame(schedule.when, 'day'));

        return dailySchedules;
    } catch (error) {
        console.log(error);
        toast.error(
            "Não foi possível buscar os agendamentos do dia selecionado.",
            "Erro de conexão"
        )
    }
}