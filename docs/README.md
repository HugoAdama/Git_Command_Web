# Documentacion Tecnica — Git Command Web

Bienvenido al centro de documentacion oficial de **Git Command Web**, una aplicacion web didactica interactiva diseñada para la enseñanza visual del ciclo de vida de Git, resolucion de conflictos y productividad profesional en control de versiones.

**Autor y Desarrollador Principal:** Hugo Adama  
**Repositorio GitHub:** [https://github.com/HugoAdama/Git_Command_Web](https://github.com/HugoAdama/Git_Command_Web)  
**Despliegue en Vivo:** [https://hugoadama.github.io/Git_Command_Web/](https://hugoadama.github.io/Git_Command_Web/)  
**Framework Base:** Astro 7 (Static Site Generation / SSG)

---

## Estructura de la Documentacion

Para facilitar el mantenimiento y la evolucion de la plataforma, la documentacion esta organizada en las siguientes guias:

| Documento | Descripcion |
| :--- | :--- |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitectura del proyecto, flujo de datos, gestion de estado con Vanilla JS y sistema de diseño. |
| [MODULES_GUIDE.md](./MODULES_GUIDE.md) | Detalle funcional y técnico de cada uno de los 9 simuladores y modulos didácticos interactivos. |
| [DEPLOYMENT_AND_CI_CD.md](./DEPLOYMENT_AND_CI_CD.md) | Pipeline de GitHub Actions, configuracion de base path para GitHub Pages y resolucion de problemas comunes. |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Estandares de codigo, politica de Cero Emojis (SVG accesible), internacionalizacion simétrica y flujo de desarrollo. |

---

## Vision y Principios de Diseño

1. **Pedagogia Visual Interactiva**:
   Git suele enseñarse como una serie de comandos abstractos en terminal. Git Command Web modela el transporte físico de archivos a traves de los 4 estados cardinales (Carpeta Local, Staging Area, Repositorio Local y Servidor Remoto).

2. **Cero Dependencias de Framework de Cliente**:
   Toda la interactividad (simulador de terminal, editor de conflictos de merge, busqueda binaria en bisect, generador de `.gitconfig`) esta construida con **TypeScript puro y Vanilla CSS**, logrando tiempos de carga sub-segundo (<600ms) y cero sobrecarga de hidratacion.

3. **Internacionalizacion Simetrica Nativa (i18n)**:
   Soporte completo y parejo para Español (`/`) e Ingles (`/en`), con conjuntos de datos fuertemente tipados sin librerías externas.

4. **Estetica Futurista Cyberpunk / Terminal**:
   Esquema de color con paletas balanceadas en HSL, superficies con glassmorphism (`backdrop-filter: blur(16px)`), acentos neon esmeralda/cian y modo oscuro/claro nativo persistente en `localStorage`.

5. **Iconografia Accesible**:
   Politica estricta de Cero Emojis en interfaz y documentacion: uso exclusivo de vectores SVG semanticos con atributos `aria-hidden="true"` y contrastes conformes a WCAG AAA.

---

## Resumen de Inicio Rapido

```bash
# 1. Clonar el repositorio
git clone https://github.com/HugoAdama/Git_Command_Web.git
cd Git_Command_Web

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor local
npm run dev

# 4. Validar tipos de TypeScript y componentes Astro
npx astro check

# 5. Compilar bundle estatico para produccion
npm run build
```
