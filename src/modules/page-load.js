import { schedulesDay } from "./schedules/load.js"

// Aguarda todo o HTML ser carregado no navegador antes de buscar os agendamentos iniciais
document.addEventListener("DOMContentLoaded", function () {
  schedulesDay()
})
