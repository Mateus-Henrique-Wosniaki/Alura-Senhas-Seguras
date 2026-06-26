document.addEventListener("DOMContentLoaded", () => {
    // Seleção correta por IDs e classes únicas
    const campoSenha = document.getElementById('campo-senha');
    const tamanhoTexto = document.getElementById('tamanho-texto');
    const btnMenos = document.getElementById('btn-menos');
    const btnMais = document.getElementById('btn-mais');
    const checkboxes = document.querySelectorAll('.checkbox-opcao');
    const barraIndicador = document.getElementById('barra-indicador');
    const textoForca = document.getElementById('texto-forca');

    // Grupos de caracteres
    const conjuntos = [
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Maiúsculas
        "abcdefghijklmnopqrstuvwxyz", // Minúsculas
        "0123456789",                 // Números
        "!@#$%^&*()_+~`|}{[]:;?><,./-=" // Símbolos
    ];

    let tamanhoSenha = 12;

    // Controladores de tamanho
    btnMais.addEventListener('click', () => {
        if (tamanhoSenha < 32) {
            tamanhoSenha++;
            tamanhoTexto.textContent = tamanhoSenha;
            gerarSenha();
        }
    });

    btnMenos.addEventListener('click', () => {
        if (tamanhoSenha > 4) {
            tamanhoSenha--;
            tamanhoTexto.textContent = tamanhoSenha;
            gerarSenha();
        }
    });

    // Função que cria a string aleatória
    function gerarSenha() {
        let poolDeCaracteres = "";
        let tiposAtivos = 0;

        // Mapeia quais caixas estão marcadas
        checkboxes.forEach((box, index) => {
            if (box.checked) {
                poolDeCaracteres += conjuntos[index];
                tiposAtivos++;
            }
        });

        // Caso nenhuma caixa esteja marcada
        if (poolDeCaracteres === "" || tamanhoSenha === 0) {
            campoSenha.value = "";
            atualizarBarra(0, "Selecione uma opção");
            return;
        }

        let resultado = "";
        for (let i = 0; i < tamanhoSenha; i++) {
            const indexAleatorio = Math.floor(Math.random() * poolDeCaracteres.length);
            resultado += poolDeCaracteres[indexAleatorio];
        }

        campoSenha.value = resultado;
        
        // Avalia a força com base nos critérios escolhidos
        avaliarForca(tamanhoSenha, tiposAtivos);
    }

    // Calcula a largura e a cor da barra
    function avaliarForca(tamanho, tipos) {
        const pontuacao = tamanho * tipos;

        if (pontuacao < 20) {
            atualizarBarra(33, "Fraca 🔴", "var(--cor-fraca)");
        } else if (pontuacao >= 20 && pontuacao < 40) {
            atualizarBarra(66, "Moderada 🔵", "var(--cor-media)");
        } else {
            atualizarBarra(100, "Excelente! 🟢", "var(--cor-forte)");
        }
    }

    // Aplica as alterações de estilo inline de forma limpa
    function atualizarBarra(porcentagem, mensagem, cor) {
        barraIndicador.style.width = `${porcentagem}%`;
        barraIndicador.style.backgroundColor = cor || "transparent";
        textoForca.textContent = `Força: ${mensagem}`;
    }

    // Adiciona evento de mudança a cada checkbox
    checkboxes.forEach(box => {
        box.addEventListener('change', gerarSenha);
    });

    // Inicia gerando a primeira senha padrão
    gerarSenha();
});
