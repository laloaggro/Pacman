// Configuración del canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Tamaño del mapa
const tileSize = 30;
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

// Variables del juego
let score = 0;
let pacman = {
    x: 10,
    y: 15,
    direction: 'right',
    nextDirection: 'right'
};

// Mapa del juego (1 = pared, 0 = comida, 2 = espacio vacío, 3 = pastilla especial)
const gameMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 3, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2],
    [1, 1, 1, 1, 0, 1, 2, 1, 1, 0, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1],
    [2, 2, 2, 2, 0, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 0, 2, 2, 2, 2],
    [1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1],
    [2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2],
    [1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 3, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 3, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Dibujar el mapa
function drawMap() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = gameMap[row][col];
            const x = col * tileSize;
            const y = row * tileSize;
            
            if (tile === 1) {
                // Pared
                ctx.fillStyle = '#0000FF';
                ctx.fillRect(x, y, tileSize, tileSize);
            } else if (tile === 0) {
                // Comida
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(x + tileSize/2, y + tileSize/2, 3, 0, Math.PI * 2);
                ctx.fill();
            } else if (tile === 3) {
                // Pastilla especial
                ctx.fillStyle = '#FFFF00';
                ctx.beginPath();
                ctx.arc(x + tileSize/2, y + tileSize/2, 8, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

// Dibujar a Pacman
function drawPacman() {
    const x = pacman.x * tileSize;
    const y = pacman.y * tileSize;
    
    // Dibujar cuerpo de Pacman
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    
    // Ángulo de la boca según la dirección
    let startAngle = 0;
    let endAngle = Math.PI * 2;
    
    if (pacman.direction === 'right') {
        startAngle = 0.2 * Math.PI;
        endAngle = 1.8 * Math.PI;
    } else if (pacman.direction === 'left') {
        startAngle = 1.2 * Math.PI;
        endAngle = 0.8 * Math.PI;
    } else if (pacman.direction === 'up') {
        startAngle = 1.7 * Math.PI;
        endAngle = 1.3 * Math.PI;
    } else if (pacman.direction === 'down') {
        startAngle = 0.7 * Math.PI;
        endAngle = 0.3 * Math.PI;
    }
    
    ctx.arc(x + tileSize/2, y + tileSize/2, tileSize/2, startAngle, endAngle);
    ctx.lineTo(x + tileSize/2, y + tileSize/2);
    ctx.fill();
}

// Mover a Pacman
function movePacman() {
    // Intentar cambiar de dirección si se solicitó
    if (canMove(pacman.x, pacman.y, pacman.nextDirection)) {
        pacman.direction = pacman.nextDirection;
    }
    
    // Mover en la dirección actual si es posible
    if (canMove(pacman.x, pacman.y, pacman.direction)) {
        switch (pacman.direction) {
            case 'right':
                pacman.x++;
                break;
            case 'left':
                pacman.x--;
                break;
            case 'up':
                pacman.y--;
                break;
            case 'down':
                pacman.y++;
                break;
        }
        
        // Manejar túneles (teletransporte izquierda-derecha)
        if (pacman.x < 0) {
            pacman.x = cols - 1;
        } else if (pacman.x >= cols) {
            pacman.x = 0;
        }
        
        // Comer comida
        eatFood();
    }
}

// Verificar si se puede mover en una dirección
function canMove(x, y, direction) {
    let newX = x;
    let newY = y;
    
    switch (direction) {
        case 'right':
            newX++;
            break;
        case 'left':
            newX--;
            break;
            case 'up':
            newY--;
            break;
        case 'down':
            newY++;
            break;
    }
    
    // Manejar túneles
    if (newX < 0) {
        newX = cols - 1;
    } else if (newX >= cols) {
        newX = 0;
    }
    
    // Verificar si la posición es válida
    if (newY >= 0 && newY < rows) {
        return gameMap[newY][newX] !== 1;
    }
    
    return false;
}

// Comer comida
function eatFood() {
    const tile = gameMap[pacman.y][pacman.x];
    
    if (tile === 0) {
        // Comida normal
        gameMap[pacman.y][pacman.x] = 2; // Marcar como comida comida
        score += 10;
        scoreElement.textContent = score;
    } else if (tile === 3) {
        // Pastilla especial
        gameMap[pacman.y][pacman.x] = 2; // Marcar como comida comida
        score += 50;
        scoreElement.textContent = score;
    }
}

// Manejar eventos del teclado
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            pacman.nextDirection = 'up';
            break;
        case 'ArrowDown':
            pacman.nextDirection = 'down';
            break;
        case 'ArrowLeft':
            pacman.nextDirection = 'left';
            break;
        case 'ArrowRight':
            pacman.nextDirection = 'right';
            break;
    }
});

// Bucle del juego
function gameLoop() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar el juego
    drawMap();
    drawPacman();
    
    // Mover a Pacman
    movePacman();
    
    // Continuar el bucle
    setTimeout(gameLoop, 150);
}

// Iniciar el juego
gameLoop();