const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

// Atribuição das funções aos botões de + e -
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Vincula o evento de clique em cada checkbox para atualizar a senha em tempo real
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Executa uma vez ao carregar a página para já exibir uma senha inicial
geraSenha();

function geraSenha() {
    let alfabeto = '';
    
    if (checkbox[0] && checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1] && checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2] && checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3] && checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }
    
    let senha = '';
    
    // Proteção/Tratamento caso o utilizador desmarque todas as caixas
    if (alfabeto.length === 0) {
        campoSenha.value = "Selecione uma opção";
        const valorEntropia = document.querySelector('.entropia');
        if (valorEntropia) valorEntropia.textContent = "";
        if (forcaSenha) forcaSenha.classList.remove('fraca', 'media', 'forte');
        return;
    }

    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    
    if (forcaSenha) {
        forcaSenha.classList.remove('fraca', 'media', 'forte');
        if (entropia > 57) {
            forcaSenha.classList.add('forte');
        } else if (entropia > 35 && entropia <= 57) {
            forcaSenha.classList.add('media');
        } else if (entropia <= 35) {
            forcaSenha.classList.add('fraca');
        }
    }
    
    const valorEntropia = document.querySelector('.entropia');
    if (valorEntropia) {
        let dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
        valorEntropia.textContent = "Um computador pode levar até " + dias + " dias para descobrir essa senha.";
    }
}
