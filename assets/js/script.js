    document.getElementById('logo').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


particlesJS.load('particles-js', 'assets/js/particles-config.json', function() {

  const pJS = window.pJSDom[0].pJS;
  const defaultSpeed = pJS.particles.move.speed;
  let particlesMoving = true;

  const heroElement = document.querySelector('.hero');
  const cornerText = document.querySelector('.corner-text');

  const isMobile = window.innerWidth <= 768;

  if (!isMobile) {
    heroElement.addEventListener('click', function() {
      if (particlesMoving) {
        pJS.particles.move.speed = 0;
      } else {
        pJS.particles.move.speed = defaultSpeed;
      }
      particlesMoving = !particlesMoving;
    });
  } else {
    pJS.interactivity.events.onclick.enable = false;
    pJS.interactivity.events.onclick.mode = [];  
    pJS.interactivity.status = 'mouseleave';
    pJS.particles.move.speed = defaultSpeed;
  }

  heroElement.addEventListener('mouseenter', function() {
    pJS.interactivity.status = 'mousemove';
  });

  heroElement.addEventListener('mouseleave', function() {
    pJS.interactivity.mouse.pos_x = null;
    pJS.interactivity.mouse.pos_y = null;
    pJS.interactivity.status = 'mouseleave';
  });
});

//  PARTICULAS

function isOverlapping(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function checkOverlapAndSetOpacity() {
    const elementoA = document.querySelector('.hero-content');
    const elementoB = document.querySelector('.corner-text');

    if (isOverlapping(elementoA, elementoB)) {
        elementoB.style.opacity = '0.3';
    } else {
        elementoB.style.opacity = '1';
    }
}

window.addEventListener('resize', checkOverlapAndSetOpacity);

window.addEventListener('load', checkOverlapAndSetOpacity);


document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('textarea').forEach(function(textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  });
});
// OPACIDADE NO TEXTO

(function() {
  emailjs.init('ilu6laOwYyJuNyGBC');
})();

