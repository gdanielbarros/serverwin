/**
 * SERVERWIN — Gerenciador de Contato & Segurança do Formulário
 * WhatsApp direto + Validação robusta de formulário, Honeypot antispam e Rate Limiting.
 */

import { CONFIG } from "./config.js";

export function initContact() {
  setupWhatsAppButtons();
  setupContactForm();
}

/**
 * Vincula botões do WhatsApp com mensagem inicial codificada
 */
function setupWhatsAppButtons() {
  const whatsappButtons = document.querySelectorAll("[data-action='whatsapp']");
  const { number, defaultMessage } = CONFIG.company.whatsapp;
  const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(defaultMessage)}`;

  whatsappButtons.forEach((btn) => {
    btn.setAttribute("href", waUrl);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });
}

/**
 * Validação e Envio Seguro do Formulário
 */
function setupContactForm() {
  const form = document.getElementById("serverwin-contact-form");
  const statusContainer = document.getElementById("form-feedback-status");
  if (!form || !statusContainer) return;

  let lastSubmitTime = 0;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Verificação de Honeypot Anti-Spam (Campo invisível para humanos, mas preenchido por robôs)
    const honeypot = form.querySelector(`input[name="${CONFIG.contactForm.honeypotFieldName}"]`);
    if (honeypot && honeypot.value.trim() !== "") {
      console.warn("Spam detectado via honeypot.");
      showFeedback("Falha na validação de segurança. Envio bloqueado.", "error");
      return;
    }

    // 2. Rate Limiting (Evita envios repetidos em rajada)
    const now = Date.now();
    const minInterval = (CONFIG.contactForm.rateLimitSeconds || 30) * 1000;
    if (now - lastSubmitTime < minInterval) {
      const waitRemaining = Math.ceil((minInterval - (now - lastSubmitTime)) / 1000);
      showFeedback(`Por favor, aguarde ${waitRemaining}s antes de enviar uma nova mensagem.`, "warning");
      return;
    }

    // 3. Validação dos Campos Obrigatórios
    const nameInput = form.querySelector("#contact-name");
    const emailInput = form.querySelector("#contact-email");
    const subjectInput = form.querySelector("#contact-subject");
    const messageInput = form.querySelector("#contact-message");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const subject = subjectInput ? subjectInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    clearFieldErrors();

    let hasError = false;

    if (!name || name.length < 3) {
      setFieldError(nameInput, "Informe seu nome completo (mínimo 3 caracteres).");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setFieldError(emailInput, "Informe um endereço de e-mail válido.");
      hasError = true;
    }

    if (!subject || subject.length < 4) {
      setFieldError(subjectInput, "Informe o assunto do contato (mínimo 4 caracteres).");
      hasError = true;
    }

    if (!message || message.length < 15) {
      setFieldError(messageInput, "Sua mensagem deve conter pelo menos 15 caracteres.");
      hasError = true;
    }

    if (hasError) {
      showFeedback("Por favor, revise os campos destacados acima.", "error");
      return;
    }

    // 4. Estado de Carregamento
    const submitBtn = form.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border" role="status"></span>
      <span>Transmitindo dados...</span>
    `;
    showFeedback("Processando e validando sua mensagem...", "info");

    const payload = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    };

    try {
      const endpoint = CONFIG.contactForm.endpoint;

      if (!endpoint || endpoint.trim() === "") {
        // Alerta informativo: se o endpoint de produção não estiver configurado,
        // não fingimos sucesso para respeitar a diretriz de não simular envios bem-sucedidos.
        await new Promise((resolve) => setTimeout(resolve, 800));
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        showFeedback(
          "Configuração de backend pendente: Para envio real por e-mail, configure o endpoint no arquivo 'js/config.js' (ex: Formspree, Resend ou API própria). Para contato imediato, utilize o botão de WhatsApp acima.",
          "warning"
        );
        return;
      }

      // Envio real para o endpoint configurado
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        lastSubmitTime = Date.now();
        form.reset();
        showFeedback("Mensagem enviada com sucesso! A equipe da Serverwin responderá em breve.", "success");
      } else {
        throw new Error(`Erro no servidor: ${response.status}`);
      }
    } catch (err) {
      console.error("Falha no envio do formulário:", err);
      showFeedback(
        "Houve uma falha ao transmitir a mensagem. Por favor, tente novamente ou entre em contato direto pelo WhatsApp.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function setFieldError(field, errorText) {
    if (!field) return;
    field.classList.add("input-error");
    const helper = field.parentElement.querySelector(".field-error-msg");
    if (helper) {
      helper.textContent = errorText;
      helper.style.display = "block";
    }
  }

  function clearFieldErrors() {
    form.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));
    form.querySelectorAll(".field-error-msg").forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });
  }

  function showFeedback(message, type) {
    statusContainer.className = `form-status status-${type}`;
    statusContainer.textContent = message;
    statusContainer.setAttribute("role", "alert");
    statusContainer.style.display = "block";
  }
}
