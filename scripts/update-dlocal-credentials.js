const fs = require('fs');
const path = require('path');

// Obtener los argumentos de la línea de comandos
const args = process.argv.slice(2);
const apiKey = args[0];
const secretKey = args[1];

if (!apiKey || !secretKey) {
  console.error('Error: Debes proporcionar la API Key y Secret Key de DLocal');
  console.error('Uso: node update-dlocal-credentials.js <API_KEY> <SECRET_KEY>');
  process.exit(1);
}

// Ruta al archivo .env
const envPath = path.resolve(__dirname, '../.env');

// Verificar si el archivo .env existe
if (!fs.existsSync(envPath)) {
  console.error('Error: El archivo .env no existe');
  process.exit(1);
}

// Leer el archivo .env
let envContent = fs.readFileSync(envPath, 'utf8');

// Actualizar las credenciales de DLocal
const apiKeyRegex = /VITE_DLOCAL_API_KEY=.*/;
const secretKeyRegex = /VITE_DLOCAL_SECRET_KEY=.*/;

if (apiKeyRegex.test(envContent)) {
  envContent = envContent.replace(apiKeyRegex, `VITE_DLOCAL_API_KEY=${apiKey}`);
} else {
  envContent += `\nVITE_DLOCAL_API_KEY=${apiKey}`;
}

if (secretKeyRegex.test(envContent)) {
  envContent = envContent.replace(secretKeyRegex, `VITE_DLOCAL_SECRET_KEY=${secretKey}`);
} else {
  envContent += `\nVITE_DLOCAL_SECRET_KEY=${secretKey}`;
}

// Escribir el archivo .env actualizado
fs.writeFileSync(envPath, envContent);

console.log('Credenciales de DLocal actualizadas correctamente');
console.log('API Key:', apiKey);
console.log('Secret Key:', secretKey);
console.log('\nReinicia el servidor de desarrollo para aplicar los cambios'); 