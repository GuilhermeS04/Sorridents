// Sorridents Aparecida de Goiânia | Controller Principal (JavaScript Vanilla)

// Garantir que a página sempre abra no início (topo) ao carregar
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo({ top: 0, behavior: 'instant' });
if (window.location.hash) {
  history.replaceState("", document.title, window.location.pathname + window.location.search);
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. INICIALIZAR ÍCONES LUCIDE
  initializeIcons();

  // 1b. AJUSTAR IMAGEM DE FUNDO DO HERO (SUPORTE DINÂMICO PARA FUNDO BACKGROUND SORRIDENTS)
  setupHeroBackground();

  // 2. HEADER TRANSIÇÃO DE DECORAÇÃO (STICKY)
  setupHeaderScroll();

  // 3. MENU DE NAVEGAÇÃO MOBILE
  setupMobileMenu();

  // 4. TRATAMENTO FADEOUT DOS LOCAL IMAGES (FALLBACKS RESILIENTES)
  setupImageFallbacks();

  // 5. SLIDER INTERATIVO "ANTES E DEPOIS" (SIMPLIFICADO DE ACORDO COM REMOÇÃO DE ABAS)
  setupInteractiveSlider();

  // 5b. INICIALIZAR CARROSSEL DA GALERIA (SWIPER)
  initializeGallerySwiper();

  // 6. SANFONA DE DÚVIDAS (FAQ)
  setupFAQAccordion();

  // 7. COPIAR ENDEREÇO EM UM CLIQUE
  setupAddressClipboard();

  // 8. FLUTUADOR WHATSAPP E TIMER
  setupWhatsAppWidget();

  // 9. MODAIS DE INFORMAÇÕES (TERMOS E PRIVACIDADE)
  setupInfoModals();

  // 10. ANIMAÇÕES FLUIDAS E INTERACTION REVEAL
  setupScrollAnimations();
});

// Inicializador seguro de Ícones Lucide
function initializeIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// 1b. Tentativa de obter e carregar a imagem correspondente de fundo com suporte a celular
function setupHeroBackground() {
  const heroSection = document.getElementById('inicio');
  if (!heroSection) return;

  let lastIsMobile = null;

  function loadBackground() {
    const isMobile = window.innerWidth < 640;
    if (isMobile === lastIsMobile) return;
    lastIsMobile = isMobile;

    let possibleUrls = [];
    if (isMobile) {
      possibleUrls = [
        './Fundo background sorridents celular.jpg',
        './Fundo background sorridents celular.png',
        './Fundo background sorridents celular.jpeg',
        './Fundo background sorridents celular.webp',
        './Fundo%20background%20sorridents%20celular.jpg',
        './Fundo%20background%20sorridents%20celular.png',
        './Fundo%20background%20sorridents%20celular.jpeg',
        './Fundo%20background%20sorridents%20celular.webp',
        './assets/Fundo background sorridents celular.jpg',
        './assets/Fundo background sorridents celular.png',
        './assets/Fundo background sorridents celular.jpeg',
        './assets/Fundo background sorridents celular.webp',
        './assets/Fundo%20background%20sorridents%20celular.jpg',
        './assets/Fundo%20background%20sorridents%20celular.png',
        './assets/Fundo%20background%20sorridents%20celular.jpeg',
        './assets/Fundo%20background%20sorridents%20celular.webp',
        '/Fundo background sorridents celular.jpg',
        '/Fundo background sorridents celular.png',
        '/Fundo background sorridents celular.jpeg',
        '/Fundo background sorridents celular.webp',
        '/Fundo%20background%20sorridents%20celular.jpg',
        '/Fundo%20background%20sorridents%20celular.png',
        '/Fundo%20background%20sorridents%20celular.jpeg',
        '/Fundo%20background%20sorridents%20celular.webp'
      ];
    } else {
      possibleUrls = [
        './Fundo Background Sorridents.jpg',
        './Fundo Background Sorridents.png',
        './Fundo Background Sorridents.jpeg',
        './Fundo Background Sorridents.webp',
        './Fundo%20Background%20Sorridents.jpg',
        './Fundo%20Background%20Sorridents.png',
        './Fundo%20Background%20Sorridents.jpeg',
        './Fundo%20Background%20Sorridents.webp',
        './assets/Fundo Background Sorridents.jpg',
        './assets/Fundo Background Sorridents.png',
        './assets/Fundo Background Sorridents.jpeg',
        './assets/Fundo Background Sorridents.webp',
        './assets/Fundo%20Background%20Sorridents.jpg',
        './assets/Fundo%20Background%20Sorridents.png',
        './assets/Fundo%20Background%20Sorridents.jpeg',
        './assets/Fundo%20Background%20Sorridents.webp',
        '/Fundo Background Sorridents.jpg',
        '/Fundo Background Sorridents.png',
        '/Fundo Background Sorridents.jpeg',
        '/Fundo Background Sorridents.webp',
        '/Fundo%20Background%20Sorridents.jpg',
        '/Fundo%20Background%20Sorridents.png',
        '/Fundo%20Background%20Sorridents.jpeg',
        '/Fundo%20Background%20Sorridents.webp',
        '/src/assets/images/dentist_hero_1780289103340.png'
      ];
    }

    let loaded = false;

    function tryNext(index) {
      if (index >= possibleUrls.length || loaded) return;
      const url = possibleUrls[index];
      const img = new Image();
      img.onload = () => {
        if (!loaded) {
          heroSection.style.backgroundImage = `url("${url}")`;
          loaded = true;
        }
      };
      img.onerror = () => {
        tryNext(index + 1);
      };
      img.src = url;
    }

    tryNext(0);
  }

  loadBackground();
  window.addEventListener('resize', loadBackground);
}

