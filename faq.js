document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.faq-question');
  
    questions.forEach(btn => {
      btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = btn.classList.contains('open');
  
        document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
        document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('open'));
  
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          btn.classList.add('open');
        }
      });
    });
  });
  