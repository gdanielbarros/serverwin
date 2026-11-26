/**
 * SERVERWIN — Navegação, Rolagem Suave & Botão Voltar ao Topo
 */

export function initNavigation() {
  initSmoothScroll();
  initSectionSpy();
  initMobileMenu();
  initBackToTop();
}

/**
 * Rolagem suave com compensação da altura do cabeçalho fixo
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector(".header-main");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Fecha o menu mobile se estiver aberto
        closeMobileMenu();

        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

        // Atualiza o foco de acessibilidade
        targetElement.setAttribute("tabindex", "-1");
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * Observador de seção ativa para destacar o menu de navegação
 */
function initSectionSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
          } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/**
 * Menu Mobile com suporte a acessibilidade e teclado
 */
let isMenuOpen = false;

function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".mobile-overlay");

  if (!toggleBtn || !mobileNav) return;

  function toggle() {
    isMenuOpen ? closeMobileMenu() : openMobileMenu();
  }

  toggleBtn.addEventListener("click", toggle);
  if (overlay) overlay.addEventListener("click", closeMobileMenu);

  // Fecha com tecla ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMobileMenu();
      toggleBtn.focus();
    }
  });
}

function openMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".mobile-overlay");

  isMenuOpen = true;
  document.body.classList.add("nav-open");
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.classList.add("is-active");
  }
  if (mobileNav) {
    mobileNav.classList.add("is-active");
    mobileNav.setAttribute("aria-hidden", "false");
  }
  if (overlay) overlay.classList.add("is-active");
}

function closeMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".mobile-overlay");

  isMenuOpen = false;
  document.body.classList.remove("nav-open");
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.classList.remove("is-active");
  }
  if (mobileNav) {
    mobileNav.classList.remove("is-active");
    mobileNav.setAttribute("aria-hidden", "true");
  }
  if (overlay) overlay.classList.remove("is-active");
}

/**
 * Botão Flutuante Voltar ao Topo (Back to Top)
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  let isVisible = false;

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollY > 380) {
      if (!isVisible) {
        isVisible = true;
        backToTopBtn.classList.add("is-visible");
        backToTopBtn.removeAttribute("tabindex");
      }
    } else {
      if (isVisible) {
        isVisible = false;
        backToTopBtn.classList.remove("is-visible");
        backToTopBtn.setAttribute("tabindex", "-1");
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    const hero = document.getElementById("hero");
    if (hero) {
      hero.setAttribute("tabindex", "-1");
      hero.focus({ preventScroll: true });
    }
  });

  // Acessibilidade por teclado (Enter e Espaço)
  backToTopBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      backToTopBtn.click();
    }
  });
}
