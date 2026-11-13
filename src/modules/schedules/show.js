import dayjs from "dayjs";
import { toast } from "../../utils/notify.js";

// seleciona as sessões manhã, tarde e noite.
const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function schedulesShow({ dailySchedules }) {
    try {
        // limpa as listar
        periodMorning.innerHTML = ""
        periodAfternoon.innerHTML = ""
        periodNight.innerHTML = ""

        // renderiza agendamentos por periodo
        dailySchedules.forEach((schedule) => {
            const item = document.createElement('li')
            const time = document.createElement('strong')
            const name = document.createElement('span')

            // adiciona o id do agendamento.
            item.setAttribute('data-id', schedule.id)
               
            time.textContent = dayjs(schedule.when).format('HH:mm')  
            name.textContent = schedule.name

            // cria icone de cancelar o agendamento
            const cancelIcon = document.createElement('img')
            cancelIcon.classList.add('cancel-icon')
            cancelIcon.setAttribute('src', './src/assets/cancel.svg')
            cancelIcon.setAttribute('alt', 'Cancelar')
            
            // adiciona o tempo, nome e icone ao item.
            item.appendChild(time)
            item.appendChild(name)
            item.appendChild(cancelIcon)

            // obtem somente hora
            const hour = dayjs(schedule.when).hour()

            // renderizar o agendamento no periodo correto (manhã, tarde ou noite).
            if (hour <= 12) {
                periodMorning.appendChild(item)
            } else if (hour > 12 && hour < 18) {
                periodAfternoon.appendChild(item)
            } else {
                periodNight.appendChild(item)
            }

        });
    } catch (error) {
        toast.error(
            "Não foi possível carregar a lista de agendamentos.",
            "Erro ao exibir agenda"
        )
    }
}