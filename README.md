# Serverwin — Website Institucional (One Page)

Website institucional da startup **Serverwin**, desenvolvido com foco em estética contemporânea de tecnologia (*Anti-AI & Editorial Design*), performance de ponta, animações fluidas via GSAP e total acessibilidade.

---

## 🚀 Stack Tecnológica

* **HTML5 Semântico:** Estruturação orientada a SEO, acessibilidade e microformatos.
* **CSS3 Modular:** Design tokens (`variables.css`), tipografia editorial, layouts assimétricos e responsividade completa sem frameworks pesados.
* **JavaScript Moderno (ES6+ Modules):** Lógica modularizada para animações, navegação, validação de segurança e manipulação de DOM.
* **GSAP 3 + ScrollTrigger:** Animações orquestradas de entrada (Hero Entrance), revelações conforme rolagem (Scroll Reveals) e botões magnéticos.
* **Lucide Icons:** Conjunto de ícones leves e consistentes.

---

## 📁 Estrutura de Diretórios

```text
Site ServerWin/
│
├── index.html                   # Estrutura semântica principal One Page
│
├── css/
│   ├── variables.css            # Design tokens (cores, fontes, espaçamentos)
│   ├── base.css                 # Reset, tipografia global, acessibilidade
│   ├── components.css           # Botões, badges, inputs, alertas, botão de topo
│   ├── sections.css             # Estilos das seções (Hero, Sobre, Produtos, Equipe, Contato, Footer)
│   └── responsive.css           # Breakpoints customizados (desktop, tablet, mobile)
│
├── js/
│   ├── config.js                # Centralização de dados (WhatsApp, produtos, equipe, configs)
│   ├── animations.js            # Timelines GSAP, ScrollTrigger, canvas interativo e botões magnéticos
│   ├── navigation.js            # Rolagem suave, menu mobile com acessibilidade e Back-to-Top
│   ├── contact.js               # Integração WhatsApp, validação, honeypot antispam e rate limit
│   └── main.js                  # Ponto de entrada da aplicação
│
├── assets/
│   ├── logos/
│   │   ├── serverwin-logo.svg   # Logomarca completa horizontal
│   │   └── serverwin-symbol.svg # Símbolo / Favicon vetorial
│   ├── images/
│   │   ├── products/
│   │   │   └── cuida-conecta-mockup.svg # Mockup digital da interface do Cuida Conecta
│   │   └── team/
│   │       ├── daniel-alves.svg # Retrato estilizado de Daniel Alves de Barros
│   │       ├── maria-clara.svg  # Retrato estilizado de Maria Clara
│   │       ├── risya-vitoria.svg# Retrato estilizado de Risya Vitória
│   │       └── dayanne-regina.svg # Retrato estilizado de Dayanne Regina
│   └── icons/
│
└── README.md
```

---

## ⚙️ Como Atualizar Informações Institucionais

Todas as informações essenciais estão centralizadas no arquivo [`js/config.js`](file:///c:/Users/conta/Documents/Site%20ServerWin/js/config.js):

1. **Número de WhatsApp Comercial:**
   Edite a propriedade `company.whatsapp.number` com o código do país e DDD (ex: `"5511999999999"`).
2. **E-mail Institucional:**
   Atualize `company.email`.
3. **Fotos da Equipe:**
   Basta colocar as fotos reais em `assets/images/team/` e atualizar os caminhos no array `team` em `js/config.js`.
4. **Backend do Formulário de E-mail:**
   Configure a URL do seu serviço de e-mail (ex: Formspree, Resend, Supabase Edge Function ou backend próprio) na propriedade `contactForm.endpoint`.

---

## 🛡️ Segurança & Anti-Spam do Formulário

* **Honeypot Invisível:** Campo oculto para humanos (`sw_validation_token`) que, se preenchido por robôs automatizados, bloqueia o envio.
* **Rate Limiting no Cliente:** Impede envios consecutivos em rajada (mínimo de 30 segundos).
* **Validação Rigorosa:** Verificação sintática de e-mail e tamanhos mínimos de caracteres.
* **Transparência:** O formulário não simula envios bem-sucedidos vazios se o endpoint do backend ainda não estiver configurado.

---

## 🏃 Como Visualizar Localmente

Como o projeto utiliza módulos JavaScript (`type="module"`), abra a pasta através de um servidor local simples (para evitar restrições de CORS do protocolo `file://`):

* **Com VS Code:** Clique em *"Go Live"* com a extensão Live Server.
* **Com Node.js:** Execute `npx serve .` ou `npx http-server .`
* **Com Python:** Execute `python -m http.server 8000`
