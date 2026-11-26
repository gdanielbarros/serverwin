/**
 * SERVERWIN — Motor de Animações & Motion Design
 * Utiliza GSAP + ScrollTrigger com foco em elegância editorial e performance.
 * Respeita rigorosamente prefers-reduced-motion.
 */

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Se o usuário prefere movimentos reduzidos, garante visibilidade imediata sem transições complexas
  if (prefersReducedMotion) {
    document.documentElement.classList.add("reduced-motion");
    if (window.gsap) {
      gsap.set("[data-reveal], .hero-title, .hero-lead, .hero-cta, .hero-badge, .nav-brand, .nav-links", {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: "all"
      });
    }
    return;
  }

  // Registra plugins GSAP se carregados
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.warn("GSAP ou ScrollTrigger não carregados globalmente.");
    return;
  }

  initHeroCanvas();
  initHeroEntrance();
  initScrollReveals();
  initMagneticButtons();
}

/**
 * Canvas de Fundo Tecnológico e Interativo (Partículas e nós conectivos sutis)
 */
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 22000), 45); // Adaptativo e leve
  const mouse = { x: -1000, y: -1000, radius: 120 };

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.8 + 1,
      color: i % 3 === 0 ? "#00E5FF" : i % 5 === 0 ? "#00FF87" : "#38BDF8"
    });
  }

  window.addEventListener("resize", () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Conexões de linhas entre nós próximos
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.15;
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Atualização e renderização das partículas
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Reatividade sutil ao cursor
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius) {
        const force = (1 - dist / mouse.radius) * 1.5;
        p.x -= (dx / dist) * force;
        p.y -= (dy / dist) * force;
      }

      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    animationFrameId = requestAnimationFrame(animate);
  }

  // Observador para pausar o canvas quando o Hero não estiver visível (Economia de CPU/Bateria)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cancelAnimationFrame(animationFrameId);
          animate();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      });
    },
    { threshold: 0.05 }
  );
  observer.observe(canvas);
}

/**
 * Animação de Entrada do Hero (Rápida, fluida e impactante)
 */
function initHeroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

  tl.from(".nav-bar", {
    y: -30,
    opacity: 0,
    duration: 0.8
  })
    .from(".hero-status-badge", {
      opacity: 0,
      y: 15,
      duration: 0.6
    }, "-=0.4")
    .from(".hero-title-line", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1
    }, "-=0.3")
    .from(".hero-lead", {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.5")
    .from(".hero-actions .btn", {
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.7
    }, "-=0.5")
    .from(".hero-meta-bar", {
      opacity: 0,
      y: 20,
      duration: 0.7
    }, "-=0.4");
}

/**
 * Revelações com ScrollTrigger ao longo das seções
 */
function initScrollReveals() {
  // Revelação de seções editoriais
  const sections = document.querySelectorAll(".editorial-section");
  sections.forEach((section) => {
    const header = section.querySelector(".section-header");
    if (header) {
      gsap.from(header, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 35,
        duration: 0.9,
        ease: "power2.out"
      });
    }
  });

  // Pilares da seção Sobre
  const pillars = document.querySelectorAll(".pillar-card");
  if (pillars.length > 0) {
    gsap.from(pillars, {
      scrollTrigger: {
        trigger: ".pillars-grid",
        start: "top 82%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    });
  }

  // Cuida Conecta Showcase
  const productShowcase = document.querySelector(".product-showcase");
  if (productShowcase) {
    gsap.from(".product-meta-col", {
      scrollTrigger: {
        trigger: productShowcase,
        start: "top 78%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      x: -30,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".product-visual-col", {
      scrollTrigger: {
        trigger: productShowcase,
        start: "top 78%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      x: 30,
      duration: 1,
      ease: "power3.out"
    });
  }

  // Cartões da Equipe
  const teamCards = document.querySelectorAll(".team-member-card");
  if (teamCards.length > 0) {
    gsap.from(teamCards, {
      scrollTrigger: {
        trigger: ".team-grid",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.85,
      ease: "power2.out"
    });
  }

  // Bloco de Contato
  const contactWrapper = document.querySelector(".contact-wrapper");
  if (contactWrapper) {
    gsap.from(".contact-direct-card", {
      scrollTrigger: {
        trigger: contactWrapper,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    });

    gsap.from(".contact-form-card", {
      scrollTrigger: {
        trigger: contactWrapper,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.15,
      ease: "power2.out"
    });
  }
}

/**
 * Botões Magnéticos (Efeito sutil e orgânico em desktops com mouse)
 */
function initMagneticButtons() {
  if (window.matchMedia("(pointer: coarse)").matches) return; // Dispositivos touch não usam magnetic

  const magneticElements = document.querySelectorAll(".magnetic");

  magneticElements.forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      xTo(relX * 0.28);
      yTo(relY * 0.28);
    });

    el.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}
