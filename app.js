
// criando um banco teste
let banco = [ 
    {tarefa: 'Treinando Js', status: ''},
    {tarefa: 'Treinando Angular Js', status: 'checked'},
    {tarefa: 'Node Js', status: ''}
]


localStorage.setItem('todoList', JSON.stringify(banco)) // Enviando banco para localStorage
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [] // pegando dados do localStorage
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco)) // função para atualizar o banco

// criando os itens
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item)
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList')
    while(todoList.firstChild){
      todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco()
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice))
}

const inserirItem = (event) => {
    const tecla = event.key
    const texto = event.target.value
    if(tecla === 'Enter'){
        const banco = getBanco()
        banco.push({tarefa: texto, status: ''})
        setBanco(banco)
        atualizarTela(banco)
        //limparTarefaNova()
        event.target.value = ''
    }
}

const removeItem = (indice) => {
    const banco = getBanco()
    banco.splice (indice, 1)
    setBanco(banco)
    atualizarTela()
}

const atualizaItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela()
}


const clickItem = (event) => {
    const elemento = event.target
    if(elemento.type === "button"){
        const indice = elemento.dataset.indice
        removeItem(indice)
    }else if(elemento.type === "checkbox"){
        const indice = elemento.dataset.indice
        atualizaItem(indice)
    }
    console.log('valor do elemento: ', elemento.type)
}

document.getElementById('newItem').addEventListener('keypress', inserirItem)
document.getElementById('todoList').addEventListener('click', clickItem)

atualizarTela()

