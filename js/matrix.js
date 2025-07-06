// Matrix animation
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters - taken from the original Matrix.
const matrix = '01';
const matrixArray = matrix.split('');

const fontSize = 14;
const columns = canvas.width / fontSize;

// Create an array of drops - one per column
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
}

// Drawing the characters
function draw() {
    // Black background with opacity
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the style for the characters
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    // Loop over drops
    for (let i = 0; i < drops.length; i++) {
        // Random character to print
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top row when it reaches bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move the drop down
        drops[i]++;
    }
}

// Animation loop
setInterval(draw, 33);

// Update canvas size when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