// 2. Setup do Header Sticky ao rolar a página
function setupHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('shadow-md', 'py-2.5');
      header.classList.remove('shadow-sm', 'py-3', 'sm:py-3.5');
    } else {
      header.classList.remove('shadow-md', 'py-2.5');
      header.classList.add('shadow-sm', 'py-3', 'sm:py-3.5');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// 3. Setup do Menu Hamburguer Mobile
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menuTray = document.getElementById('mobile-menu-tray');
  const hamburgerIcon = document.getElementById('menu-icon-hamburger');
  const closeIcon = document.getElementById('menu-icon-close');

  if (!toggleBtn || !menuTray) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = menuTray.classList.contains('hidden');
    if (isHidden) {
      menuTray.classList.remove('hidden');
      hamburgerIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
    } else {
      menuTray.classList.add('hidden');
      hamburgerIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    }
  });

  // Fechar o menu ao clicar em qualquer item
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuTray.classList.add('hidden');
      hamburgerIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    });
  });
}

// 4. Fallbacks de imagem se o usuário ainda não colocou as fotos originais na pasta
function setupImageFallbacks() {
  const images = document.querySelectorAll('.img-fallback');
  
  images.forEach(img => {
    const fallbackUrl = img.getAttribute('data-fallback');
    if (!fallbackUrl) return;

    // Se a imagem já falhou antes do script terminar de carregar
    if (img.complete && img.naturalWidth === 0) {
      img.src = fallbackUrl;
    }

    img.addEventListener('error', () => {
      img.src = fallbackUrl;
    });
  });
}

// 5. Slider de Antes e Depois interativo (Sem troca de abas)
function setupInteractiveSlider() {
  const sliderInput = document.getElementById('hero-slider-input');
  const afterLayer = document.getElementById('hero-slider-after-layer');
  const sliderHandle = document.getElementById('hero-slider-handle');

  if (!sliderInput || !afterLayer || !sliderHandle) return;

  // Atualizar corte horizontal com base no range input
  sliderInput.addEventListener('input', (event) => {
    const val = event.target.value;
    afterLayer.style.clipPath = `polygon(${val}% 0, 100% 0, 100% 100%, ${val}% 100%)`;
    sliderHandle.style.left = `${val}%`;
  });
}

// 5b. Inicializador do carrossel da Galeria (Swiper.js)
function initializeGallerySwiper() {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper.js is not loaded yet');
    return;
  }
  const swiperElement = document.querySelector('.gallery-swiper');
  if (!swiperElement) return;

  new Swiper('.gallery-swiper', {
    slidesPerView: 1.25,
    spaceBetween: 16,
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // quando tela >= 640px (tablet)
      640: {
        slidesPerView: 2.2,
        spaceBetween: 20
      },
      // quando tela >= 1024px (desktop)
      1024: {
        slidesPerView: 3,
        spaceBetween: 24
      }
    }
  });
}

