export function hourClick() {
  // Seleciona apenas os horários que estão disponíveis para agendamento
  const hours = document.querySelectorAll(".hour-available")

  hours.forEach((available) => {
    available.addEventListener("click", (selected) => {
      // 1. Remove a seleção (.hour-selected) de todos os horários antes de marcar o novo
      hours.forEach((hour) => {
        hour.classList.remove("hour-selected")
      })

      // 2. Adiciona a classe .hour-selected apenas no item que foi clicado
      selected.target.classList.add("hour-selected")
    })
  })
}
