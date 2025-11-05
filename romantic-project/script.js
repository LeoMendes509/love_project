const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function checkName() {
    const nameInput = document.getElementById('nameInput').value.trim().toLowerCase();
    const errorMessage = document.getElementById('errorMessage');

    if (nameInput === "thais") {
        document.getElementById('inputContainer').style.display = 'none';
        document.getElementById('messageContainer').style.display = 'block';
        canvas.style.display = 'block';
        startHearts();
    } else {
        errorMessage.textContent = "Eita! Vamos lá… digite seu nome certinho, vai 😅❤";
    }
}

function startHearts() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const hearts = [];

    function createHeart() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            size: Math.random() * 20 + 10,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5
        };
    }

    function drawHeart(heart) {
        ctx.globalAlpha = heart.opacity;
        ctx.fillStyle = 'pink';
        ctx.beginPath();
        const topCurveHeight = heart.size * 0.3;
        ctx.moveTo(heart.x, heart.y + topCurveHeight);
        ctx.bezierCurveTo(
            heart.x, heart.y,
            heart.x - heart.size / 2, heart.y,
            heart.x - heart.size / 2, heart.y + topCurveHeight
        );
        ctx.bezierCurveTo(
            heart.x - heart.size / 2, heart.y + (heart.size + topCurveHeight) / 2,
            heart.x, heart.y + (heart.size + topCurveHeight) / 2,
            heart.x, heart.y + heart.size
        );
        ctx.bezierCurveTo(
            heart.x, heart.y + (heart.size + topCurveHeight) / 2,
            heart.x + heart.size / 2, heart.y + (heart.size + topCurveHeight) / 2,
            heart.x + heart.size / 2, heart.y + topCurveHeight
        );
        ctx.bezierCurveTo(
            heart.x + heart.size / 2, heart.y,
            heart.x, heart.y,
            heart.x, heart.y + topCurveHeight
        );
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    function updateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < hearts.length; i++) {
            const heart = hearts[i];
            heart.y += heart.speed;

            if (heart.y > canvas.height) {
                hearts[i] = createHeart();
            }

            drawHeart(heart);
        }

        requestAnimationFrame(updateHearts);
    }

    for (let i = 0; i < 100; i++) {
        hearts.push(createHeart());
    }

    updateHearts();
}