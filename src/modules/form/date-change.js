import { schedulesDay } from "../schedules/load.js"

// Seleciona o input de data do formulário
const selectedDate = document.getElementById("date")

// Sempre que o usuário escolher outra data no calendário, recarrega os horários e agendamentos
selectedDate.onchange = () => schedulesDay()
