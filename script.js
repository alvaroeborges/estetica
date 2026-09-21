/* ==========================================================
   RDC REAL DETAIL CAR — script.js
   JavaScript simples, dividido em pequenas funções.
   Cada função cuida de UMA coisa só, para facilitar o entendimento.
   ========================================================== */

// Espera o HTML inteiro carregar antes de rodar qualquer coisa
document.addEventListener("DOMContentLoaded", function () {
  ativarMenuMobile();
  ativarCabecalhoFixo();
  ativarAnimacaoAoRolar();
  contarAnosDesde2020();
  mostrarAnoAtualNoRodape();
  ativarBotoesMagneticos();
});

/* --------------------------------------------------------
   1) MENU MOBILE (hambúrguer)
   Quando o botão é clicado, o menu abre ou fecha.
-------------------------------------------------------- */
function ativarMenuMobile() {
  const botao = document.getElementById("navToggle");
  const menu = document.getElementById("nav");

  botao.addEventListener("click", function () {
    // classList.toggle liga/desliga uma classe CSS a cada clique
    menu.classList.toggle("is-open");
    botao.classList.toggle("is-open");

    // Guardamos se o menu está aberto ou fechado, para acessibilidade
    const estaAberto = menu.classList.contains("is-open");
    botao.setAttribute("aria-expanded", estaAberto);
  });

  // Fecha o menu automaticamente quando o usuário clica em um link
  const linksDoMenu = menu.querySelectorAll("a");
  linksDoMenu.forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("is-open");
      botao.classList.remove("is-open");
    });
  });
}

/* --------------------------------------------------------
   2) CABEÇALHO FIXO COM FUNDO AO ROLAR A PÁGINA
   Adiciona uma classe no header quando o usuário desce a página,
   para deixar o fundo mais escuro e com sombra.
-------------------------------------------------------- */
function ativarCabecalhoFixo() {
  const header = document.getElementById("header");
  const distanciaMinima = 40; // pixels rolados antes de mudar o header

  window.addEventListener("scroll", function () {
    if (window.scrollY > distanciaMinima) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  });
}

/* --------------------------------------------------------
   3) ANIMAÇÃO "REVEAL" AO ROLAR A PÁGINA
   Usamos o IntersectionObserver, que avisa quando um elemento
   entra na tela. Assim adicionamos uma classe que dispara a
   animação definida no CSS (a classe .reveal).
-------------------------------------------------------- */
function ativarAnimacaoAoRolar() {
  const elementosParaAnimar = document.querySelectorAll(".reveal");

  const observador = new IntersectionObserver(
    function (elementosVisiveis) {
      elementosVisiveis.forEach(function (item) {
        if (item.isIntersecting) {
          item.target.classList.add("is-visible");
          // Depois de animar uma vez, não precisamos mais observar o elemento
          observador.unobserve(item.target);
        }
      });
    },
    { threshold: 0.15 } // dispara quando 15% do elemento aparece na tela
  );

  elementosParaAnimar.forEach(function (elemento) {
    observador.observe(elemento);
  });
}

/* --------------------------------------------------------
   4) CONTADOR DE ANOS DESDE 2020
   Calcula quantos anos a RDC já tem de estrada e anima
   o número subindo de 0 até o valor final.
-------------------------------------------------------- */
function contarAnosDesde2020() {
  const elementoContador = document.getElementById("yearsCount");
  const anoDeFundacao = 2020;
  const anoAtual = new Date().getFullYear();
  const totalDeAnos = anoAtual - anoDeFundacao;

  let numeroAtual = 0;
  const duracaoTotalMs = 1200;
  const intervaloMs = 40;
  const passosTotais = duracaoTotalMs / intervaloMs;
  const incrementoPorPasso = totalDeAnos / passosTotais;

  const intervalo = setInterval(function () {
    numeroAtual += incrementoPorPasso;

    if (numeroAtual >= totalDeAnos) {
      numeroAtual = totalDeAnos;
      clearInterval(intervalo);
    }

    elementoContador.textContent = Math.round(numeroAtual);
  }, intervaloMs);
}

/* --------------------------------------------------------
   5) ANO ATUAL NO RODAPÉ
   Evita ter que atualizar o "© 2026" manualmente todo ano.
-------------------------------------------------------- */
function mostrarAnoAtualNoRodape() {
  const elementoAno = document.getElementById("currentYear");
  elementoAno.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------
   6) BOTÕES MAGNÉTICOS
   Ao passar o mouse perto de um botão, ele "puxa" levemente
   na direção do cursor. Reforça a sensação de um site feito
   sob medida, com atenção a cada detalhe.
-------------------------------------------------------- */
function ativarBotoesMagneticos() {
  const temMousePreciso = window.matchMedia("(pointer: fine)").matches;
  const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!temMousePreciso || prefereMenosMovimento) return;

  const botoes = document.querySelectorAll(".btn");
  const forcaDoIma = 0.25;

  botoes.forEach(function (botao) {
    botao.addEventListener("mousemove", function (evento) {
      const area = botao.getBoundingClientRect();
      const deslocamentoX = (evento.clientX - area.left - area.width / 2) * forcaDoIma;
      const deslocamentoY = (evento.clientY - area.top - area.height / 2) * forcaDoIma;
      botao.style.transform = "translate(" + deslocamentoX + "px, " + deslocamentoY + "px)";
    });

    botao.addEventListener("mouseleave", function () {
      botao.style.transform = "";
    });
  });
}