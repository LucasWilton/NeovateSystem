let rating = 0;
const stars = document.querySelectorAll('.star');
const labels = ['','Ruim','Regular','Bom','Ótimo','Excelente'];

// Initialize star rating functionality
stars.forEach(s => {
  s.addEventListener('click', () => {
    rating = +s.dataset.v;
    stars.forEach(st => st.classList.toggle('active', +st.dataset.v <= rating));
    document.getElementById('star-label').textContent = labels[rating];
  });
  s.addEventListener('mouseenter', () => {
    stars.forEach(st => st.style.opacity = +st.dataset.v <= +s.dataset.v ? '1' : '0.4');
  });
  s.addEventListener('mouseleave', () => {
    stars.forEach(st => st.style.opacity = '1');
  });
});

// Submit feedback form
function submitFeedback() {
  const nome = document.getElementById('fb-nome').value.trim();
  const msg = document.getElementById('fb-msg').value.trim();
  if (!nome || !msg || !rating) {
    alert('Preencha seu nome, avaliação e comentário antes de enviar.');
    return;
  }
  document.querySelector('.submit-btn').style.display = 'none';
  document.getElementById('success-msg').style.display = 'block';
  document.getElementById('fb-nome').value = '';
  document.getElementById('fb-msg').value = '';
  document.getElementById('fb-cat').value = '';
  stars.forEach(st => st.classList.remove('active'));
  document.getElementById('star-label').textContent = 'Clique para avaliar';
  rating = 0;
}

// File upload functionality
function triggerUpload(inputId, wrapId) {
  document.getElementById(inputId).click();
}

['photo-jl','photo-bs','photo-lo','photo-dl'].forEach(id => {
  document.getElementById(id).addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    const wrapId = 'wrap-' + id.replace('photo-','');
    reader.onload = function(ev) {
      const wrap = document.getElementById(wrapId);
      wrap.innerHTML = '<img src="' + ev.target.result + '" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:2px solid var(--border-md);">';
    };
    reader.readAsDataURL(file);
  });
});

// Active navigation link highlighting
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});
