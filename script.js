gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', function () {
    // Animação de partículas no hero
    createParticles();

    // Animação de entrada para elementos
    animateOnScroll();

    // Contador animado para estatísticas
    setupCounterAnimation();

    // Navegação suave
    setupSmoothScrolling();

    // Efeito de mudança no navbar ao scrollar
    setupNavbarScrollEffect();

    // Configurar o efeito parallax
    setupParallax();
});

function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 80 + 40;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posicionar as partículas atrás do texto
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        container.appendChild(particle);

        // Animação GSAP para partículas
        gsap.to(particle, {
            y: Math.random() * 100 - 50,
            x: Math.random() * 100 - 50,
            duration: Math.random() * 10 + 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

function animateOnScroll() {
    // Animação para elementos com a classe .animate-on-scroll
    gsap.utils.toArray('.section-title, .service-box, .process-step, .stats-box, .testimonial-card').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animação específica para o hero
    gsap.from('.hero-content', {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: "power3.out"
    });
}

function setupCounterAnimation() {
    // Configurar a animação do contador
    const counters = document.querySelectorAll('.stats-number');

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2;

        ScrollTrigger.create({
            trigger: counter,
            onEnter: () => {
                gsap.to(counter, {
                    innerText: target,
                    duration: duration,
                    snap: { innerText: 1 },
                    stagger: 1,
                    onUpdate: function () {
                        counter.innerText = Math.ceil(counter.innerText);
                    }
                });
            },
            once: true
        });
    });
}

function setupSmoothScrolling() {
    // Navegação suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

function setupNavbarScrollEffect() {
    // Efeito de mudança no navbar ao scrollar
    ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: {
            className: 'navbar-scrolled',
            targets: '.navbar'
        },
        onUpdate: (self) => {
            if (self.isActive) {
                gsap.to('.navbar', {
                    padding: '10px 0',
                    backgroundColor: 'var(--primary)',
                    duration: 0.3
                });
            } else {
                gsap.to('.navbar', {
                    padding: '20px 0',
                    duration: 0.3
                });
            }
        }
    });
}

function setupParallax() {
    const video = document.querySelector('.parallax-video');
    if (!video) return;

    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset;
        const parallaxValue = scrollPosition * 0.5;

        // Aplicar o transform diretamente para melhor performance
        video.style.transform = `translateY(${parallaxValue * -0.8}px)`;
    });
}
// Seleciona todas as seções e links do menu
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    // Descobre em qual seção o usuário está
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 300; // ajuste se sua navbar for fixa
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    // Remove active de todos os links e aplica só no atual
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});