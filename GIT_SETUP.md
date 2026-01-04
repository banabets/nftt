# 🚀 Guía para Subir el Proyecto a GitHub

## 📋 Requisitos Previos

1. **Git instalado**: Descarga e instala Git desde https://git-scm.com/downloads
2. **Cuenta de GitHub**: Asegúrate de tener una cuenta en GitHub
3. **SSH configurado** (opcional pero recomendado): Configura SSH keys para autenticación

## 📝 Pasos para Subir el Proyecto

### 1. Inicializar Git (si no está hecho)
```bash
cd C:\Users\Buu\Desktop\memenft
git init
```

### 2. Configurar Git (solo la primera vez)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

### 3. Agregar el repositorio remoto
```bash
git remote add origin git@github.com:banabets/nftt.git
```

### 4. Crear archivo .gitignore (recomendado)
Crea un archivo llamado `.gitignore` en la raíz del proyecto con este contenido:

```
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log
```

### 5. Agregar archivos al repositorio
```bash
git add .
```

### 6. Hacer el primer commit
```bash
git commit -m "Initial commit - Maduro Meme Generator Website"
```

### 7. Subir al repositorio
```bash
git push -u origin main
```

## 🔧 Solución de Problemas

### Si hay errores de SSH:
1. Genera una nueva SSH key:
```bash
ssh-keygen -t rsa -b 4096 -C "tu-email@example.com"
```

2. Agrega la key a GitHub:
   - Copia el contenido de `~/.ssh/id_rsa.pub`
   - Ve a GitHub → Settings → SSH and GPG keys → New SSH key

3. O usa HTTPS en lugar de SSH:
```bash
git remote set-url origin https://github.com/banabets/nftt.git
```

### Si el repositorio ya existe:
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### Para verificar el estado:
```bash
git status
git log --oneline
```

## 📁 Estructura del Proyecto

```
memenft/
├── src/
│   ├── css/
│   │   ├── components.css
│   │   ├── main.css
│   │   ├── utils.css
│   │   └── variables.css
│   ├── js/
│   │   ├── actions.js
│   │   ├── config.js
│   │   ├── main.js
│   │   ├── offline.js
│   │   ├── rumorGenerator.js
│   │   └── utils.js
│   └── index.html
├── public/
│   ├── nfts/          # Imágenes de memes
│   ├── city.png       # Background
│   └── ...            # Otros assets
├── dist/              # Build de producción
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Comandos Útiles

```bash
# Ver estado de archivos
git status

# Ver cambios en archivos
git diff

# Ver historial de commits
git log --oneline

# Crear nueva rama
git checkout -b nueva-rama

# Cambiar a rama main
git checkout main

# Actualizar desde remoto
git pull origin main

# Resolver conflictos
git add <archivo-conflicto>
git commit -m "Resolve merge conflicts"
```

¡Sigue estos pasos y tu proyecto estará en GitHub! 🎉

