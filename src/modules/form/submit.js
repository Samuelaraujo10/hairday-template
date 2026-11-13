import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"
import { toast } from "../../utils/notify.js"

const form = document.querySelector("form")
const clienteName = document.getElementById("client")
const selectedDate = document.querySelector("#date")

// Data atual para formatar o input
const inputToday = dayjs().format("YYYY-MM-DD")

// Carrega a data atual e define a data mínima como sendo a data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  // Previne o comportamento padrão de recarregar a página
  event.preventDefault()

  try {
    // recuperar nome do cliente
    const name = clienteName.value.trim()

    if (!name) {
      return toast.warning(
        "Por favor, informe o nome do cliente para continuar.",
        "Campo obrigatório"
      )
    }

    // retorna horario selecionado
    const hourSelected = document.querySelector('.hour-selected')
    
    // recupera o horario selecionado
    if (!hourSelected) {
      return toast.warning(
        "Selecione um horário disponível na lista.",
        "Horário não selecionado"
      )
    }

    // recupera somente a hora
    const [hour] = hourSelected.innerText.split(":")
    
    // inserir a hora na data
    const when = dayjs(selectedDate.value).add(hour ,"hour")

    // gerar id
    const id = crypto.randomUUID()
    
    // Faz o agendamento
    await scheduleNew({ id, name, when })

    // Recarrega os agendamentos e limpa o input de nome do cliente
    await schedulesDay()
    clienteName.value = ""
    
  } catch (error) {
    toast.error(
      "Não foi possível realizar o agendamento.",
      "Erro no agendamento"
    )
    console.log(error);
  }
}
