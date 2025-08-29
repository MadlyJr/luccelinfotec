// Ativa o modo noturno se for entre 18h e 6h da manhã
const hour = new Date().getHours();
if(hour >= 18 || hour < 6){
  document.body.classList.add('dark');
}

// Lógica para expandir/recolher a descrição dos cards de serviço
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    // Remove a classe 'active' de todos os outros cards, se houver
    document.querySelectorAll('.card').forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('active')) {
        otherCard.classList.remove('active');
        const otherDescription = otherCard.querySelector('.card-description');
        if (otherDescription) {
          // Garante que a descrição desapareça suavemente
          otherDescription.style.opacity = '0';
          setTimeout(() => { otherDescription.style.display = 'none'; }, 500); // Esconde depois da transição
        }
      }
    });

    // Alterna a classe 'active' no card clicado
    card.classList.toggle('active');

    const description = card.querySelector('.card-description');
    if (description) {
      if (card.classList.contains('active')) {
        description.style.display = 'block'; // Mostra primeiro, depois faz o fade-in
        setTimeout(() => { description.style.opacity = '1'; }, 10); // Pequeno delay para a transição
      } else {
        description.style.opacity = '0'; // Começa o fade-out
        setTimeout(() => { description.style.display = 'none'; }, 500); // Esconde depois da transição
      }
    }
  });
});