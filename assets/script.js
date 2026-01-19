// Ativa o modo noturno se for entre 18h e 6h da manhã
const hour = new Date().getHours();
if(hour >= 18 || hour < 6){
  document.body.classList.add('dark');
}

// Lógica para expandir/recolher a descrição dos cards de serviço
document.querySelectorAll('.card').forEach(card => {
  // tornar os cards focáveis via teclado
  if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');

  card.addEventListener('click', () => {
    // Verifica se este card já está ativo
    const isCurrentlyActive = card.classList.contains('active');
    
    // Remove a classe 'active' de TODOS os cards
    document.querySelectorAll('.card').forEach(otherCard => {
      otherCard.classList.remove('active');
      otherCard.setAttribute('aria-expanded', 'false');
    });

    // Se o card NÃO estava ativo, ativa ele
    // Se estava ativo, fica desativado (comportamento toggle)
    if (!isCurrentlyActive) {
      card.classList.add('active');
      card.setAttribute('aria-expanded', 'true');
    }
  });

  // Suporte a teclado: Enter e Espaço ativam o card
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// Header: adicionar/remover classe .scrolled ao rolar para melhorar contraste
(() => {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    const threshold = 60; // px para começar a aplicar o fundo
    if (window.scrollY > threshold) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };

  // Executa ao carregar e ao rolar
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Header shrink: apenas encolher logo e título, sem trocar arquivo
(function(){
  const header = document.querySelector('.header');
  if (!header) return;

  const shrinkThreshold = 120; // px para aplicar shrink

  const applyShrink = () => {
    if (window.scrollY > shrinkThreshold) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  };

  window.addEventListener('scroll', applyShrink, { passive: true });
  // executar no load
  applyShrink();
})();

/* Promo slider (vanilla) - acessível, usa scroll-snap + IntersectionObserver */
(function(){
  const slider = document.querySelector('.promo-slider');
  if(!slider) return;

  const container = slider.querySelector('.slides');
  const slides = Array.from(container.querySelectorAll('.slide'));
  const prev = slider.querySelector('.promo-prev');
  const next = slider.querySelector('.promo-next');
  const dotsWrap = slider.querySelector('.promo-dots');
  let current = 0;
  let autoplay = null;

  const createDots = () => {
    slides.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'promo-dot';
      btn.setAttribute('role','tab');
      btn.setAttribute('aria-controls', 'slide-' + i);
      btn.dataset.index = i;
      btn.style.animation = `fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards`;
      btn.style.animationDelay = `${0.3 + i * 0.1}s`;
      btn.style.opacity = '0';
      btn.addEventListener('click', () => scrollTo(i));
      dotsWrap.appendChild(btn);
    });
    updateDots();
  };

  const updateDots = () => {
    dotsWrap.querySelectorAll('.promo-dot').forEach((b, i) => {
      b.classList.toggle('active', i === current);
      b.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  };

  const scrollTo = (index) => {
    const slide = slides[index];
    if(!slide) return;
    container.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const idx = slides.indexOf(entry.target);
        if(idx > -1){
          current = idx;
          updateDots();
          slides.forEach((s,i) => s.setAttribute('aria-hidden', i === current ? 'false' : 'true'));
        }
      }
    });
  }, { root: container, threshold: 0.6 });

  slides.forEach((s, i) => {
    s.setAttribute('id', 'slide-' + i);
    s.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
    io.observe(s);
  });

  createDots();

  // Abrir merchan em modal ao clicar na imagem do slide
  const modalEl = document.getElementById('merchan-modal');
  const modalImgEl = modalEl ? modalEl.querySelector('.merchan-modal__img') : null;
  const openSlideInModal = (src, alt) => {
    if(!modalEl || !modalImgEl) return;
    modalImgEl.src = src;
    modalImgEl.alt = alt || 'Merchan';
    modalEl.classList.add('open');
    modalEl.classList.remove('closing');
    modalEl.setAttribute('aria-hidden', 'false');
  };

  slides.forEach(s => {
    const img = s.querySelector('img');
    if(!img) return;
    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Subtle click feedback: briefly add .clicked to slide (uses CSS transition)
      s.classList.add('clicked');
      window.setTimeout(() => s.classList.remove('clicked'), 220);

      // preferir usar data-large se disponível, senão src
      const src = img.dataset.large || img.src;
      const alt = img.alt || 'Merchan';
      openSlideInModal(src, alt);
    });
  });

  if(prev) prev.addEventListener('click', () => { 
    // Add click feedback to prev button
    prev.style.animation = 'none';
    setTimeout(() => prev.style.animation = '', 10);
    scrollTo(Math.max(0, current - 1)); 
  });
  if(next) next.addEventListener('click', () => { 
    // Add click feedback to next button
    next.style.animation = 'none';
    setTimeout(() => next.style.animation = '', 10);
    scrollTo(Math.min(slides.length - 1, current + 1)); 
  });

  container.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') next && next.click();
    if(e.key === 'ArrowLeft') prev && prev.click();
  });

  const startAuto = () => {
    if(autoplay) clearInterval(autoplay);
    autoplay = setInterval(() => {
      const nextIdx = (current + 1) % slides.length;
      scrollTo(nextIdx);
    }, 4500);
  };
  const stopAuto = () => { if(autoplay) clearInterval(autoplay); autoplay = null; };

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  slider.addEventListener('focusin', stopAuto);
  slider.addEventListener('focusout', startAuto);

  startAuto();
})();

