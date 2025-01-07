let femaleRobotVoice;

function startWindowsStartup() {
    const windowsStartup = document.getElementById('windows-startup');
    const xpSound = document.getElementById('xp-sound');
    xpSound.play();

    xpSound.addEventListener('ended', () => {
        windowsStartup.style.display = 'none';
        startCountdown();
    });
}

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
            }, 1000);
        }
    }, 1000);
}

function speakWelcomeMessage() {
    const welcomeMessage = "Seja bem-vindo à Ninja Tech.";
    const utterance = new SpeechSynthesisUtterance(welcomeMessage);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.voice = femaleRobotVoice;

    speechSynthesis.speak(utterance);

    utterance.onend = () => {
        showVideo();
    };
}

function showVideo() {
    const videoContainer = document.getElementById('video-container');
    const videoFrame = document.getElementById('video-frame');

    videoContainer.style.display = 'flex';
    videoFrame.src += "?autoplay=1";
}

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

    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.font = "20px monospace";
    for (let i = 0; i < canvas.width; i += 30) {
        const char = String.fromCharCode(Math.random() * (126 - 33) + 33);
        const x = i;
        const y = Math.random() * canvas.height;
        ctx.fillText(char, x, y);
    }

    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.onload = () => {
    speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        femaleRobotVoice = voices.find(voice => voice.name.includes('Google UK English Female') || voice.name.includes('Google US English Female'));
        startWindowsStartup();
    };
};
