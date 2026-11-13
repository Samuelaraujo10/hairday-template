import dayjs from "dayjs";
import { apiConfig } from "./api-config.js";


export async function scheduleFetchByDay({ date }) {
    try {
        // faz a requisição
        const response = await fetch(`${apiConfig.baseUrl}/schedules`)

        // Converte para JSON
        const data = await response.json()

        // filtra agendamentos pelo dia selecionado.
        const dailySchedules = data.filter((schedule) => dayjs(date).isSame(schedule.when, 'day'));

        // exibe os agendamentos do dia.
        


        return dailySchedules;
    } catch (error) {
        console.log(error);
        alert("Não foi possível buscar os agendamentos do dia selecionado.")
    }
}