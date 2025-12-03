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
    // Remove a classe 'active' de todos os outros cards
    document.querySelectorAll('.card').forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('active')) {
        otherCard.classList.remove('active');
        otherCard.setAttribute('aria-expanded', 'false');
      }
    });

    // Alterna o estado aria-expanded
    const isActive = card.classList.toggle('active');
    card.setAttribute('aria-expanded', isActive ? 'true' : 'false');
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

// Merchan modal: abrir/fechar fullscreen ao clicar
(function(){
  const trigger = document.querySelector('.merchan-trigger');
  const modal = document.getElementById('merchan-modal');
  const modalImg = modal ? modal.querySelector('.merchan-modal__img') : null;
  const closeBtn = modal ? modal.querySelector('.merchan-modal__close') : null;
  if (!trigger || !modal || !modalImg) return;

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

  trigger.addEventListener('click', (e) => {
    const src = trigger.dataset.src || trigger.querySelector('img')?.src;
    const alt = trigger.querySelector('img')?.alt || 'Merchan';
    e.preventDefault();
    open(src, alt);
  });

  // fechar ao clicar na imagem ou no fundo
  modal.addEventListener('click', (e) => {
    // fecha quando clicar fora ou clicar na própria imagem
    close();
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
    if (e.key === 'Escape') close();
  });
})();
