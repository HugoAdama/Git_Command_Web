# Guia de Contribucion y Estandares — Git Command Web

Gracias por tu interes en contribuir o mantener **Git Command Web**. Para preservar la coherencia visual, rendimiento y calidad arquitectonica, solicitamos seguir las siguientes directrices obligatorias.

---

## 1. Principios de Codigo

1. **Vanilla CSS & Tokens**:
   * No utilizar frameworks utilitarios como TailwindCSS a menos que se solicite explicitamente.
   * Todos los componentes deben utilizar las variables de diseño definidas en `src/styles/global.css` (`--bg-primary`, `--bg-card`, `--accent-cyan`, `--accent-emerald`, `--accent-gold`, etc.).
   * Mantener los estilos encapsulados dentro de la etiqueta `<style>` de cada componente Astro.

2. **Politica Estricta de Cero Emojis**:
   * No utilizar emojis en la interfaz de usuario, etiquetas de botones ni en el contenido didactico.
   * Todos los iconos deben ser vectores SVG limpios, semanticos y con el atributo `aria-hidden="true"`.
   * Los iconos interactivos deben contar con etiquetas accesibles (`aria-label`, `title`).

3. **Simetria Obligatoria en Internacionalizacion (i18n)**:
   * Toda caracteristica, comando, glosario o escenario de rescate que se agregue en español (`src/data/`) debe agregarse simultaneamente con su traduccion y adaptacion tecnica en ingles (`src/data/en/`).
   * Verificar que las interfaces TypeScript en `src/types/` cubran todos los campos requeridos.

---

## 2. Como Agregar Nuevos Comandos o Herramientas

### Paso 1: Definir los datos en TypeScript
Edita `src/data/gitData.ts` y agrega la entrada correspondiente respetando el tipo `GitCommand`:

```typescript
{
  command: 'git sparse-checkout set <directorio>',
  description: 'Clona o descarga solo subdirectorios especificos del repositorio.',
  detail: 'Acelera el trabajo en monorepos gigantes descargando unicamente los archivos necesarios.',
  category: 'habitual',
  tags: ['monorepo', 'rendimiento', 'sparse']
}
```

### Paso 2: Replicar en ingles
Edita `src/data/en/gitData.ts` y añade la version en ingles:

```typescript
{
  command: 'git sparse-checkout set <directory>',
  description: 'Clones or downloads only specific subdirectories of the repository.',
  detail: 'Speeds up work in massive monorepos by downloading only the required directories.',
  category: 'habitual',
  tags: ['monorepo', 'performance', 'sparse']
}
```

---

## 3. Verificaciones de Calidad Previas a Commit

Antes de crear un commit o enviar cambios, ejecuta en tu terminal:

```bash
# 1. Comprobar que no existan errores de tipos ni advertencias
npx astro check

# 2. Comprobar que el paquete estatico compile en menos de 1 segundo
npm run build
```

Ambos comandos deben finalizar con **`code 0`**, sin advertencias de tipos (`0 errors, 0 warnings`).

---

## 4. Convencion de Commits

Seguimos la especificacion de [Conventional Commits](https://www.conventionalcommits.org/):

* `feat:` Nueva funcionalidad o simulador interactivo.
* `fix:` Correccion de bugs o ajuste visual/responsivo.
* `docs:` Actualizacion o adicion de documentacion.
* `style:` Cambios cosmeticos sin impacto en logica.
* `refactor:` Refactorizacion interna de codigo.
* `ci:` Ajustes a flujos de GitHub Actions.

---

## 5. Autor y Creditos

Proyecto conceptualizado, diseñado y desarrollado por **Hugo Adama**.  
Cualquier duda o propuesta tecnica puede abrirse mediante un Issue o Pull Request en el [repositorio de GitHub](https://github.com/HugoAdama/Git_Command_Web).
