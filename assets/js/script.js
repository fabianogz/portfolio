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
  const codeLineElement = document.querySelector('.code-line'); 

  const isMobile = window.innerWidth <= 768;

  if (!isMobile) {
    heroElement.addEventListener('click', function() {
      if (particlesMoving) {
        pJS.particles.move.speed = 0;
        codeLineElement.classList.add('blink-paused');
      } else {
        pJS.particles.move.speed = defaultSpeed;
        codeLineElement.classList.remove('blink-paused');
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
  if (!el1 || !el2) return false;

  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  if (rect1.width === 0 || rect1.height === 0 || rect2.width === 0 || rect2.height === 0) {
    return false;
  }

  const threshold = 1;

  return !(
    rect1.right <= rect2.left + threshold ||
    rect1.left >= rect2.right - threshold ||
    rect1.bottom <= rect2.top + threshold ||
    rect1.top >= rect2.bottom - threshold
  );
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

(function() {
  emailjs.init('ilu6laOwYyJuNyGBC');
})();

document.addEventListener('DOMContentLoaded', function() {
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
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

  function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  nomeInput.addEventListener('input', validarNome);
  emailInput.addEventListener('input', validarEmail);
  mensagemTextarea.addEventListener('input', function() {
    autoResizeTextarea(mensagemTextarea);
  });

  let oldValue = '';
  let oldCursor = 0;



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

    if (nomeInput.classList.contains('invalid') ||
        emailInput.classList.contains('invalid')) {
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


document.addEventListener("DOMContentLoaded", () => {
  const setas = document.querySelector('.setas-mobile');
  const hero = document.querySelector('.hero'); 
  let jaSaiuDaHero = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (jaSaiuDaHero) return;

      if (entry.isIntersecting) {
        setas.style.display = 'flex';
      } else {
        setas.style.display = 'none';
        jaSaiuDaHero = true;
        observer.disconnect(); 
      }
    },
    { threshold: 0.2 }
  );

  if (hero) {
    observer.observe(hero);
  }
});


  //

  document.querySelectorAll('.portfolio-item').forEach(item => {
  const dataTexto = item.querySelector('.portfolio-data')?.textContent.trim();
  if (dataTexto) {
    const [dia, mes, ano] = dataTexto.split('/');
    const dataNum = `${ano}${mes}${dia}`;
    item.setAttribute('data-data', dataNum);
  }
});

let iso;
let destaquesOriginais = [];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.portfolio-grid');

  destaquesOriginais = Array.from(document.querySelectorAll('.portfolio-item.destaque'));

  imagesLoaded(grid, () => {
    iso = new Isotope(grid, {
      itemSelector: '.portfolio-item',
      layoutMode: 'masonry',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer',
        gutter: 10
      },
      transitionDuration: '0.4s',
      getSortData: {
        data: '[data-data] parseInt'
      }
    });
  });
});

function filtrarPortfolio(filtro) {
  let filterValue = '*';
  let sortByValue = '';
  let sortAscending = true;

  const items = document.querySelectorAll('.portfolio-item');

  if (filtro === 'devweb') {
    filterValue = '.devweb';

    items.forEach(item => item.classList.remove('destaque'));
    destaquesOriginais.forEach(el => el.classList.add('destaque'));

  } else if (filtro === 'data') {
    sortByValue = 'data';
    sortAscending = false;

    items.forEach(item => item.classList.remove('destaque'));

  } else {
    items.forEach(item => item.classList.remove('destaque'));
    destaquesOriginais.forEach(el => el.classList.add('destaque'));
  }

  if (iso) {
    iso.arrange({
      filter: filterValue,
      sortBy: sortByValue,
      sortAscending: sortAscending
    });

    setTimeout(() => {
      iso.layout();
    }, 100);
  }

  const opcoes = document.querySelectorAll('.filtro-opcao');
  opcoes.forEach(op => op.classList.remove('ativo'));
  document.querySelector(`.filtro-opcao[onclick*="${filtro}"]`)?.classList.add('ativo');
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

const imgs = document.querySelectorAll('.portfolio-item img');

imgs.forEach(img => {
  const baseSrc = img.getAttribute('src');
  const src2x = baseSrc.replace('.webp', '@2x.webp');

  if (window.devicePixelRatio > 1) {
    img.setAttribute('src', src2x);
  }
});


// HEADER
function toggleMenu() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.menu-toggle');

  nav.classList.toggle('show');
  toggle.classList.toggle('active');
}

/*
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".three-bg");
  if (!container) return;

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const fontSize = 10;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00"; 
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = String.fromCharCode(0x30A0 + Math.random() * 96);
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
    requestAnimationFrame(draw);
  }

  draw();
})
*/
 