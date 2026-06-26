const barra = document.getElementById('barra-indicador');
const textoForca = document.querySelector('.entropia');

// Exemplo se a senha for MÉDIA:
barra.className = "barra-seguranca media";
textoForca.textContent = "Segurança Média (Boa)";

// Exemplo se a senha for FORTE:
barra.className = "barra-seguranca forte";
textoForca.textContent = "Segurança Alta (Excelente)";