document.addEventListener('DOMContentLoaded', function() {
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const telefoneInput = document.getElementById('telefone');
  const mensagemTextarea = document.getElementById('mensagem');
  const form = document.getElementById('contato-form');

function piscarCampo(element) {
  element.classList.add('invalid');
  setTimeout(() => {
    element.classList.remove('invalid');
  }, 3000);
  }

  function validarNome() {
    const nome = nomeInput.value.trim();
    if (nome.length >= 3 || nome.length === 0) {
      nomeInput.classList.remove('invalid');
    } else {
      nomeInput.classList.add('invalid');
    }
  }

  function validarEmail() {
    const email = emailInput.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexEmail.test(email) || email.length === 0) {
      emailInput.classList.remove('invalid');
    } else {
      emailInput.classList.add('invalid');
    }
  }

  function validarTelefone() {
    const telefone = telefoneInput.value.trim();
    const regexFormatado = /^\(\d{2}\)\s(\d\s)?\d{4}-\d{4}$/;
    const regexLimpo = /^\d{10,11}$/;

    if (telefone.length === 0) {
      telefoneInput.classList.remove('invalid');
      return;
    }

    if (regexFormatado.test(telefone) || regexLimpo.test(telefone)) {
      telefoneInput.classList.remove('invalid');
    } else {
      telefoneInput.classList.add('invalid');
    }
  }

  function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  nomeInput.addEventListener('input', validarNome);
  emailInput.addEventListener('input', validarEmail);
  telefoneInput.addEventListener('input', validarTelefone);
  mensagemTextarea.addEventListener('input', function() {
    autoResizeTextarea(mensagemTextarea);
  });

  let oldValue = '';
  let oldCursor = 0;

  telefoneInput.addEventListener('input', function(e) {
    let value = telefoneInput.value;
    let cursor = telefoneInput.selectionStart;

    let cleaned = value.replace(/\D/g, '').slice(0, 11);
    let formatted = '';

    if (cleaned.length > 0) {
      formatted += '(' + cleaned.slice(0, 2) + ') ';
    }
    if (cleaned.length > 2) {
      if (cleaned.length > 6) {
        formatted += cleaned.slice(2, 3) + ' ' + cleaned.slice(3, 7) + '-' + cleaned.slice(7);
      } else {
        formatted += cleaned.slice(2);
      }
    }

    if (formatted !== value) {
      telefoneInput.value = formatted;
      let newCursor = cursor;

      if (cursor > oldCursor && formatted.length > oldValue.length) {
        newCursor = cursor + (formatted.length - oldValue.length);
      }
      newCursor = Math.min(newCursor, formatted.length);
      telefoneInput.setSelectionRange(newCursor, newCursor);
    }

    oldValue = telefoneInput.value;
    oldCursor = telefoneInput.selectionStart;
    validarTelefone();
  });

  function showNotification(message, isError = false) {
    let notification = document.querySelector('.notification');

    if (!notification) {
      notification = document.createElement('div');
      notification.classList.add('notification', isError ? 'error' : 'success');

      notification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
            stroke-linecap="round" stroke-linejoin="round" 
            class="lucide lucide-mail-check-icon lucide-mail-check">
          <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          <path d="m16 19 2 2 4-4"/>
        </svg>
        <span></span>
      `;
      document.body.appendChild(notification);
    }

    notification.querySelector('span').textContent = message;

    notification.style.display = 'flex';
    notification.style.animation = 'slideInUp 0.5s ease forwards';

    setTimeout(() => {
      notification.style.animation = 'slideOutDown 0.5s ease forwards';
      notification.addEventListener('animationend', () => {
        notification.style.display = 'none';
      }, { once: true });
    }, 5000);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    validarNome();
    validarEmail();
    validarTelefone();

    if (nomeInput.classList.contains('invalid') ||
        emailInput.classList.contains('invalid') ||
        telefoneInput.classList.contains('invalid')) {
      return;
    }

    showNotification('Sua mensagem foi enviada!');

    emailjs.sendForm('service_ar6rvdq', 'FG1545237187123571237153', form)
      .then(() => {
        return emailjs.sendForm('service_ar6rvdq', 'FG6215331124563472135612', form);
      })
      .then(() => {
        form.reset();
        autoResizeTextarea(mensagemTextarea);
      })
      .catch(error => {
        showNotification('Erro ao enviar: ' + error.text, true);
      });
  });


});

let copiandoTelefone = false;

function copiarTelefone(element) {
  if (copiandoTelefone) return;

  copiandoTelefone = true;

  const telefone = "(61) 99453-7365";
  const telefoneSpan = element.querySelector('span');
  const textoOriginal = telefoneSpan.textContent;

  telefoneSpan.classList.remove('telefone-fade-in');
  telefoneSpan.textContent = "* COPIADO *";
  telefoneSpan.classList.add('piscar');

  setTimeout(() => {
    telefoneSpan.classList.remove('piscar');
    telefoneSpan.textContent = textoOriginal;
    telefoneSpan.style.opacity = 0;

    setTimeout(() => {
      telefoneSpan.style.opacity = 1;
      copiandoTelefone = false;
    }, 50);  
  }, 2000);
}


  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const triggerPoint = hero.offsetHeight * 0.5;

    if (window.scrollY > triggerPoint) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  function toggleDescricao(header) {
    const card = header.parentElement;
    card.classList.toggle('active');
  }
  // CONTATOS

  function filtrarPortfolio(filtro) {
  const items = document.querySelectorAll('.portfolio-item');
  const opcoes = document.querySelectorAll('.filtro-opcao');

  opcoes.forEach(op => op.classList.remove('ativo'));

  if (filtro === 'todos') {
    items.forEach(item => item.style.display = 'block');
  }

  if (filtro === 'data') {
    items.forEach(item => {
      const data = item.getAttribute('data-data');
      if (parseInt(data) >= 2024) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (filtro === 'devweb') {
    items.forEach(item => {
      if (item.classList.contains('devweb')) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  document.querySelector(`.filtro-opcao[onclick*="${filtro}"]`).classList.add('ativo');
}
// FILTRO

// Sequência correta
const secretSequence = ['servicos', 'servicos', 'sobre', 'portfolio', 'servicos'];
let userSequence = [];

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').replace('#', '');

    userSequence.push(targetId);

    if (userSequence.length > secretSequence.length) {
      userSequence.shift();
    }

    if (userSequence.join(',') === secretSequence.join(',')) {
      iniciarDoom();
    }
  });
});

function iniciarDoom() {
  const hero = document.querySelector('.hero');
  hero.innerHTML = ''; 

  const iframe = document.createElement('iframe');
  iframe.src = 'https://js-dos.com/games/doom.exe.html'; 
  iframe.style.width = '100%';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';

  hero.appendChild(iframe);
}

// HEADER
function toggleMenu() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.menu-toggle');

  nav.classList.toggle('show');
  toggle.classList.toggle('active');
}
