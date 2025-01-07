let femaleRobotVoice;

// Função para iniciar a animação de inicialização do Windows XP
function startWindowsStartup() {
    const windowsStartup = document.getElementById('windows-startup');
    const xpSound = document.getElementById('xp-sound');
    xpSound.play();

    // Esconder a animação de inicialização do Windows XP após o som terminar
    xpSound.addEventListener('ended', () => {
        windowsStartup.style.display = 'none';
        startCountdown();
    });
}

// Função para iniciar a contagem regressiva com uma voz robotizada feminina
function startCountdown() {
    const speakCountdown = (number) => {
        const utterance = new SpeechSynthesisUtterance(number.toString());
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.voice = femaleRobotVoice;
        speechSynthesis.speak(utterance);
    };

    let countdown = 5;
    const countdownInterval = setInterval(() => {
        if (countdown > 0) {
            speakCountdown(countdown);
            countdown--;
        } else {
            clearInterval(countdownInterval);
            setTimeout(() => {
                speakWelcomeMessage();
                startCyberpunkAnimation();
            }, 1000);
        }
    }, 1000);
}

// Função para iniciar a animação cyberpunk
function startCyberpunkAnimation() {
    const cyberpunk = document.getElementById('cyberpunk');
    cyberpunk.style.opacity = 1;
    setTimeout(() => {
        cyberpunk.style.opacity = 0;
        document.querySelector('.tech-name').style.display = 'block';
        typeEffect();
        animate();
    }, 2000); // Duração da animação cyberpunk
}

// Falar mensagem de boas-vindas
function speakWelcomeMessage() {
    const welcomeMessage = "SEJA BEM VINDO AO PORTAL MAIS NERD DA GALÁXIA. DE NERD, PRA NERD. NINJA TECH.";
    const utterance = new SpeechSynthesisUtterance(welcomeMessage);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.voice = femaleRobotVoice;
    speechSynthesis.speak(utterance);
}

// Animação de digitação
const text = "Bem-vindo ao portal nerd, pra nerds!";
const speed = 100;
let index = 0;
const typewriter = document.getElementById("typewriter");

function typeEffect() {
    if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, speed);
    } else {
        typewriter.style.borderRight = "none"; // Remove cursor ao final
    }
}

// Animação de partículas no fundo
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "#00ff00";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a "Matrix" com códigos aleatórios no fundo
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.font = "20px monospace";
    for (let i = 0; i < canvas.width; i += 30) {
        const char = String.fromCharCode(Math.random() * (126 - 33) + 33); // Códigos ASCII de caracteres imprimíveis
        const x = i;
        const y = Math.random() * canvas.height;
        ctx.fillText(char, x, y);
    }

    // Desenha as partículas
    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Ajusta o canvas ao redimensionar a janela
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
