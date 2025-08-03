# Historial de cambios

## [1.3.1] - 2024-08-19

### Cambiado
- Mejorado el algoritmo de movimiento de Blinky (fantasma rojo) para que use la distancia de Manhattan
- Optimizado el cálculo de direcciones para todos los fantasmas
- Mejorada la precisión del comportamiento de los fantasmas según el juego original

## [1.3.0] - 2024-08-19

### Añadido
- Implementación de comportamientos específicos para cada fantasma:
  - Blinky (Rojo) persigue directamente a Pacman
  - Pinky (Rosa) se posiciona delante de Pacman para interceptarlo
  - Inky (Celeste) tiene movimiento errático
  - Clyde (Naranja) se comporta de forma aleatoria cuando está lejos y huye cuando está cerca

### Cambiado
- Mejora en el movimiento de los fantasmas para que sea más similar al juego original
- Optimización del código de movimiento de fantasmas

## [1.2.0] - 2024-08-19

### Añadido
- Implementación de fantasmas con colores originales (Blinky, Pinky, Inky y Clyde)
- Movimiento básico de los fantasmas
- Diseño mejorado de los fantasmas con ojos y forma característica
- Añadida una carpeta para archivos de audio (para futura implementación)

### Cambiado
- Corrección de colores para que sean más fieles al juego original
- Mejoras en la representación visual de Pacman

## [1.1.0] - 2024-08-19

### Cambiado
- Actualizado el diseño del juego para que se parezca más al original de Namco
- Mejorado el mapa del laberinto con un diseño más fiel al original
- Actualizados los colores para coincidir con la estética original (amarillo para Pacman, azul para las paredes)
- Mejorado el estilo visual con tipografía y bordes más acordes al juego original

## [1.0.0] - 2024-08-19

### Añadido
- Juego básico de Pacman con movimiento en 4 direcciones
- Laberinto con paredes, comida y pastillas especiales
- Sistema de puntuación
- Túneles para pasar de un lado a otro del mapa
- Controles con teclas de flecha
- Scripts de automatización para despliegue en GitHub
- Documentación básica en README.md

### Tecnologías
- HTML5 Canvas para renderizado del juego
- CSS3 para estilos
- JavaScript para la lógica del juego