# Arquitectura del Sistema — Git Command Web

Este documento detalla los patrones de diseño, organizacion de carpetas, flujo de datos y decisiones arquitectonicas tomadas en **Git Command Web**.

---

## 1. Estructura de Directorios

```text
e:/Git_Command_Web/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD automatizado hacia GitHub Pages
├── docs/                         # Documentacion tecnica del sistema
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── MODULES_GUIDE.md
│   ├── DEPLOYMENT_AND_CI_CD.md
│   └── CONTRIBUTING.md
├── public/
│   ├── favicon.svg               # Isotipo de marca vectorial neon
│   ├── favicon.ico
│   └── images/                   # Diagramas e ilustraciones optimizadas
│       ├── git-lifecycle-diagram.jpg
│       ├── git-rescue-station.jpg
│       └── git-workflows-team.jpg
├── src/
│   ├── components/               # Modulos didacticos interactivos
│   │   ├── layout/               # Header, Footer, Navigation, Toggles
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── NavigationSections.astro
│   │   │   ├── LanguageToggle.astro
│   │   │   └── ThemeToggle.astro
│   │   ├── GitPipeline.astro
│   │   ├── InteractiveTerminal.astro
│   │   ├── BranchVisualizer.astro
│   │   ├── ConflictResolver.astro
│   │   ├── GitBisectSimulator.astro
│   │   ├── GitRescueSection.astro
│   │   ├── WorkflowsSection.astro
│   │   ├── ComparisonsSection.astro
│   │   ├── CommandBuilder.astro
│   │   ├── ConventionalCommitBuilder.astro
│   │   ├── GitignoreBuilder.astro
│   │   ├── GitAliasesVault.astro
│   │   ├── GitHooksHub.astro
│   │   ├── GitInternals.astro
│   │   ├── GitGlossary.astro
│   │   └── GitQuiz.astro
│   ├── data/                     # Conjuntos de datos tipados (ES y EN)
│   │   ├── gitData.ts
│   │   ├── gitEducationalData.ts
│   │   ├── gitToolsData.ts
│   │   ├── gitGlossaryData.ts
│   │   ├── gitignorePresets.ts
│   │   └── en/                   # Espejo simetrico en ingles
│   │       ├── gitData.ts
│   │       ├── gitEducationalData.ts
│   │       ├── gitToolsData.ts
│   │       └── gitGlossaryData.ts
│   ├── layouts/
│   │   └── Layout.astro          # Plantilla principal, Meta, Toast, ScrollBar
│   ├── pages/
│   │   ├── index.astro           # Entrada en Español (/)
│   │   └── en/
│   │       └── index.astro       # Entrada en Ingles (/en)
│   ├── scripts/
│   │   └── mainApp.ts            # Logica de pipeline, filtros y busqueda global
│   ├── styles/
│   │   └── global.css            # Tokens CSS, temas, reset y animaciones
│   ├── types/                    # Definiciones TypeScript de dominio
│   │   ├── git.ts
│   │   ├── educational.ts
│   │   ├── glossary.ts
│   │   └── gitignore.ts
│   └── utils/                    # Funciones utilitarias puras
│       ├── clipboard.ts          # Portapapeles y notificacion HUD
│       ├── highlighter.ts        # Renderizado de sintaxis en terminal
│       └── index.ts
├── astro.config.mjs              # Configuracion de sitio, base path e i18n
├── package.json
└── tsconfig.json
```

---

## 2. Patron de Diseño: Clean Architecture en SSG

El proyecto aplica una separacion estricta de responsabilidades en 4 capas:

```
┌────────────────────────────────────────────────────────┐
│  CAPA DE PRESENTACION (Astro Components & Layouts)     │
│  Layout.astro, Header.astro, Footer.astro, Modulos     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  CAPA DE COMPORTAMIENTO (TypeScript Scripts & Handlers)│
│  mainApp.ts, clipboard.ts, Scripts embebidos           │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  CAPA DE DATOS (Data Models & Repositories)            │
│  gitData.ts, gitEducationalData.ts, gitToolsData.ts    │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  CAPA DE DOMINIO Y TIPOS (TypeScript Interfaces)       │
│  GitCommand, ConflictScenario, BisectCommit, etc.      │
└────────────────────────────────────────────────────────┘
```

### Ventajas de este enfoque:
- **Independencia de Framework**: Si se decide migrar a otro generador o framework en el futuro, el 100% de los datos, tipos, utilidades de copiado y estilos CSS pueden reutilizarse sin reescritura.
- **Rendimiento Optimo**: Al compilarse como HTML estatico, el navegador recibe contenido instantaneo listo para interactuar sin tiempo de ejecucion pesado ni bundles JS de megabytes.

---

## 3. Gestion de Estado sin Frameworks de Cliente

En lugar de utilizar React, Vue o Svelte con librerias de estado (Redux, Zustand, Pinia), Git Command Web implementa gestion reactiva mediante:

1. **Atributos de Datos Semanticos (`data-*`)**:
   Los componentes Astro inyectan sus datos directamente como atributos en los contenedores raíz (por ejemplo, `data-scenarios-json`, `data-commits-json`, `data-objects-json`).
2. **Event Delegation y Event Listeners Ligeros**:
   Los botones y pestañas se enlazan mediante listeners nativos delegados o directos con `addEventListener`.
3. **View Transitions API Nativa**:
   El cambio entre pestañas del modulo principal (`switchHubView`) utiliza `document.startViewTransition()` si el navegador lo soporta, logrando transiciones fluidas de 300ms a 60 FPS sin dependencias.
4. **URL Hash Routing**:
   El estado de la vista seleccionada se refleja en el hash (`#pipeline`, `#simuladores`, `#guias`, `#herramientas`, `#glosario-quiz`), permitiendo compartir enlaces directos a cualquier modulo.

---

## 4. Prevencion de FOUC y Modo Oscuro/Claro

Para evitar el parpadeo de color al cargar la pagina (FOUC: Flash of Unstyled Content):
1. Un script sincrono `is:inline` en el `<head>` de [Layout.astro](file:///e:/Git_Command_Web/src/layouts/Layout.astro) lee `localStorage.getItem('theme')` o consulta `matchMedia('(prefers-color-scheme: dark)')` antes del primer renderizado del DOM.
2. Inmediatamente aplica el atributo `data-theme="dark"` o `data-theme="light"` al elemento raíz `<html>`.
3. El archivo [global.css](file:///e:/Git_Command_Web/src/styles/global.css) utiliza variables CSS vinculadas a dicho atributo:
   ```css
   :root { /* Variables de modo oscuro por defecto */ }
   [data-theme="light"] { /* Reasignacion de tokens claros */ }
   ```

---

## 5. Sistema de Internacionalizacion Simetrica (i18n)

Astro gestiona las rutas estaticas mediante carpetas:
- **Español (idioma principal)**: `src/pages/index.astro` -> genera `/index.html`.
- **Ingles**: `src/pages/en/index.astro` -> genera `/en/index.html`.

La simetria de datos esta respaldada por TypeScript:
- Cada interfaz en `src/types/` define los campos requeridos.
- Si se añade un comando en `src/data/gitData.ts`, el compilador exige su equivalente en `src/data/en/gitData.ts`.
- `LanguageToggle.astro` calcula dinamicamente la ruta de alternancia utilizando `import.meta.env.BASE_URL`, garantizando que funcione tanto en desarrollo local como en el subdirectorio de GitHub Pages (`/Git_Command_Web/`).
