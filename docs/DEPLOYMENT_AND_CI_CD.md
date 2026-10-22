# Guia de Despliegue y CI/CD — Git Command Web

Este documento explica como funciona el ciclo de integracion y despliegue continuo (CI/CD) de **Git Command Web** hacia **GitHub Pages** mediante **GitHub Actions**.

---

## 1. Arquitectura del Flujo de Trabajo

El archivo de workflow se encuentra en `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'npm'

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Install dependencies
        run: npm ci

      - name: Build Astro site
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 2. Requerimientos de Entorno y Node.js

* **Version de Node.js**: **Node.js 24** (o `>=22.23.4`).
  * *Nota importante*: Astro 7 requiere estrictamente Node `>=22.23.4`. Si se configura `node-version: 22` generico en GitHub Actions, la imagen por defecto puede resolver a `v22.23.3` y fallar la compilacion. Por ello, el workflow utiliza `node-version: 24` para garantizar maxima compatibilidad y velocidad.
* **Manejador de Paquetes**: `npm ci` garantiza instalaciones reproducibles basadas exclusivamente en `package-lock.json`.

---

## 3. Configuracion de GitHub Pages y Base Path

Al desplegarse en un repositorio de proyecto de GitHub Pages, la URL final es:  
`https://<usuario>.github.io/<repositorio>/`  
En nuestro caso:  
`https://hugoadama.github.io/Git_Command_Web/`

Para que los archivos estaticos (`_astro/`, `images/`, `favicon.svg`) no den error 404, se configura en [astro.config.mjs](file:///e:/Git_Command_Web/astro.config.mjs):

```javascript
export default defineConfig({
  site: 'https://HugoAdama.github.io',
  base: '/Git_Command_Web',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
```

### Manejo de Rutas con `BASE_URL`:
En el codigo de los componentes Astro, todas las referencias a imagenes y enlaces absolutos deben calcularse utilizando la variable de entorno nativa `import.meta.env.BASE_URL`:

```astro
---
const rawBase = import.meta.env.BASE_URL;
const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
---
<a href={baseUrl}>Inicio</a>
<img src={`${baseUrl}images/mi-grafico.jpg`} />
```
* En desarrollo local (`npm run dev`), `baseUrl` resuelve a `/`.
* En produccion en GitHub Pages, resuelve automaticamente a `/Git_Command_Web/`.

---

## 4. Configuracion en la Interfaz de GitHub

Si configuras el repositorio desde cero en GitHub:
1. Dirigete a la pestaña **Settings** del repositorio.
2. En la barra lateral izquierda, selecciona **Pages**.
3. En la seccion **Build and deployment**:
   * **Source**: Selecciona **GitHub Actions** (en lugar de *"Deploy from a branch"*).
4. Guarda los cambios. A partir de ese momento, cualquier push a la rama `main` activara el flujo de despliegue automatico.

---

## 5. Comandos Utiles con GitHub CLI (`gh`)

```bash
# Ver el estado de las ejecuciones de GitHub Actions
gh run list

# Ver detalles o logs de un run especifico
gh run view <run-id>

# Ver los logs de pasos fallidos
gh run view <run-id> --log-failed

# Disparar manualmente el despliegue sin hacer commit
gh workflow run deploy.yml
```
