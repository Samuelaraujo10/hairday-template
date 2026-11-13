import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"
import { toast } from "../../utils/notify.js"

// Seleciona os elementos do formulário
const form = document.querySelector("form")
const clienteName = document.getElementById("client")
const selectedDate = document.querySelector("#date")

// Obtém a data atual no formato aceito pelo <input type="date"> (AAAA-MM-DD)
const inputToday = dayjs().format("YYYY-MM-DD")

// Preenche o input com a data de hoje e impede agendamentos em datas passadas
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  // Impede que o navegador recarregue a página ao enviar o formulário
  event.preventDefault()

  try {
    // 1. Recupera o nome digitado removendo espaços extras nas pontas
    const name = clienteName.value.trim()

    if (!name) {
      return toast.warning(
        "Por favor, informe o nome do cliente para continuar.",
        "Campo obrigatório"
      )
    }

    // 2. Busca o elemento <li> que possui a classe de horário selecionado
    const hourSelected = document.querySelector(".hour-selected")

    if (!hourSelected) {
      return toast.warning(
        "Selecione um horário disponível na lista.",
        "Horário não selecionado"
      )
    }

    // 3. Extrai somente o número da hora (ex: "14:00" -> "14")
    const [hour] = hourSelected.innerText.split(":")

    // 4. Junta a data escolhida no input com a hora selecionada
    const when = dayjs(selectedDate.value).add(hour, "hour")

    // 5. Gera um identificador único para o novo agendamento
    const id = crypto.randomUUID()

    // 6. Envia os dados para a API salvar no server.json
    await scheduleNew({ id, name, when })

    // 7. Recarrega a agenda na tela e limpa o campo de nome do cliente
    await schedulesDay()
    clienteName.value = ""
  } catch (error) {
    toast.error(
      "Não foi possível realizar o agendamento.",
      "Erro no agendamento"
    )
    console.log(error)
  }
}
