// static/js/theme-toggle.js
(() => {
  'use strict';

  // Elementos e Chaves
  const HTML_ELEMENT = document.documentElement;
  const TOGGLE_BUTTON = document.getElementById('theme-toggle');
  const LSTORAGE_KEY = 'color-theme';

  // Nomes dos Temas (Strings para localStorage - minúsculas)
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  const THEME_ECOLOGIC = 'ecologic';
  const THEME_CHERRY = 'cherry';

  // Nomes das Classes CSS (Constantes JS - MAIÚSCULAS)
  const CLASS_LIGHT = 'light';
  const CLASS_DARK = 'dark';
  const CLASS_ECOLOGIC = 'ecologic';
  const CLASS_CHERRY = 'cherry';

  // Verifica se o botão existe antes de adicionar listeners
  if (!TOGGLE_BUTTON) {
    console.warn("Botão de tema com id 'theme-toggle' não encontrado.");
    return; // Sai do script se não houver botão
  }

  // Função para aplicar um tema específico e opcionalmente salvar
  function applyTheme(theme, saveChoice = false) {
    // Remove todas as classes de tema primeiro
    HTML_ELEMENT.classList.remove(CLASS_LIGHT, CLASS_DARK, CLASS_ECOLOGIC, CLASS_CHERRY);

    // Adiciona a classe do tema atual
    if (theme === THEME_DARK) {
      HTML_ELEMENT.classList.add(CLASS_DARK);
    } else if (theme === THEME_ECOLOGIC) {
      HTML_ELEMENT.classList.add(CLASS_ECOLOGIC);
    } else if (theme === THEME_CHERRY) {
      HTML_ELEMENT.classList.add(CLASS_CHERRY);
    } else { // Default é Light
      HTML_ELEMENT.classList.add(CLASS_LIGHT);
    }

    // Atualiza o aria-label para indicar o próximo tema no ciclo
    let nextThemeLabel = 'próximo tema'; // Valor padrão
     if (theme === THEME_LIGHT) nextThemeLabel = 'dark';
     if (theme === THEME_DARK) nextThemeLabel = 'ecologic';
     if (theme === THEME_ECOLOGIC) nextThemeLabel = 'cherry';
     if (theme === THEME_CHERRY) nextThemeLabel = 'light';
    TOGGLE_BUTTON.setAttribute('aria-label', `Mudar para tema ${nextThemeLabel}`);


    // Salva a escolha no localStorage se 'saveChoice' for true
    if (saveChoice) {
      try {
        // Salva o NOME do tema (string minúscula)
        localStorage.setItem(LSTORAGE_KEY, theme);
      } catch (e) {
        console.error("LocalStorage não disponível ou ocorreu um erro ao tentar salvar o tema:", e);
      }
    }
  }

  // Função que roda quando o botão é clicado - LÓGICA DE CICLO ATUALIZADA
  function cycleTheme() {
    let currentTheme = THEME_LIGHT; // Assume light por padrão

    // Determina o tema atual baseado na classe do <html>
    if (HTML_ELEMENT.classList.contains(CLASS_DARK)) {
      currentTheme = THEME_DARK;
    } else if (HTML_ELEMENT.classList.contains(CLASS_ECOLOGIC)) { // <-- Usa constante padronizada
      currentTheme = THEME_ECOLOGIC; // <-- Usa constante padronizada
    } else if (HTML_ELEMENT.classList.contains(CLASS_CHERRY)) {
       currentTheme = THEME_CHERRY;
    }

    let nextTheme;

    // Define a ordem do ciclo: Light -> Dark -> Ecologic -> Cherry -> Light
    if (currentTheme === THEME_LIGHT) {
      nextTheme = THEME_DARK;
    } else if (currentTheme === THEME_DARK) {
      nextTheme = THEME_ECOLOGIC; // <-- Usa constante padronizada
    } else if (currentTheme === THEME_ECOLOGIC) {
      nextTheme = THEME_CHERRY;
    } else {
      nextTheme = THEME_LIGHT;
    }

    // Aplica o próximo tema e salva a escolha
    applyTheme(nextTheme, true);
  }

  // Adiciona o listener de clique ao botão
  TOGGLE_BUTTON.addEventListener('click', cycleTheme);

})();
