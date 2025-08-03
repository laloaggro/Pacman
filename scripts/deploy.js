#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Función para ejecutar comandos
function runCommand(command) {
    try {
        console.log(`Ejecutando: ${command}`);
        const output = execSync(command, { encoding: 'utf-8' });
        console.log(output);
        return true;
    } catch (error) {
        console.error(`Error ejecutando ${command}:`, error.message);
        return false;
    }
}

// Verificar si hay cambios
console.log('Verificando cambios en el repositorio...');
const statusOutput = execSync('git status --porcelain', { encoding: 'utf-8' });

if (!statusOutput.trim()) {
    console.log('No hay cambios para commitear.');
    process.exit(0);
}

// Obtener lista de archivos modificados
const modifiedFiles = statusOutput.trim().split('\n').filter(line => line.trim() !== '');
console.log(`Archivos modificados: ${modifiedFiles.length}`);

// Agregar todos los cambios
console.log('Agregando cambios...');
if (!runCommand('git add .')) {
    process.exit(1);
}

// Generar mensaje de commit basado en los archivos modificados
let commitMessage = 'Actualización del proyecto';
if (modifiedFiles.length > 0) {
    const fileTypes = {};
    modifiedFiles.forEach(file => {
        const match = file.match(/^([A-Z?])\s+(.+)$/);
        if (match) {
            const fileName = match[2];
            const extension = fileName.split('.').pop();
            fileTypes[extension] = (fileTypes[extension] || 0) + 1;
        }
    });
    
    const types = Object.keys(fileTypes);
    if (types.length > 0) {
        commitMessage = `Actualiza ${types.slice(0, 3).join(', ')} archivos`;
    }
}

// Hacer commit
console.log(`Haciendo commit con mensaje: ${commitMessage}`);
if (!runCommand(`git commit -m "${commitMessage}"`)) {
    process.exit(1);
}

console.log('¡Commit realizado con éxito!');
console.log('Para hacer push a GitHub, ejecuta: git push origin master');