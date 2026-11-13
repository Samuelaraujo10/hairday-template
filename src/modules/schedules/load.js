import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { schedulesShow } from "../schedules/show.js"
import { hoursLoad } from "../form/hours-load.js"

const selectedDate = document.getElementById("date")

// Função central que sincroniza os agendamentos e os horários disponíveis do dia escolhido
export async function schedulesDay() {
  // 1. Obtém a data atualmente selecionada no input
  const date = selectedDate.value

  // 2. Busca na API os agendamentos marcados para essa data
  const dailySchedules = await scheduleFetchByDay({ date })

  // 3. Exibe os agendamentos encontrados na coluna da direita (Manhã, Tarde e Noite)
  schedulesShow({ dailySchedules })

  // 4. Renderiza os horários no formulário marcando quais estão livres ou ocupados
  hoursLoad({ date, dailySchedules })
}
