/**
 * ORQUÍDEA ALIMENTOS — Script Principal
 * Funcionalidades: Scroll Suave, Menu Mobile, Modais, Vídeo e Animações
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===== 0. LOADING SCREEN =====
    const orqLoading = document.getElementById('orq-loading');
    if (orqLoading) {
        setTimeout(() => {
            orqLoading.classList.add('hidden');
            setTimeout(() => orqLoading.remove(), 700);
        }, 2200); // 2.2 segundos
    }

    // ===== 1. MENU MOBILE (HAMBURGUER) =====
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            nav.classList.toggle('open');
            document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : 'initial';
        });

        // Fecha o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                nav.classList.remove('open');
                document.body.style.overflow = 'initial';
            });
        });
    }

    // ===== 2. HEADER SCROLL EFFECT + BACK TO TOP =====
    const header = document.getElementById('header');
    const backTopBtn = document.getElementById('back-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (backTopBtn) {
            if (window.scrollY > 500) {
                backTopBtn.classList.add('show');
            } else {
                backTopBtn.classList.remove('show');
            }
        }

        highlightNavOnScroll();
    });

    // ===== 3. SCROLL SUAVE (NAV LINKS) =====
    window.scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    window.scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function highlightNavOnScroll() {
        let scrollPos = window.scrollY + 120;
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }

    // ===== 4. GESTÃO DE MODAIS =====
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');

    const modalData = {
        'acesso': {
            title: 'Portal de Compras',
            text: 'Área restrita para fornecedores homologados. Insira suas credenciais na plataforma para visualizar pedidos e cotações.',
            btnText: 'Acessar Plataforma',
            action: () => alert('Redirecionando para plataforma externa...')
        },
        'politicas': {
            title: 'Políticas de Fornecimento',
            text: 'O Manual de Compliance e Políticas Comerciais contém todas as diretrizes de faturamento, prazos e ética da Orquídea Alimentos.',
            btnText: 'Download Manual',
            action: () => alert('Download do Manual iniciado...')
        },
        'manual': {
            title: 'Manual do Fornecedor',
            text: 'Guia completo sobre nossos valores, padrões de qualidade exigidos e processos logísticos.',
            btnText: 'Baixar Manual',
            action: () => alert('Download do Manual do Fornecedor iniciado...')
        },
        'canal': {
            title: 'Canal de Ética',
            text: 'Canal seguro e confidencial para relatar qualquer conduta que não esteja de acordo com nosso Código de Ética.',
            btnText: 'Abrir Relato',
            action: () => alert('Redirecionando para Canal de Ética...')
        },
        'qualidade': {
            title: 'Orientações de Fábrica',
            text: 'Para visitas técnicas ou entregas, é necessário agendamento prévio com 48h de antecedência e apresentação de documento com foto.',
            btnText: 'Entendi',
            action: () => closeModal()
        }
    };

    window.showModal = (type) => {
        const data = modalData[type];
        if (data && modalOverlay && modalContent) {
            modalContent.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.text}</p>
                <button class="btn btn-primary" id="modal-action-btn">${data.btnText}</button>
            `;

            document.getElementById('modal-action-btn').onclick = data.action;
            modalOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('open');
            document.body.style.overflow = 'initial';
        }
    };

    // ===== 5. VÍDEO =====
    window.openVideo = () => {
        alert('Vídeo em breve! Conteúdo em fase de produção.');
    };

    window.openTutorial = (id) => {
        alert(`Abrindo tutorial ${id}: Redirecionando para material de treinamento.`);
    };

    // ===== 6. ANIMAÇÃO DE REVELAÇÃO (Scroll Reveal) =====
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -80px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, observerOptions);

    document.querySelectorAll('.content-block, .card, .policy-card, .section-header, .family-tag, .hero-content, .sustent-card, .ethics-val, .download-card, .pillar-block').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.cards-grid, .policy-grid, .sustent-grid').forEach(grid => {
        Array.from(grid.children).forEach((child, index) => {
            if (index < 4) child.classList.add(`delay-${index + 1}`);
        });
    });

    setTimeout(() => {
        const hero = document.querySelector('.hero-content');
        if (hero) hero.classList.add('visible');
    }, 100);

    // ===== 7. MODAL — QUALIDADE =====
    const qualData = {
        q1: {
            num: 'I',
            title: 'Segurança de Alimentos',
            subtitle: 'BPF, APPCC e conformidade com legislações',
            paragraphs: [
                'Para ser um fornecedor Orquídea é importante que você esteja atento ao cumprimento das normas de Boas Práticas de Fabricação, utilize ferramentas que ajudem a identificar e controlar riscos dentro do seu processo, como por exemplo o programa de Análises de Perigos e Pontos Críticos de Controle, e que também comprove através de laudos de análises, o atendimento das legislações vigentes para seu produto ou serviço.',
                'Empresas com certificação de Segurança de Alimentos, reconhecida pelo GFSI, terão sua homologação facilitada, visto que a certificação garante os pontos citados acima, mas se você não é certificado, não se preocupe! Através do nosso questionário de homologação, ajudaremos você a se desenvolver e garantir uma parceria conosco.',
                'Ao acessar a área de homologação, você terá acesso à lista de documentos que deverão ser apresentados.',
                'Caso você venha até nossa fábrica, lembramos que temos algumas regras para acesso às áreas de manipulação: venha de uniforme com identificação da sua empresa, de manga longas, calças compridas e calçado fechado. Será necessário retirar todos os adornos e evite perfumes fortes e maquiagem excessiva!'
            ]
        },
        q2: {
            num: 'II',
            title: 'Rastreabilidade Total',
            subtitle: 'Controle de lotes da entrada da MP até expedição do produto final',
            paragraphs: [
                'Todos os produtos e serviços fornecidos devem ter documentação adequada, conforme requerido, para que possamos manter a rastreabilidade dos nossos produtos e garantir que qualquer problema possa ter sua origem detectada e, posteriormente, tratada.',
                'Fornecedores de matéria prima e embalagens devem fornecer produtos com etiquetas que contemplem todas as informações relevantes e também laudos, com as mesmas informações de lote e validade, além das demais informações que ajudem a rastrear o produto, assim como as informações de qualificação, que demonstrem a conformidade com as nossas especificações técnicas.',
                'Fornecedores de equipamentos e serviços devem fornecer laudos de superfície de contato e/ou relatórios descritivos para compormos nossas avaliações de análises de risco.'
            ]
        },
        q3: {
            num: 'III',
            title: 'Melhoria Contínua',
            subtitle: 'Avaliações e auditorias com plano de ação estruturados',
            paragraphs: [
                'Nossos parceiros, depois de homologados, são avaliados constantemente através das entregas e desempenho dos materiais ou serviços em nossa fábrica!',
                'Se houver qualquer divergência, desvio ou possibilidade de melhoria iremos abordar estes pontos através de documentação pertinente, para que ações sejam endereçadas, avaliadas e executadas, buscando melhorias para ambas as partes.',
                'Em casos específicos, podemos solicitar uma visita técnica ou auditoria em sua empresa, para juntos buscarmos um resultado favorável para nossa parceria.'
            ]
        }
    };

    window.openQualModal = (key) => {
        const data = qualData[key];
        if (!data) return;

        document.getElementById('qual-modal-num').textContent      = data.num;
        document.getElementById('qual-modal-title').textContent    = data.title;
        document.getElementById('qual-modal-subtitle').textContent = data.subtitle;
        document.getElementById('qual-modal-body').innerHTML =
            data.paragraphs.map(p => `<p>${p}</p>`).join('');

        document.getElementById('qual-modal-overlay').classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.closeQualModal = () => {
        document.getElementById('qual-modal-overlay').classList.remove('open');
        document.body.style.overflow = '';
    };

    // Fecha com tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeQualModal();
    });

    // ===== 8. FORMULÁRIO DE CONTATO DO FOOTER =====
    const footerForm = document.getElementById('footer-contact-form');
    if (footerForm) {
        footerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn     = document.getElementById('footer-submit-btn');
            const btnText = document.getElementById('footer-btn-text');
            const status  = document.getElementById('footer-form-status');

            // Estado de carregamento
            btn.disabled = true;
            btnText.textContent = 'Enviando...';
            status.className = 'footer-form-status';
            status.textContent = '';

            try {
                const formData = new FormData(footerForm);

                // Força o destinatário mesmo que o access_key não esteja configurado
                formData.set('email', 'guilherme.coltro@orquidea.com.br');

                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    status.className = 'footer-form-status success';
                    status.textContent = '✓ Mensagem enviada! Entraremos em contato em breve.';
                    footerForm.reset();
                } else {
                    throw new Error(result.message || 'Erro ao enviar.');
                }
            } catch (err) {
                status.className = 'footer-form-status error';
                status.textContent = '✕ Não foi possível enviar. Tente novamente ou use o e-mail de contato.';
            } finally {
                btn.disabled = false;
                btnText.textContent = 'Enviar mensagem';
            }
        });
    }
});
