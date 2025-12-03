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
