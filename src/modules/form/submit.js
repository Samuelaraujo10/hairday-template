import dayjs from "dayjs"

const form = document.querySelector("form")
const selectedDate = document.querySelector("#date")

// Data atual para formatar o input
const inputToday = dayjs().format("YYYY-MM-DD")

// Carrega a data atual e define a data mínima como sendo a data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

form.addEventListener("submit", (event) => {
  // Previne o comportamento padrão de recarregar a página
  event.preventDefault()

  console.log("Formulário enviado!")
})
