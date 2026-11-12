import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { schedulesShow } from "../schedules/show.js";
import { hoursLoad } from "../form/hours-load.js";

const selectedDate = document.getElementById("date")

export async function schedulesDay() {
  // obtem a data do input
  const date = selectedDate.value

  // Busca na API todos os agendamentos da data selecionada
  const dailySchedules = await scheduleFetchByDay({ date })

  // exibe agendamentos
  schedulesShow({ dailySchedules })

  // Renderiza os horarios disponiveis
  hoursLoad({ date, dailySchedules })
}
