# Git Command Web

Guía interactiva didáctica y visual sobre el ciclo de vida de Git, transporte de cambios, resolución de conflictos y herramientas avanzadas de productividad para desarrolladores de software.

**Desarrollado por:** Hugo Adama  
**Live Demo:** [https://hugoadama.github.io/Git_Command_Web/](https://hugoadama.github.io/Git_Command_Web/)

---

## Documentacion Tecnica

Encuentra toda la documentacion arquitectonica y funcional en la carpeta [`docs/`](./docs/):

- [Indice de Documentacion](./docs/README.md)
- [Arquitectura del Sistema & Clean Architecture](./docs/ARCHITECTURE.md)
- [Guia Detallada de los 9 Modulos & Simuladores](./docs/MODULES_GUIDE.md)
- [Guia de Despliegue & CI/CD en GitHub Pages](./docs/DEPLOYMENT_AND_CI_CD.md)
- [Estandares de Contribucion & Codigo](./docs/CONTRIBUTING.md)

---

## Modulos y Caracteristicas

1. **Pipeline Interactivo de Transporte de Cambios**:
   - Visualización pedagógica de los 4 estados de Git: Carpeta de Trabajo, Área de Preparación (Staging Area / Index), Repositorio Local (`.git`) y Servidor Remoto.
   - Referencia rápida de comandos (`git add`, `git commit`, `git push`, `git pull`, `git switch`, `git restore`) con copiado rápido en un clic.

2. **Simulador de Terminal en Vivo**:
   - Radar de estados sincronizado en tiempo real.
   - Demostración de flujos comunes con salida real de terminal.

3. **Resolvedor de Conflictos 3-Way Merge**:
   - Editor simulado para resolver colisiones entre ramas (`<<<<<<< HEAD`, `=======`, `>>>>>>> incoming`).
   - Acciones para aceptar cambios actuales, entrantes o ambos.

4. **Simulador de Git Bisect**:
   - Búsqueda binaria interactiva para rastrear el commit exacto que introdujo un bug.

5. **Bóveda de Aliases y ~/.gitconfig**:
   - Configuración global optimizada para agilizar comandos cotidianos.
   - Generador y visor interactivo de archivo de configuración.

6. **Git Hooks Hub**:
   - Automatización de defensas de calidad mediante scripts pre-commit, commit-msg y pre-push con Husky.

7. **Arquitectura Interna de Git (DAG)**:
   - Inspector de objetos plomería (`blob`, `tree`, `commit`, `tag`).

8. **Soporte Bilingue Nativo (i18n)**:
   - Rutas sincronizadas en Español (`/`) e Inglés (`/en`).

---

## Pila Tecnologica

- **Framework**: Astro 7
- **Estilos**: Vanilla CSS con variables de diseño, glassmorphism y tema oscuro/claro
- **Tipografias**: Outfit & JetBrains Mono (Google Fonts)
- **Despliegue**: GitHub Actions hacia GitHub Pages
- **Estandar de iconos**: SVGs vectoriales accesibles con `aria-hidden="true"`

---

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor local de desarrollo
npm run dev

# Validar diagnosticos y tipos
npx astro check

# Compilar paquete estatico para produccion
npm run build

# Previsualizar el bundle de produccion
npm run preview
```

---

## Licencia

Distribuido bajo la licencia MIT. Desarrollado por Hugo Adama.
