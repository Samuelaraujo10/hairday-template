import dayjs from "dayjs"
import { toast } from "../../utils/notify.js"

// Seleciona as listas (<ul>) de cada período na coluna de agendamentos
const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function schedulesShow({ dailySchedules }) {
  try {
    // 1. Limpa as listas antes de renderizar para evitar itens duplicados
    periodMorning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodNight.innerHTML = ""

    // 2. Percorre cada agendamento do dia e monta o item visual (<li>)
    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li")
      const time = document.createElement("strong")
      const name = document.createElement("span")

      // Guarda o ID do agendamento no atributo data-id para usar no cancelamento
      item.setAttribute("data-id", schedule.id)

      // Formata a data/hora para exibir apenas horas e minutos (ex: "14:00")
      time.textContent = dayjs(schedule.when).format("HH:mm")
      name.textContent = schedule.name

      // Cria o ícone de cancelar atendimento
      const cancelIcon = document.createElement("img")
      cancelIcon.classList.add("cancel-icon")
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
      cancelIcon.setAttribute("alt", "Cancelar")

      // Monta a estrutura: <li> <strong>Hora</strong> <span>Nome</span> <img /> </li>
      item.appendChild(time)
      item.appendChild(name)
      item.appendChild(cancelIcon)

      // 3. Obtém apenas a hora numérica (0 a 23) para decidir em qual turno inserir
      const hour = dayjs(schedule.when).hour()

      // Distribui o agendamento na lista do período correspondente
      if (hour <= 12) {
        periodMorning.appendChild(item)
      } else if (hour > 12 && hour < 18) {
        periodAfternoon.appendChild(item)
      } else {
        periodNight.appendChild(item)
      }
    })
  } catch (error) {
    toast.error(
      "Não foi possível carregar a lista de agendamentos.",
      "Erro ao exibir agenda"
    )
  }
}
