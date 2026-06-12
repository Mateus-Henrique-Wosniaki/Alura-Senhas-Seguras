const numeroSenha = document.querySelector(&#39;.parametro-senha__texto&#39;);
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = &#39;ABCDEFGHIJKLMNOPQRSTUVXYWZ&#39;;
const letrasMinusculas = &#39;abcdefghijklmnopqrstuvxywz&#39;;
const numeros = &#39;0123456789&#39;;
const simbolos = &#39;!@%*?&#39;;
const botoes = document.querySelectorAll(&#39;.parametro-senha__botao&#39;);
const campoSenha = document.querySelector(&#39;#campo-senha&#39;);
const checkbox = document.querySelectorAll(&#39;.checkbox&#39;);
const forcaSenha = document.querySelector(&#39;.forca&#39;);

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
if (tamanhoSenha &gt; 1) {
// tamanhoSenha = tamanhoSenha-1;
tamanhoSenha--;

}
numeroSenha.textContent = tamanhoSenha;
geraSenha();
}
function aumentaTamanho() {
if (tamanhoSenha &lt; 20) {
// tamanhoSenha = tamanhoSenha+1;
tamanhoSenha++;
}
numeroSenha.textContent = tamanhoSenha;
geraSenha();
}

for (i = 0; i &lt; checkbox.length; i++) {
checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
let alfabeto = &#39;&#39;;
if (checkbox[0].checked) {
alfabeto = alfabeto + letrasMaiusculas;
}
if (checkbox[1].checked) {
alfabeto = alfabeto + letrasMinusculas;
}
if (checkbox[2].checked) {
alfabeto = alfabeto + numeros;
}
if (checkbox[3].checked) {

alfabeto = alfabeto + simbolos;
}
let senha = &#39;&#39;;
for (let i = 0; i &lt; tamanhoSenha; i++) {
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
forcaSenha.classList.remove(&#39;fraca&#39;, &#39;media&#39;, &#39;forte&#39;);
if (entropia &gt; 57) {
forcaSenha.classList.add(&#39;forte&#39;);
} else if (entropia &gt; 35 &amp;&amp; entropia &lt; 57) {
forcaSenha.classList.add(&#39;media&#39;);
} else if (entropia &lt;= 35) {
forcaSenha.classList.add(&#39;fraca&#39;);
}
const valorEntropia = document.querySelector(&#39;.entropia&#39;);
valorEntropia.textContent = &quot;Um computador pode levar até &quot; + Math.floor(2 ** entropia /
(100e6 * 60 * 60 * 24)) + &quot; dias para descobrir essa senha.&quot;;
}
