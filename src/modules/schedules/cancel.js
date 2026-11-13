import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"


const periods = document.querySelectorAll('.period')

// gera evento de click para cada lista (manhã, tarde, noite)
periods.forEach((period) => {
  // captura o evento de click em cada item
  period.addEventListener('click', async (e) => {
    if (e.target.classList.contains('cancel-icon')) {
      // obtem o li pai do elemento clicado
      const item = e.target.closest('li')

      // pega o ID
      const { id } = item.dataset

      if (id) {
        // confirma o cancelamento
        const isConfirm = confirm('Tem certeza que deseja cancelar este agendamento?')

        if (isConfirm) {
            
            // faz a requisição de cancelamento
            await scheduleCancel({ id })

            // recarrega os agendamentos do dia
            schedulesDay()
        }
      }
    }
  })
})