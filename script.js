
function copyIP() {
    const ipText = document.getElementById("ip").innerText;
    navigator.clipboard.writeText(ipText).then(() => {
        alert("დაკოპირდა: " + ipText);
    });
}

function countdownTimer() {
    const countdown = document.getElementById("countdown");
    const end = new Date();
    end.setHours(end.getHours() + 1);
    function update() {
        const now = new Date();
        const diff = Math.max(0, end - now);
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        countdown.textContent = "დაიწყება: " + minutes + "წთ " + seconds + "წმ-ში";
        if (diff > 0) requestAnimationFrame(update);
    }
    update();
}
countdownTimer();

// smoke effect
const canvas = document.getElementById("smoke");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: Math.random() - 0.5,
        dy: Math.random() * -0.5,
        opacity: Math.random()
    });
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,200,200," + p.opacity + ")";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
        }
    }
    requestAnimationFrame(animate);
}
animate();
