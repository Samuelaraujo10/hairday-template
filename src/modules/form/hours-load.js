import dayjs from "dayjs"

import { openingHours } from "../../utils/opening-hours.js"
import { hourClick } from "./hours-click.js"

// Lista (<ul>) onde os horários serão inseridos no HTML
const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules }) {
  // 1. Limpa a lista de horários anterior para não duplicar na tela
  hours.innerHTML = ""

  // 2. Cria uma lista apenas com as horas (ex: "14:00") que já estão ocupadas nesse dia
  const unavailableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("HH:mm")
  )

  // 3. Percorre todos os horários de funcionamento e verifica se cada um está disponível
  const opening = openingHours.map((hour) => {
    // Extrai apenas o número da hora (ex: "09:00" -> "09")
    const [scheduleHour] = hour.split(":")

    // Soma a hora na data selecionada e verifica se esse horário já passou em relação ao momento atual
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())

    // O horário só fica disponível se NÃO estiver ocupado na API e NÃO estiver no passado
    const available = !unavailableHours.includes(hour) && !isHourPast

    return {
      hour,
      available,
    }
  })

  // 4. Cria os elementos <li> no HTML para cada horário
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li")

    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")
    li.textContent = hour

    // Insere o cabeçalho divisor de cada período antes do primeiro horário daquele turno
    if (hour === "09:00") {
      hourHeaderAdd("Manhã")
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde")
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite")
    }

    hours.append(li)
  })

  // 5. Ativa o evento de clique nos horários disponíveis recém-criados
  hourClick()
}

// Função auxiliar que cria o título do período (Manhã, Tarde ou Noite) na lista
function hourHeaderAdd(title) {
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}
