const errorMessages = [
    "Windows has detected that you are awesome!",
    "Error: System overloaded with coolness",
    "Warning: Your PC is too powerful",
    "Critical Error: Too much swag detected",
    "Error 404: Boring moments not found"
];

const errorSound = new Audio('assets/sounds/error.wav');

function createErrorWindow() {
    const error = document.createElement('div');
    error.className = 'error-window';
    
    const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    
    error.innerHTML = `
        <div class="error-title-bar">
            <img src="assets/icons/error-small.png" class="error-icon">
            <span>Windows</span>
            <button class="error-close">×</button>
        </div>
        <div class="error-content">
            <div class="error-message">
                <img src="assets/icons/error-large.png">
                <p>${randomMessage}</p>
            </div>
            <div class="error-buttons">
                <button onclick="this.parentElement.parentElement.parentElement.remove()">OK</button>
            </div>
        </div>
    `;
    
    // Random position within visible area
    const maxX = window.innerWidth - 300;
    const maxY = window.innerHeight - 200;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    error.style.left = randomX + 'px';
    error.style.top = randomY + 'px';
    
    // Make window draggable
    error.addEventListener('mousedown', function(e) {
        if (e.target.className === 'error-close' || e.target.tagName === 'BUTTON') return;
        
        const startX = e.clientX - error.offsetLeft;
        const startY = e.clientY - error.offsetTop;
        
        function moveWindow(e) {
            error.style.left = (e.clientX - startX) + 'px';
            error.style.top = (e.clientY - startY) + 'px';
        }
        
        function stopMoving() {
            document.removeEventListener('mousemove', moveWindow);
            document.removeEventListener('mouseup', stopMoving);
        }
        
        document.addEventListener('mousemove', moveWindow);
        document.addEventListener('mouseup', stopMoving);
    });
    
    document.body.appendChild(error);
    errorSound.play();
}

// Create random error windows periodically
setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance every 10 seconds
        createErrorWindow();
    }
}, 10000);

// Create error window when clicking certain elements
document.addEventListener('DOMContentLoaded', () => {
    const errorTriggers = document.querySelectorAll('.icon.my-computer, .icon.my-network, .icon.recycle-bin');
    errorTriggers.forEach(trigger => {
        trigger.addEventListener('dblclick', createErrorWindow);
    });
});
