# Guia de Modulos Didacticos — Git Command Web

Este documento describe a nivel tecnico y funcional cada uno de los componentes y simuladores interactivos que componen la plataforma.

---

## Indice de Modulos

1. [Pipeline de Transporte de Cambios](#1-pipeline-de-transporte-de-cambios)
2. [Simulador de Terminal en Vivo](#2-simulador-de-terminal-en-vivo)
3. [Arbol de Ramas y Merge vs Rebase](#3-arbol-de-ramas-y-merge-vs-rebase)
4. [Resolvedor de Conflictos 3-Way Merge](#4-resolvedor-de-conflictos-3-way-merge)
5. [Simulador de Git Bisect (Busqueda Binaria)](#5-simulador-de-git-bisect-busqueda-binaria)
6. [Estacion de Rescate Git SOS](#6-estacion-de-rescate-git-sos)
7. [Flujos de Trabajo en Equipo](#7-flujos-de-trabajo-en-equipo)
8. [Comparativas Frente a Frente](#8-comparativas-frente-a-frente)
9. [Generadores Visuales (Conventional Commits, Ramas, .gitignore)](#9-generadores-visuales)
10. [Boveda de Aliases y ~/.gitconfig Pro](#10-boveda-de-aliases-y-gitconfig-pro)
11. [Git Hooks Hub (Husky y Scripts Defensivos)](#11-git-hooks-hub)
12. [Arquitectura Interna de Git (DAG y Plomeria)](#12-arquitectura-interna-de-git-dag-y-plomeria)
13. [Glosario y Autoevaluacion Interactiva (Quiz)](#13-glosario-y-autoevaluacion-interactiva-quiz)

---

## 1. Pipeline de Transporte de Cambios
* **Componente**: `src/components/GitPipeline.astro` + `src/components/CommandPanel.astro`
* **Proposito**: Enseñar visualmente como un archivo transita entre las 4 zonas de Git.
* **Mecanica**:
  * 4 nodos cardinales con animaciones de pulso neón:
    * `01. Carpeta de trabajo` (archivos locales sin preparar)
    * `02. Area de preparacion` (Staging Area / Index)
    * `03. Repositorio local` (commits inmutables en `.git`)
    * `04. Remoto` (GitHub, GitLab, servidores)
  * Flechas interactivas con haces de luz en movimiento (`pulse-beam`).
  * Al hacer clic en un salto (`git add`, `git commit`, `git push`, `git pull`), el panel de comandos inferior se sincroniza instantaneamente mostrando los comandos correspondientes.
  * Filtro por nivel de experiencia (`Todos`, `Básico`, `Habitual`, `Avanzado`) y boton de impresion a PDF limpia.

---

## 2. Simulador de Terminal en Vivo
* **Componente**: `src/components/InteractiveTerminal.astro`
* **Proposito**: Simular una consola de terminal real con radar de estado de archivos.
* **Mecanica**:
  * Emulador de terminal en ventana estilo macOS con botones de control.
  * Radar de estado en tiempo real (`Carpeta`, `Staging`, `Repo Local`, `Remoto`) que enciende indicadores verdes o dorados segun el comando ejecutado.
  * Botones de escenario rapido (`Ciclo basico`, `Crear rama`, `Deshacer cambios`, `Ver log`) con coloreado de sintaxis tipo Zsh/Bash.

---

## 3. Arbol de Ramas y Merge vs Rebase
* **Componente**: `src/components/BranchVisualizer.astro`
* **Proposito**: Desmitificar la diferencia geometrica y filosofica entre `git merge` y `git rebase`.
* **Mecanica**:
  * Grafo visual de commits representados por nodos circulares.
  * Demostracion de Fast-Forward, 3-Way Merge Commit y Rebase lineal con reescritura de SHA hashes.

---

## 4. Resolvedor de Conflictos 3-Way Merge
* **Componente**: `src/components/ConflictResolver.astro`
* **Proposito**: Enseñar como interpretar y resolver los marcadores de conflicto de Git.
* **Mecanica**:
  * Escenarios reales (colision de estilos CSS, colision de endpoints en backend, colision de dependencias JSON).
  * Renderizado del editor simulado con los marcadores tipicos:
    * `<<<<<<< HEAD` (cambios en rama local)
    * `=======` (separador)
    * `>>>>>>> feature/login` (cambios entrantes)
  * Botones de accion para aplicar resolucion en un clic:
    * *Aceptar actuales* (conserva HEAD).
    * *Aceptar entrantes* (adopta la rama entrante).
    * *Aceptar ambos* (fusiona ambos bloques).
    * *Restablecer* (vuelve al estado conflictivo).
  * Muestra los pasos CLI obligatorios posteriores: `git add <archivo>` y `git commit`.

---

## 5. Simulador de Git Bisect (Busqueda Binaria)
* **Componente**: `src/components/GitBisectSimulator.astro`
* **Proposito**: Enseñar como encontrar commits defectuosos en O(log N) pasos mediante `git bisect`.
* **Mecanica**:
  * Tira de 8 commits (`C1` a `C8`). `C1` se define como estado *GOOD* y `C8` como *BAD*.
  * El usuario presiona *Iniciar Bisect*; el algoritmo calcula el punto medio (`Math.floor((low + high) / 2)`).
  * El usuario responde si la prueba en ese commit es buena (`GOOD`) o defectuosa (`BAD`).
  * El algoritmo acota el rango hasta identificar al commit culpable exacto (*The Culprit*), activando un banner rojo con advertencia y el comando final `git bisect reset`.

---

## 6. Estacion de Rescate Git SOS
* **Componente**: `src/components/GitRescueSection.astro`
* **Proposito**: Proveer una red de seguridad paso a paso cuando se comete un error grave.
* **Mecanica**:
  * Filtros por categoria: `Todos`, `Deshacer`, `Ramas`, `Recuperar`, `Commits`.
  * Escenarios de rescate reales: recuperar commits eliminados con `git reflog`, deshacer `git add .`, recuperar ramas borradas por error, arreglar commits con mensajes equivocados con `--amend`, y revertir commits publicos con `git revert`.

---

## 7. Flujos de Trabajo en Equipo
* **Componente**: `src/components/WorkflowsSection.astro`
* **Proposito**: Enseñar las metodologias estandar de la industria de software.
* **Mecanica**:
  * Guia paso a paso con stepper vertical numerado para:
    * **GitHub Flow** (ramas cortas `feature/`, Pull Requests, despliegue continuo).
    * **Git Flow** (`develop`, `release/`, `hotfix/`, `main`).
    * **Trunk-Based Development** (commits frecuentes a trunk con feature flags).

---

## 8. Comparativas Frente a Frente
* **Componente**: `src/components/ComparisonsSection.astro`
* **Proposito**: Resolver dudas frecuentes de desarrolladores sobre comandos con nombres similares.
* **Mecanica**:
  * Tarjetas de comparacion doble:
    * `git merge` vs `git rebase`
    * `git reset` vs `git revert`
    * `git switch` vs `git checkout`
    * `git fetch` vs `git pull`
  * Tabla de pros, contras, momento ideal de uso y regla mnemotecnica de oro.

---

## 9. Generadores Visuales
* **Componentes**:
  * `src/components/ConventionalCommitBuilder.astro`: Generador interactivo de mensajes siguiendo la especificacion Conventional Commits (`feat`, `fix`, `docs`, `refactor`, `chore`, `perf`, `test`) con seleccion de scope y checkbox de *Breaking Change*.
  * `src/components/CommandBuilder.astro`: Asistente para construccion de comandos de ramas y tags.
  * `src/components/GitignoreBuilder.astro`: Constructor de plantillas `.gitignore` con presets para Node.js, Python, Rust, Go y macOS/Windows.

---

## 10. Boveda de Aliases y ~/.gitconfig Pro
* **Componente**: `src/components/GitAliasesVault.astro`
* **Proposito**: Optimizar la velocidad de tipeo en terminal con configuraciones globales de alto rendimiento.
* **Mecanica**:
  * Catalogo de atajos probados en produccion: `git lg` (log en grafo coloreado), `git undo` (reset soft del ultimo commit), `git st` (status corto), `git cleanup` (eliminar ramas ya fusionadas).
  * Visor del archivo completo `~/.gitconfig` con banderas recomendadas (`rerere = true`, `pull.rebase = true`, `init.defaultBranch = main`).
  * Boton de copiado en un clic del comando directo `git config --global alias.<name> "<cmd>"`.

---

## 11. Git Hooks Hub
* **Componente**: `src/components/GitHooksHub.astro`
* **Proposito**: Explicar la defensa de calidad del codigo antes de que llegue al repositorio.
* **Mecanica**:
  * Desglose de hooks nativos (`pre-commit`, `commit-msg`, `pre-push`).
  * Guia de configuracion rapida con **Husky** (`npx husky init`).
  * Ejemplos de scripts bash defensivos para prevenir subida de credenciales (`.env`) o validar convenciones de formato.

---

## 12. Arquitectura Interna de Git (DAG y Plomeria)
* **Componente**: `src/components/GitInternals.astro`
* **Proposito**: Comprender que Git no es magia, sino un grafo aciclico dirigido (DAG) de almacenamiento direccionable por contenido.
* **Mecanica**:
  * Pestañas para inspeccionar los 4 tipos de objetos primitivos de Git:
    * `blob`: Contenido binario de un archivo identificado por su hash SHA-1.
    * `tree`: Representacion del directorio y punteros a blobs o sub-trees.
    * `commit`: Metadatos del autor, timestamp, mensaje y puntero al tree y commits padre.
    * `tag`: Referencia anotada inmutable a un commit especifico.
  * Demostracion de comandos de plomeria (`git cat-file -p`, `git cat-file -t`, `git hash-object`).

---

## 13. Glosario y Autoevaluacion Interactiva (Quiz)
* **Componentes**:
  * `src/components/GitGlossary.astro`: Diccionario de mas de 20 terminos tecnicos (HEAD, Detached HEAD, Fast-Forward, Cherry-pick, Reflog, Staging, Rebase, etc.) con filtros y comandos clave.
  * `src/components/GitQuiz.astro`: Cuestionario interactivo de 5 preguntas de nivel medio/avanzado con retroalimentacion inmediata, explicacion tecnica detallada de la respuesta correcta y contador dinamico de aciertos.
