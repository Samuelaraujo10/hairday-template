import { schedulesDay } from "../schedules/load.js"

// seleciona o input de data
const selectedDate = document.getElementById("date")

// recarrega a lista de horarios quando o input mudar
selectedDate.onchange = () => schedulesDay()