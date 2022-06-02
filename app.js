'use strict';

let banco = [ 
    {tarefa: 'Treinando Js', status: ''},
    {tarefa: 'Treinando Angular Js', status: 'checked'},
    {tarefa: 'Node Js', status: ''}
]

// criando um item no js
const criarItem = (tarefa, status='') => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status}>
        <div>${tarefa}</div>
        <input type="button" value="X">
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
    banco.forEach(item => {
        criarItem(item.tarefa, item.status)
    } )
}

// const limparTarefaNova = (event) =>{
//    const tecla2 = event.key
//    if(tecla2 === 'Enter'){
//     event.target.value = ''
//    }
// }

const inserirItem = (event) => {
    const tecla = event.key
    const texto = event.target.value
    if(tecla === 'Enter'){
        banco.push({tarefa: texto, status: ''})
        atualizarTela()
        //limparTarefaNova()
        event.target.value = ''
    }

    //console.log('Teclas digitadas: ', tecla)
}

const clickItem = (event) => {
    const elemento = event.target
    console.log('valor do elemento: ', elemento)
}

document.getElementById('newItem').addEventListener('keypress', inserirItem)
document.getElementById('todoList').addEventListener('click', clickItem)

atualizarTela()