// Merchan modal: abrir/fechar fullscreen ao clicar (trigger opcional)
(function(){
  const trigger = document.querySelector('.merchan-trigger');
  const triggerImg = trigger ? trigger.querySelector('img') : null;
  const modal = document.getElementById('merchan-modal');
  const modalImg = modal ? modal.querySelector('.merchan-modal__img') : null;
  const closeBtn = modal ? modal.querySelector('.merchan-modal__close') : null;
  if (!modal || !modalImg) return;

  const open = (src, alt) => {
    modalImg.src = src;
    modalImg.alt = alt || 'Merchan';
    // Show modal with animation
    modal.classList.add('open');
    modal.classList.remove('closing');
    modal.setAttribute('aria-hidden', 'false');
  };

  const close = () => {
    // play closing transition then remove
    modal.classList.add('closing');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    // clear src after transition to free memory
    const cleanup = () => {
      modalImg.src = '';
      modal.removeEventListener('transitionend', cleanup);
    };
    modal.addEventListener('transitionend', cleanup);
  };

  // Trigger (opcional): clique no botão ou na imagem abre o modal
  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const src = trigger && trigger.dataset ? trigger.dataset.src : (triggerImg ? triggerImg.src : null);
    const alt = triggerImg ? triggerImg.alt : 'Merchan';
    if (src) open(src, alt);
  };

  if (trigger) {
    trigger.addEventListener('click', handleOpen);
    if (triggerImg) triggerImg.addEventListener('click', handleOpen);
  }

  // fechar ao clicar na imagem modal ou no fundo
  modal.addEventListener('click', (e) => {
    // fecha quando clicar fora ou clicar na própria imagem, mas não no botão X
    if (e.target === modalImg || e.target === modal) {
      close();
    }
  });

  // fechar ao clicar no botão X
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      close();
    });
  }

  // fechar com ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
})();

// Hide header on scroll down, show on scroll up
(function(){
  const header = document.querySelector('.header');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  const threshold = 80; // start hiding after this many px
  const minDelta = 10; // minimal delta to consider

  const onScrollDirection = () => {
    const y = window.scrollY;

    // Always show header at very top
    if (y <= 0) {
      header.classList.remove('hide');
      lastY = y;
      return;
    }

    // scrolling down
    if (y - lastY > minDelta && y > threshold) {
      header.classList.add('hide');
    }
    // scrolling up
    else if (lastY - y > minDelta) {
      header.classList.remove('hide');
    }

    lastY = y;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => { onScrollDirection(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
})();
