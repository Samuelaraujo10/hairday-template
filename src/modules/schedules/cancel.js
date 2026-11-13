import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"
import { confirmModal } from "../../utils/notify.js"

// Seleciona as 3 listas de períodos (Manhã, Tarde e Noite)
const periods = document.querySelectorAll(".period")

// Adiciona um ouvinte de clique em cada lista (delegação de eventos)
periods.forEach((period) => {
  period.addEventListener("click", async (e) => {
    // Verifica se o clique foi especificamente no ícone de cancelar (X)
    if (e.target.classList.contains("cancel-icon")) {
      // Encontra o elemento <li> pai do ícone clicado
      const item = e.target.closest("li")

      // Recupera o ID salvo no atributo data-id do <li>
      const { id } = item.dataset

      if (id) {
        // Exibe o modal personalizado perguntando se o usuário confirma a exclusão
        const isConfirm = await confirmModal({
          title: "Cancelar agendamento",
          message:
            "Tem certeza que deseja cancelar este atendimento? Essa ação liberará o horário na agenda.",
          confirmText: "Sim, cancelar",
          cancelText: "Manter",
        })

        if (isConfirm) {
          // Chama a API para deletar o agendamento pelo ID
          await scheduleCancel({ id })

          // Atualiza a lista de agendamentos e libera o horário na tela
          schedulesDay()
        }
      }
    }
  })
})
