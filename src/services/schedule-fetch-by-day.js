import dayjs from "dayjs"
import { apiConfig } from "./api-config.js"
import { toast } from "../utils/notify.js"

// Busca na API todos os agendamentos e filtra apenas os do dia selecionado (método GET)
export async function scheduleFetchByDay({ date }) {
  try {
    // 1. Faz a requisição GET para buscar todos os registros em /schedules
    const response = await fetch(`${apiConfig.baseUrl}/schedules`)

    // 2. Converte a resposta da API para formato JSON (array de objetos)
    const data = await response.json()

    // 3. Filtra apenas os agendamentos que pertencem ao mesmo dia (day) da data selecionada
    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day")
    )

    return dailySchedules
  } catch (error) {
    console.log(error)
    toast.error(
      "Não foi possível buscar os agendamentos do dia selecionado.",
      "Erro de conexão"
    )
  }
}
