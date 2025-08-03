#!/usr/bin/env node

const readline = require('readline');

// Crear interfaz para leer entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('=== Inicialización de repositorio remoto ===');
console.log('Este script te ayudará a conectar tu repositorio local con GitHub.');
console.log('');

// Preguntar por la información necesaria
rl.question('Nombre de usuario de GitHub: ', (username) => {
    rl.question('Nombre del repositorio en GitHub: ', (repoName) => {
        console.log('');
        console.log('Instrucciones:');
        console.log('1. Crea un nuevo repositorio en GitHub con el nombre:', repoName);
        console.log('2. NO inicialices el repositorio con README, .gitignore o licencia');
        console.log('3. Ejecuta los siguientes comandos en tu terminal:');
        console.log('');
        console.log(`   git remote add origin https://github.com/${username}/${repoName}.git`);
        console.log('   git branch -M main');
        console.log('   git push -u origin main');
        console.log('');
        console.log('Una vez configurado, puedes usar "npm run deploy" para hacer commits automáticos.');
        rl.close();
    });
});