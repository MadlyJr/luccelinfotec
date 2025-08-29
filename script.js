// Ativa o modo noturno se for entre 18h e 6h da manhã
const hour = new Date().getHours();
if(hour >= 18 || hour < 6){
  document.body.classList.add('dark');
}

// Lógica para expandir/recolher a descrição dos cards de serviço
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    // Remove a classe 'active' de todos os outros cards
    document.querySelectorAll('.card').forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('active')) {
        otherCard.classList.remove('active');
      }
    });

    // Alterna a classe 'active' no card clicado
    card.classList.toggle('active');
  });
});
