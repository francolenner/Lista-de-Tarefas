let input = document.getElementById("input-principal")
let button = document.getElementById("botao-adicionar")
let tarefa = document.getElementById("nome-tarefa-id")
let listaCompleta = document.getElementById("tarefas")

let arrayDeTarefas = []
recarregarTarefas()


function mostrarTarefas() {
    let novaLi = ""

    arrayDeTarefas.forEach((tarefa, index) => {
        novaLi = novaLi + `
        <li class="item-tarefa ${ tarefa.status == true ? "concluido" : "" } ">
            <button class="button-check" onclick="concluirTarefa(${index})">
                <i class="fas fa-check-circle"></i>
            </button>

            <p class="nome-tarefa ${ tarefa.status == true ? "concluido" : "" } " id="nome-tarefa-id">${tarefa.tarefa}</p>

            <button class="button-delete" onclick="deletarTarefa(${index})">
                <i class="fas fa-trash"></i>
            </button>
        <li> `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem("lista", JSON.stringify(arrayDeTarefas) )
}


function deletarTarefa(index) {
    arrayDeTarefas.splice(index, 1)
    mostrarTarefas()
}

function adicionarTarefa() {

    if(input.value){
        arrayDeTarefas.push({
            tarefa: input.value,
            status: false
        })
    } 
    else {
        alert("Digite uma tarefa")
    }

    input.value = ""
    mostrarTarefas()
}

function concluirTarefa(index) {
    arrayDeTarefas[index].status = !arrayDeTarefas[index].status
    
    mostrarTarefas()
}

function recarregarTarefas(){
    let minhasTarefas = localStorage.getItem("lista")

    if(minhasTarefas){
        arrayDeTarefas = JSON.parse(minhasTarefas)
    
        mostrarTarefas()
    }
}

function adicionarPeloEnter(teclas){

    if(teclas.key === "Enter"){
        adicionarTarefa()
    }
}

button.addEventListener("click", adicionarTarefa)

document.addEventListener("keypress", adicionarPeloEnter)