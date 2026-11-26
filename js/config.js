/**
 * SERVERWIN — Configurações e Centralização de Dados
 * Todos os dados institucionais, contatos, produtos e equipe são gerenciados aqui
 * para facilitar a manutenção sem necessidade de alterar o markup HTML.
 */

export const CONFIG = {
  company: {
    name: "Serverwin",
    subtitle: "Tecnologia & Processos",
    tagline: "Tecnologia aplicada à realidade, desenvolvendo soluções e otimizando processos.",
    shortDescription: "Startup de tecnologia focada no desenvolvimento de soluções digitais de alto impacto, engenharia de software e otimização contínua de processos.",
    email: "serverwin.tech@gmail.com", // Atualizável pela equipe
    whatsapp: {
      ddd: "81",
      number: "5581996909278", // DDD 81 (Pernambuco) - WhatsApp Business ativo
      displayNumber: "(81) 9XXXX-XXXX",
      defaultMessage: "Vim do site e quero saber sobre: "
    },
    location: "Pernambuco, Brasil (DDD 81)",
    foundedYear: 2024,
    socials: {
      linkedin: "https://linkedin.com/company/serverwin",
      github: "https://github.com/serverwin",
      instagram: "https://instagram.com/serverwin"
    }
  },

  // Portfólio de Produtos e Soluções (Escalável)
  products: [
    {
      id: "cuidado-conectado",
      name: "Cuidado Conectado",
      category: "Solução Digital de Gestão & Cuidado",
      status: "Em Teste Municipal",
      tagline: "Mais cuidado, mais perto de você",
      description: "Solução digital desenvolvida pela equipe da Serverwin, projetada para conectar profissionais de saúde e cidadãos, otimizando processos no fluxo de cuidados com integração de dados em tempo real e alta confiabilidade.",
      features: [
        "Gestão integrada e simplificada de fluxos de cuidado",
        "Conectividade multi-acesso em tempo real",
        "Segurança rigorosa com dados criptografados",
        "Arquitetura escalável para gestão municipal e privada"
      ],
      tags: ["Solução Digital", "Gestão de Cuidados", "Tempo Real", "Serverwin Core"],
      logo: "assets/logos/Logo com simbolo_semFundo.png",
      mockup: "assets/logos/telaCuidaConecta.png",
      externalUrl: "https://cuidaconecta.lovable.app/", // Link configurável para página externa ou demonstração
      buttonText: "Conhecer Solução"
    }
  ],

  // Apresentação da Equipe (Exclusivamente os 4 integrantes autorizados)
  team: [
    {
      id: "daniel-alves",
      name: "Daniel Alves de Barros",
      role: "Desenvolvedor",
      department: "Engenharia de Software",
      initials: "DB",
      image: "assets/images/team/Daniel.jpg",
      tag: "Software Engineering"
    },
    {
      id: "maria-clara",
      name: "Maria Clara",
      role: "Economista / Desenvolvedora",
      department: "Economia & Desenvolvimento",
      initials: "MC",
      image: "assets/images/team/Clara.jpeg",
      tag: "Economics & Tech"
    },
    {
      id: "risya-vitoria",
      name: "Risya Vitória",
      role: "Colaboradora Técnica",
      department: "Operações & Tecnologia",
      initials: "RV",
      image: "assets/images/team/Risya.jpeg",
      tag: "Technical Specialist"
    },
    {
      id: "dayanne-regina",
      name: "Dayanne Regina",
      role: "RH / Psicóloga",
      department: "Pessoas & Cultura",
      initials: "DR",
      image: "assets/images/team/Dayanne.jpeg",
      tag: "People & Culture"
    }
  ],

  // Pilares Institucionais (Sobre a Serverwin)
  pillars: [
    {
      number: "01",
      title: "Tecnologia Aplicada à Realidade",
      description: "Desenvolvemos tecnologia orientada a resolver demandas concretas, transformando desafios complexos em produtos eficientes e acessíveis."
    },
    {
      number: "02",
      title: "Desenvolvimento de Soluções Digitais",
      description: "Construção de aplicações robustas, modernas e seguras, pensadas desde a fundação para escalabilidade e performance sustentável."
    },
    {
      number: "03",
      title: "Otimização e Melhoria de Processos",
      description: "Mapeamento rigoroso e automação inteligente para eliminar gargalos operacionais e acelerar a produtividade das organizações."
    },
    {
      number: "04",
      title: "Capacidade de Transformação Técnica",
      description: "Equipe multidisciplinar com capacidade comprovada de transformar problemas estratégicos em soluções de alto valor agregado."
    }
  ],

  // Configuração do Formulário de Contato e Segurança
  contactForm: {
    // Para envio em produção, substitua pelo endpoint real (ex: 'https://formspree.io/f/seu-id' ou API própria)
    endpoint: "",
    honeypotFieldName: "sw_validation_token",
    rateLimitSeconds: 30
  }
};
