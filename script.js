// 1. Selecionar os elementos do HTML
const campoSenha = document.querySelector('#campo-senha');
const tamanhoTexto = document.querySelector('.parametro-senha__texto');
const btnMenos = document.querySelectorAll('.parametro-senha__botao')[0];
const btnMais = document.querySelectorAll('.parametro-senha__botao')[1];
const checkboxes = document.querySelectorAll('.checkbox');
const barraIndicador = document.querySelector('#barra-indicador');
const textoEntropia = document.querySelector('.entropia');

// Bancos de caracteres
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

let tamanhoSenha = 12;

// 2. Controlar os botões de + e -
btnMais.addEventListener('click', () => {
    tamanhoSenha++;
    tamanhoTexto.textContent = tamanhoSenha;
    gerarEAtualizarSenha();
});

btnMenos.addEventListener('click', () => {
    if (tamanhoSenha > 4) { // Evita senhas menores que 4
        tamanhoSenha--;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarEAtualizarSenha();
    }
});

// 3. Função principal para gerar a senha e medir a força
function gerarEAtualizarSenha() {
    let caracteresPermitidos = "";
    let tiposSelecionados = 0;

    // Verifica o que o usuário marcou
    if (checkboxes[0].checked) { caracteresPermitidos += letrasMaiusculas; tiposSelecionados++; }
    if (checkboxes[1].checked) { caracteresPermitidos += letrasMinusculas; tiposSelecionados++; }
    if (checkboxes[2].checked) { caracteresPermitidos += numeros; tiposSelecionados++; }
    if (checkboxes[3].checked) { caracteresPermitidos += simbolos; tiposSelecionados++; }

    // Se nada estiver marcado, limpa o campo
    if (caracteresPermitidos === "") {
        campoSenha.value = "";
        atualizarBarraVisual(0);
        return;
    }

    // Gera a senha aleatória
    let senhaGerada = "";
    for (let i = 0; i < tamanhoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        senhaGerada += caracteresPermitidos[indiceAleatorio];
    }

    campoSenha.value = senhaGerada;

    // Lógica para medir a força (Baseada no tamanho e variedade)
    let pontuacao = tamanhoSenha * tiposSelecionados;

    if (pontuacao < 20) {
        atualizarBarraVisual("fraca", "Senha Fraca 🔴");
    } else if (pontuacao >= 20 && pontuacao < 40) {
        atualizarBarraVisual("media", "Senha Moderada 🔵");
    } else {
        atualizarBarraVisual("forte", "Senha Excelente! 🟢");
    }
}

// 4. Função que muda as classes do CSS que criamos
function atualizarBarraVisual(classe, texto) {
    // Reseta as classes antigas
    barraIndicador.className = "barra-seguranca"; 
    
    if (classe) {
        barraIndicador.classList.add(classe);
        textoEntropia.textContent = texto;
    } else {
        textoEntropia.textContent = "Selecione pelo menos uma opção";
    }
}

// Escutar mudanças nos checkboxes para gerar uma senha nova automaticamente
checkboxes.forEach(checkbox => checkbox.addEventListener('change', gerarEAtualizarSenha));

// Gera uma senha assim que a página carrega
gerarEAtualizarSenha();
