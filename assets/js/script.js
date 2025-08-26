    document.getElementById('logo').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

const observerOptions = {
    threshold: 0.05, 
    rootMargin: '50px 0px 0px 0px' 
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.setProperty('--parallax-offset', `${yPos}px`);
    });
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

function initMouseParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const cornerText = document.querySelector('.corner-text');
    
    if (hero && heroContent && cornerText) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = hero;
            
            const xPercent = (clientX / offsetWidth - 0.5) * 2;
            const yPercent = (clientY / offsetHeight - 0.5) * 2;
            
            heroContent.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
            cornerText.style.transform = `translate(${xPercent * -5}px, ${yPercent * -5}px)`;
        });
        
        hero.addEventListener('mouseleave', () => {
            heroContent.style.transform = 'translate(0, 0)';
            cornerText.style.transform = 'translate(0, 0)';
        });
    }
}

function initPortfolioAnimations() {
    return;
}

function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const elements = section.querySelectorAll('h2, h3, p, .portfolio-item, .sobre-card, .experiencia-card, .card');
        
        elements.forEach((element, index) => {
            if (element.classList.contains('portfolio-item')) {
                return; 
            }
            
            element.style.transitionDelay = `${index * 0.1}s`;
            
            const rect = element.getBoundingClientRect();
            const centerX = window.innerWidth / 2;
            
            if (rect.left < centerX) {
                element.classList.add('fade-in-left');
            } else {
                element.classList.add('fade-in-right');
            }
            
            if (element.tagName === 'H2' || element.tagName === 'H3') {
                element.classList.add('fade-in-up');
            }
            
            if (element.classList.contains('card') || element.classList.contains('sobre-card')) {
                element.classList.add('scale-up');
            }
            
            animateOnScroll.observe(element);
        });
    });
}

function initScrollAnimations() {
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const opacity = Math.min(scrolled / 100, 1);
            header.style.backgroundColor = `#1f1f1f`;
            header.style.opacity = opacity > 0.1 ? '1' : '0.95';
        }, { passive: true });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMouseParallax();
    initPortfolioAnimations();
    initSectionAnimations();
    initScrollAnimations();
    
    const heroContent = document.querySelector('.hero-content');
    const cornerText = document.querySelector('.corner-text');
    
    if (heroContent) heroContent.classList.add('parallax-element');
    if (cornerText) cornerText.classList.add('parallax-element');
});

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function initLoadingScreen() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loading-overlay');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        }
    });
}

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    const updateScrollProgress = throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 10);
    
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
}

function initTextReveal() {
    const textElements = document.querySelectorAll('h1, h2, h3');
    
    textElements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map((word, index) => 
            `<span style="animation-delay: ${index * 0.1}s">${word}</span>`
        ).join(' ');
        
        element.classList.add('text-reveal');
    });
}


function initEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: [0.05, 0.3, 0.8], 
        rootMargin: '50px 0px 0px 0px' 
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio > 0.05) { 
                    entry.target.classList.add('animate');
                    
                    if (entry.target.classList.contains('sobre-card') || 
                        entry.target.classList.contains('card')) {
                        entry.target.classList.add('floating');
                    }
                }
            }
        });
    }, observerOptions);
    
    const animatableElements = document.querySelectorAll(
        '.fade-in-up:not(.portfolio-item), .fade-in-left:not(.portfolio-item), .fade-in-right:not(.portfolio-item), .scale-up:not(.portfolio-item), .hover-lift:not(.portfolio-item)'
    );
    
    animatableElements.forEach(el => observer.observe(el));
}


function initAdvancedPortfolioEffects() {
    return;
}


function initGlitchEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.setAttribute('data-text', heroTitle.textContent);
        
        setInterval(() => {
            if (Math.random() > 0.95) {
                heroTitle.classList.add('glitch');
                setTimeout(() => {
                    heroTitle.classList.remove('glitch');
                }, 1000);
            }
        }, 3000);
    }
}


function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(0, 255, 136, ${0.8 - i * 0.08});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 20);
        });
    });
    
    document.addEventListener('mouseleave', () => {
        trail.forEach(dot => dot.style.opacity = '0');
    });
    
    document.addEventListener('mouseenter', () => {
        trail.forEach((dot, index) => {
            dot.style.opacity = 0.8 - index * 0.08;
        });
    });
}

function safeScrollTo(element) {
    const body = document.body;
    body.style.setProperty('--scroll-behavior', 'auto');
    
    if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
    }
    
    element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    window.scrollTimeout = setTimeout(() => {
        body.style.removeProperty('--scroll-behavior');
    }, 1000);
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    safeScrollTo(document.querySelector('#sobre'));
                    break;
                case '2':
                    safeScrollTo(document.querySelector('#portfolio'));
                    break;
                case '3':
                    safeScrollTo(document.querySelector('#planejamento'));
                    break;
                case '4':
                    safeScrollTo(document.querySelector('#contato'));
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            safeScrollTo(document.body);
        }
    });
}

function initSafeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                safeScrollTo(targetElement);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMouseParallax();
    initPortfolioAnimations();
    initSectionAnimations();
    initScrollAnimations();
    
    const heroContent = document.querySelector('.hero-content');
    const cornerText = document.querySelector('.corner-text');
    
    if (heroContent) heroContent.classList.add('parallax-element');
    if (cornerText) cornerText.classList.add('parallax-element');
    
    initLoadingScreen();
    initScrollProgress();
    initTextReveal();
    initEnhancedScrollAnimations();
    initAdvancedPortfolioEffects();
    initGlitchEffect();
    initKeyboardShortcuts();
    initSafeNavigation(); 
    
    if (!document.querySelector('.loading-overlay')) {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loadingOverlay);
        
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => loadingOverlay.remove(), 500);
        }, 1500);
    }
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

const secretSequence = ['sobre', 'sobre', 'planejamento', 'portfolio', 'sobre'];
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
  const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  hero.innerHTML = '';
  hero.style.position = 'relative';
  hero.style.overflow = 'hidden';

  if (isMobile) {
    const snakeContainer = document.createElement('div');
    snakeContainer.style.cssText = `
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #000;
      color: #00ff00;
      font-family: 'Courier New', monospace;
      padding: 20px;
      box-sizing: border-box;
    `;
    
  snakeContainer.innerHTML = `
    <h1 style="margin-bottom: 10px; color: #00ff00; font-size: 24px;">🐍 SNAKE GAME</h1>
    <div style="margin-bottom: 10px; text-align: center;">
      <p style="margin: 5px 0; font-size: 16px;">Score: <span id="score">0</span> | High: <span id="highScore">0</span></p>
    </div>
    <canvas id="snakeCanvas" width="320" height="320" style="border: 2px solid #00ff00; background: #111; margin-bottom: 20px;"></canvas>
    <div id="gameControls" style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr; gap: 10px; width: 200px; height: 200px;">
      <div></div>
      <button id="upBtn" style="background: #00ff00; border: none; border-radius: 10px; color: #000; font-size: 20px; font-weight: bold; cursor: pointer;">↑</button>
      <div></div>
      <button id="leftBtn" style="background: #00ff00; border: none; border-radius: 10px; color: #000; font-size: 20px; font-weight: bold; cursor: pointer;">←</button>
      <button id="pauseBtn" style="background: #ff6600; border: none; border-radius: 10px; color: #fff; font-size: 14px; font-weight: bold; cursor: pointer;">PAUSE</button>
      <button id="rightBtn" style="background: #00ff00; border: none; border-radius: 10px; color: #000; font-size: 20px; font-weight: bold; cursor: pointer;">→</button>
      <div></div>
      <button id="downBtn" style="background: #00ff00; border: none; border-radius: 10px; color: #000; font-size: 20px; font-weight: bold; cursor: pointer;">↓</button>
      <div></div>
    </div>
    <p style="text-align: center; font-size: 12px; margin-top: 15px; opacity: 0.7;">Toque nos botões para mover a cobrinha!</p>
    <p style="text-align: center; font-size: 12px; opacity: 0.6;">Feito por FG DEVS</p>
  `;

    
    hero.appendChild(snakeContainer);
    
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const gridCount = 16; 
    
    let gameState = {
      snake: [{x: 8, y: 8}], 
      direction: {x: 0, y: 0},
      food: {},
      score: 0,
      highScore: parseInt(localStorage.getItem('snakeHighScore')) || 0,
      gameRunning: false,
      gamePaused: false
    };
    
    document.getElementById('highScore').textContent = gameState.highScore;
    
    function generateFood() {
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * gridCount),
          y: Math.floor(Math.random() * gridCount)
        };
      } while (gameState.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
      
      gameState.food = newFood;
    }
    
    function resetGame() {
      gameState.snake = [{x: 8, y: 8}];
      gameState.direction = {x: 0, y: 0};
      gameState.score = 0;
      gameState.gameRunning = false;
      gameState.gamePaused = false;
      document.getElementById('score').textContent = gameState.score;
      document.getElementById('pauseBtn').textContent = 'START';
      generateFood();
      draw();
    }
    
    function gameLoop() {
      if (!gameState.gameRunning || gameState.gamePaused) return;
      
      if (gameState.direction.x === 0 && gameState.direction.y === 0) {
        setTimeout(gameLoop, 150);
        return;
      }
      
      const head = {
        x: gameState.snake[0].x + gameState.direction.x,
        y: gameState.snake[0].y + gameState.direction.y
      };
      
      if (head.x < 0 || head.x >= gridCount || head.y < 0 || head.y >= gridCount) {
        gameOver();
        return;
      }
      
      if (gameState.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
      }
      
      gameState.snake.unshift(head);
      
      if (head.x === gameState.food.x && head.y === gameState.food.y) {
        gameState.score++;
        document.getElementById('score').textContent = gameState.score;
        
        if (gameState.score > gameState.highScore) {
          gameState.highScore = gameState.score;
          document.getElementById('highScore').textContent = gameState.highScore;
          localStorage.setItem('snakeHighScore', gameState.highScore);
        }
        
        generateFood();
      } else {
        gameState.snake.pop();
      }
      
      draw();
      setTimeout(gameLoop, 150);
    }
    
    function gameOver() {
      gameState.gameRunning = false;
      alert(`Game Over! Score: ${gameState.score}`);
      resetGame();
    }
    
    function draw() {
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff00';
      gameState.snake.forEach((segment, index) => {
        if (index === 0) {
          ctx.fillStyle = '#00ff88';
        } else {
          ctx.fillStyle = '#00ff00';
        }
        ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
      
      ctx.fillStyle = '#ff3333';
      ctx.fillRect(gameState.food.x * gridSize + 1, gameState.food.y * gridSize + 1, gridSize - 2, gridSize - 2);
      
      ctx.fillStyle = '#ff6666';
      ctx.fillRect(gameState.food.x * gridSize + 4, gameState.food.y * gridSize + 4, gridSize - 8, gridSize - 8);
    }
    
    function setDirection(newDirection) {
      const opposite = {
        x: -gameState.direction.x,
        y: -gameState.direction.y
      };
      
      if (gameState.snake.length > 1 && 
          newDirection.x === opposite.x && newDirection.y === opposite.y) {
        return;
      }
      
      gameState.direction = newDirection;
      
      if (!gameState.gameRunning && !gameState.gamePaused) {
        gameState.gameRunning = true;
        document.getElementById('pauseBtn').textContent = 'PAUSE';
        gameLoop();
      }
    }
    
    document.getElementById('upBtn').addEventListener('click', () => setDirection({x: 0, y: -1}));
    document.getElementById('downBtn').addEventListener('click', () => setDirection({x: 0, y: 1}));
    document.getElementById('leftBtn').addEventListener('click', () => setDirection({x: -1, y: 0}));
    document.getElementById('rightBtn').addEventListener('click', () => setDirection({x: 1, y: 0}));
    
    document.getElementById('pauseBtn').addEventListener('click', () => {
      if (!gameState.gameRunning) {
        gameState.gameRunning = true;
        gameState.gamePaused = false;
        document.getElementById('pauseBtn').textContent = 'PAUSE';
        gameLoop();
      } else {
        gameState.gamePaused = !gameState.gamePaused;
        document.getElementById('pauseBtn').textContent = gameState.gamePaused ? 'RESUME' : 'PAUSE';
        if (!gameState.gamePaused) gameLoop();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowUp': setDirection({x: 0, y: -1}); break;
        case 'ArrowDown': setDirection({x: 0, y: 1}); break;
        case 'ArrowLeft': setDirection({x: -1, y: 0}); break;
        case 'ArrowRight': setDirection({x: 1, y: 0}); break;
        case ' ': document.getElementById('pauseBtn').click(); break;
      }
    });
    
    resetGame();
    
  } else {
    const doomContainer = document.createElement('div');
    doomContainer.style.cssText = `
      width: 100%;
      height: 100vh;
      position: relative;
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    
    const iframe = document.createElement('iframe');
    iframe.src = 'https://js-dos.com/games/doom.exe.html';
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      background: #000;
    `;
    
    doomContainer.appendChild(iframe);
    hero.appendChild(doomContainer);
    
    iframe.onload = function() {
      setTimeout(() => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          const warning = iframeDoc.querySelector('[style*="linear-gradient"][style*="rgb(220, 29, 29)"]');
          if (warning) {
            warning.remove();
          }
        } catch (e) {
          const style = document.createElement('style');
          style.textContent = `
            iframe[src*="js-dos.com"] {
              margin-top: -60px !important;
              height: calc(100% + 60px) !important;
            }
          `;
          document.head.appendChild(style);
        }
      }, 2000);
    };
  }
}

function toggleMenu() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.menu-toggle');

  nav.classList.toggle('show');
  toggle.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", () => {
  const animations = {
    'fade-up': 'card fase-1',
    'fade-left': '.card-fase2',
    'zoom-in': '.card-fase3'
  };

  Object.entries(animations).forEach(([anim, selector]) => {
    document.querySelectorAll(selector).forEach(el => {
      el.setAttribute('data-anim', anim);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05
  });

  document.querySelectorAll('[data-anim]').forEach(el => {
    observer.observe(el);
  });
  if (window.matchMedia("(hover: none)").matches) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        if (card.classList.contains('flipped')) {
          card.classList.remove('flipped');
        } else {
          document.querySelectorAll('.card').forEach(c => {
            c.classList.remove('flipped');
          });
          card.classList.add('flipped');
        }
      });
    });
  }
});