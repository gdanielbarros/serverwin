/**
 * SERVERWIN — Ponto de Entrada Principal (Main Application Entry)
 */

import { CONFIG } from "./config.js";
import { initAnimations } from "./animations.js";
import { initNavigation } from "./navigation.js";
import { initContact } from "./contact.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inicialização dos ícones Lucide
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  // Preenche metadados dinâmicos (como ano e email institucional no rodapé)
  populateDynamicData();

  // Inicializa subsistemas
  initNavigation();
  initAnimations();
  initContact();
});

function populateDynamicData() {
  // Ano atual de direitos autorais
  const yearSpans = document.querySelectorAll("[data-bind='current-year']");
  const currentYear = new Date().getFullYear();
  yearSpans.forEach((el) => (el.textContent = currentYear));

  // Email institucional
  const emailSpans = document.querySelectorAll("[data-bind='company-email']");
  emailSpans.forEach((el) => {
    el.textContent = CONFIG.company.email;
    if (el.tagName === "A") {
      el.setAttribute("href", `mailto:${CONFIG.company.email}`);
    }
  });
}
