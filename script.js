
function copyIP() {
    const ipText = document.getElementById("ip").innerText;
    navigator.clipboard.writeText(ipText).then(() => {
        alert("დაკოპირდა: " + ipText);
    });
}

function countdownTimer() {
    const countdown = document.getElementById("countdown");
    function update() {
        const now = new Date();
        let end = new Date();
        end.setHours(0, 0, 0, 0); // 00:00 საათი

        if (now >= end) {
            end.setDate(end.getDate() + 1);
        }

        const diff = end - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdown.textContent = "მიქსი დაიწყება: " + hours + "სთ " + minutes + "წთ " + seconds + "წმ-ში";

        if (diff > 0) requestAnimationFrame(update);
    }
    update();
}
countdownTimer();

// Clock in bottom-right with Georgia Time (UTC+4)
function updateClock() {
    const now = new Date();
    // Convert to Georgia time (UTC+4)
    const georgiaOffset = 4 * 60; // minutes
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const geoTime = new Date(utc + georgiaOffset * 60000);

    let h = geoTime.getHours().toString().padStart(2, '0');
    let m = geoTime.getMinutes().toString().padStart(2, '0');
    let s = geoTime.getSeconds().toString().padStart(2, '0');

    document.getElementById("realtime-clock").textContent = "🕒 " + h + ":" + m + ":" + s;
    setTimeout(updateClock, 1000);
}
updateClock();

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
