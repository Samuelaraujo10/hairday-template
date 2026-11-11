import dayjs from "dayjs"

const form = document.querySelector("form")
const clienteName = document.getElementById("client")
const selectedDate = document.querySelector("#date")

// Data atual para formatar o input
const inputToday = dayjs().format("YYYY-MM-DD")

// Carrega a data atual e define a data mínima como sendo a data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

form.addEventListener("submit", (event) => {
  // Previne o comportamento padrão de recarregar a página
  event.preventDefault()

  try {
    // recuperar nome do cliente
    const name = clienteName.value.trim()

    if (!name) {
      return alert("Por favor, insira o nome do cliente!")
    }

    // retorna horario selecionado
    const hourSelected = document.querySelector('.hour-selected')
    
    // recupera o horario selecionado
    if (!hourSelected) {
      return alert("Por favor, selecione um horário!")
    }

    // recupera somente a hora
    const [hour] = hourSelected.innerText.split(":")
    
    // inserir a hora na data
    const when = dayjs(selectedDate.value).add(hour ,"hour")

    // gerar id
    const id = crypto.randomUUID()
    
    console.log({id, name, when})
    

    console.log("Formulário enviado!")
  } catch (error) {
    alert("Não foi possível realizar o agendamento!")
    console.log(error);
  }
})