// 6. FAQ Accordion com micro-transição
function setupFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const content = item.querySelector('.faq-content');
    const iconSpan = item.querySelector('.faq-icon');

    // Inicialização segura: removemos 'hidden' clássico e controlamos via max-height
    if (content) {
      content.classList.remove('hidden');
      content.style.maxHeight = '0px';
    }

    btn?.addEventListener('click', () => {
      const isCurrentlyActive = content?.classList.contains('active');

      // Recolher todos os outros FAQ items antes
      faqItems.forEach(innerItem => {
        const innerContent = innerItem.querySelector('.faq-content');
        const innerIconSpan = innerItem.querySelector('.faq-icon');
        if (innerContent) {
          innerContent.classList.remove('active');
          innerContent.style.maxHeight = '0px';
        }
        innerItem.classList.remove('border-[#1b2074]/30');
        if (innerIconSpan) {
          innerIconSpan.innerHTML = `<i data-lucide="plus" class="w-4 h-4"></i>`;
        }
      });

      // Se não estava ativo, ativa este com transição suave
      if (!isCurrentlyActive && content) {
        content.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight + 40}px`;
        item.classList.add('border-[#1b2074]/30');
        if (iconSpan) {
          iconSpan.innerHTML = `<i data-lucide="minus" class="w-4 h-4"></i>`;
        }
      }

      // Re-renderizar ícones inseridos dinamicamente
      initializeIcons();
    });
  });
}

// 7. Copiar endereço por cliques
function setupAddressClipboard() {
  const btn = document.getElementById('copy-address-btn');
  const btnText = document.getElementById('copy-btn-text');
  const addressText = document.getElementById('clinic-address-text');

  if (!btn || !addressText) return;

  btn.addEventListener('click', () => {
    const rawToCopy = addressText.textContent?.trim() || '';
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(rawToCopy)
      .then(() => {
        if (btnText) {
          btnText.textContent = 'Copiado!';
          btn.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-200');
          btn.classList.remove('text-gray-700');

          setTimeout(() => {
            btnText.textContent = 'Copiar Endereço';
            btn.classList.remove('bg-emerald-50', 'text-emerald-700', 'border-emerald-200');
            btn.classList.add('text-gray-700');
          }, 2000);
        }
      })
      .catch((err) => {
        console.error('Falha de escrita no clipboard', err);
      });
  });
}

// 8. Widget de WhatsApp flutuante
function setupWhatsAppWidget() {
  const widget = document.getElementById('float-whatsapp-widget');
  const tooltip = document.getElementById('float-whatsapp-tooltip');
  const closeTooltip = document.getElementById('close-whatsapp-tooltip');

  if (!widget) return;

  // Revela o widget whatsapp flutuante apenas após rolar mais de 250px
  const handleScroll = () => {
    if (window.scrollY > 250) {
      widget.classList.remove('hidden');
    } else {
      widget.classList.add('hidden');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Fechar aviso do WhatsApp flutuante
  closeTooltip?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    tooltip?.classList.add('hidden');
  });
}

// 9. Modais de Termos e Privacidade com alta responsividade
function setupInfoModals() {
  const termsModal = document.getElementById('terms-modal');
  const privacyModal = document.getElementById('privacy-modal');

  const openTermsBtn = document.getElementById('open-terms-modal-btn');
  const openPrivacyBtn = document.getElementById('open-privacy-modal-btn');

  const closeTermsBtn = document.getElementById('close-terms-btn');
  const closeTermsFooterBtn = document.getElementById('close-terms-btn-footer');
  const closePrivacyBtn = document.getElementById('close-privacy-btn');
  const closePrivacyFooterBtn = document.getElementById('close-privacy-btn-footer');

  if (!termsModal || !privacyModal) return;

  // Função genérica para re-inicializar ícones dentro de modais
  initializeIcons();

  // Open Handlers
  openTermsBtn?.addEventListener('click', () => {
    termsModal.classList.remove('hidden');
    termsModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  });

  openPrivacyBtn?.addEventListener('click', () => {
    privacyModal.classList.remove('hidden');
    privacyModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  });

  // Close Handlers
  const closeTerms = () => {
    termsModal.classList.add('hidden');
    termsModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  const closePrivacy = () => {
    privacyModal.classList.add('hidden');
    privacyModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  closeTermsBtn?.addEventListener('click', closeTerms);
  closeTermsFooterBtn?.addEventListener('click', closeTerms);
  closePrivacyBtn?.addEventListener('click', closePrivacy);
  closePrivacyFooterBtn?.addEventListener('click', closePrivacy);

  // Close clicking outside modal dialog
  termsModal.addEventListener('click', (e) => {
    if (e.target === termsModal) closeTerms();
  });

  privacyModal.addEventListener('click', (e) => {
    if (e.target === privacyModal) closePrivacy();
  });
}

// 10. Sistema Inteligente de Scroll Reveal, Staggering e Hover Premium
function setupScrollAnimations() {
  // Coletar todas as seções principais da página para adicionar reveal scroll, excluindo a Hero que já entra instantaneamente
  const sections = document.querySelectorAll('main > section:not(#inicio)');
  sections.forEach(sec => {
    sec.classList.add('on-scroll-reveal');
  });

  // Coletar itens com alta interatividade para aplicar classe de hover premium dinamicamente
  const cardsToElevate = [
    '#diferenciais .grid > div',
    '#servicos .grid > div',
    '.gallery-swiper .swiper-slide > div',
    '.faq-item'
  ];

  cardsToElevate.forEach(selector => {
    const items = document.querySelectorAll(selector);
    items.forEach((item, idx) => {
      // Adicionar a classe hover premium sem interferir no design existente
      item.classList.add('hover-scale-premium');
      
      // Adicionar classe de scroll reveal e efeito de staggering dinâmico (atraso sequencial de renderização)
      item.classList.add('on-scroll-reveal');
      const delay = (idx % 3) * 100; // sequencial de 0 a 200ms
      item.style.transitionDelay = `${delay}ms`;
    });
  });

  // Configuração do IntersectionObserver para revelar elementos conforme se rola a página
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px', // Aciona um pouco antes de aparecer para ser super fluido
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          self.unobserve(entry.target); // Animou uma vez, não refaz
        }
      });
    }, observerOptions);

    const revealables = document.querySelectorAll('.on-scroll-reveal');
    revealables.forEach(el => observer.observe(el));
  } else {
    // Fallback absoluto: apenas mostra tudo imediatamente
    const revealables = document.querySelectorAll('.on-scroll-reveal');
    revealables.forEach(el => el.classList.add('visible'));
  }
}
