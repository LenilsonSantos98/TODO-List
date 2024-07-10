let tarefas = [];

document.addEventListener('DOMContentLoaded', (event) => {
    carregarTarefas();
    carregarTema();
});

function handleEnter(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
}

function adicionarTarefa() {
    let input = document.getElementById('novaTarefa');
    let novaTarefa = input.value.trim();
    if (novaTarefa) {
        tarefas.push(novaTarefa);
        input.value = '';
        input.focus();
        salvarTarefas();
        document.getElementById('output').innerText = 'Tarefa adicionada com sucesso!';
        document.getElementById('output').style.display = 'none';
    } else {
        document.getElementById('output').innerText = 'Por favor, digite uma tarefa.';
        document.getElementById('output').style.display = 'block';
    }
}

function exibirTarefas() {
    let output = document.getElementById('output');
    output.innerHTML = '';
    if (tarefas.length === 0) {
        output.innerText = 'Nenhuma tarefa adicionada.';
        output.style.display = 'block';
        return;
    }

    tarefas.forEach((valor, indice) => {
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        let taskText = document.createElement('span');
        taskText.innerText = `${indice + 1}. ${valor}`;

        let removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerText = 'Remover';
        removeBtn.onclick = () => removerTarefa(indice);

        taskDiv.appendChild(taskText);
        taskDiv.appendChild(removeBtn);

        output.appendChild(taskDiv);
    });

    output.style.display = 'block';
}

function removerTarefa(indice) {
    tarefas.splice(indice, 1);
    salvarTarefas();
    document.getElementById('output').innerText = 'Tarefa removida com sucesso!';
    exibirTarefas();
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
}

function alternarTema() {
    document.body.classList.toggle('dark');
    const temaAtual = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('tema', temaAtual);
}

function carregarTema() {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
        document.body.classList.add('dark');
    }
}
