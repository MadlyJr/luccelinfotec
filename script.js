const hour = new Date().getHours();
if(hour >= 18 || hour < 6){document.body.classList.add('dark');}

document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('click',()=>{
    card.classList.toggle('active');
  });
});