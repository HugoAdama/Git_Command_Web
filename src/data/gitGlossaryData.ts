import type { GlossaryTerm } from '../types/glossary';

export type { GlossaryTerm };

export const gitGlossaryTerms: GlossaryTerm[] = [
  {
    id: 'head',
    term: 'HEAD',
    category: 'punteros',
    metaphor: 'Es el marcador de lectura que indica en qué página exacta del libro te encuentras leyendo en este momento.',
    definition: 'Puntero simbólico que hace referencia al commit más reciente en la rama actualmente seleccionada.',
    sampleCommand: 'git show HEAD'
  },
  {
    id: 'detached-head',
    term: 'Detached HEAD (HEAD desacoplado)',
    category: 'punteros',
    metaphor: 'Es como si sacaras el marcapáginas del libro y lo dejaras flotando en una página antigua sin nombre de capítulo.',
    definition: 'Estado en el que HEAD apunta directamente a un commit específico en lugar de apuntar a una rama con nombre. Cualquier commit nuevo se perderá si cambias de rama sin crear una nueva.',
    sampleCommand: 'git switch -c rescatar-cambios'
  },
  {
    id: 'origin-upstream',
    term: 'Origin & Upstream',
    category: 'remotos',
    metaphor: '"Origin" es tu casa en la nube (tu copia personal de GitHub); "Upstream" es la casa matriz de donde hiciste el fork original.',
    definition: '"origin" es el alias asignado por defecto al repositorio remoto que clonaste. "upstream" suele ser el alias del proyecto principal original cuando colaboras en proyectos de código abierto.',
    sampleCommand: 'git remote -v'
  },
  {
    id: 'commit-hash',
    term: 'Commit Hash (SHA-1 / SHA-256)',
    category: 'estructuras',
    metaphor: 'Es como el documento de identidad o la huella digital matemática irrepetible de una versión.',
    definition: 'Cadena alfanumérica de 40 caracteres (o abreviada a 7) que identifica de manera única e inmutable una instantánea en el tiempo, basada en el contenido, autor y fecha.',
    sampleCommand: 'git log --oneline'
  },
  {
    id: 'working-tree',
    term: 'Working Tree (Árbol de trabajo)',
    category: 'estructuras',
    metaphor: 'Es tu mesa de carpintería: donde están las tablas y clavos físicos que puedes tocar y modificar libremente.',
    definition: 'El conjunto de archivos y carpetas reales desempacados en tu sistema de archivos en los que estás trabajando actualmente.',
    sampleCommand: 'git status'
  },
  {
    id: 'staging-index',
    term: 'Staging Area (Índice o Index)',
    category: 'estructuras',
    metaphor: 'Es la caja de mudanza antes de precintar con cinta adhesiva: eliges exactamente qué objetos van dentro antes de sellarla.',
    definition: 'Capa intermedia donde se preparan y formatean selectivamente los cambios que formarán parte del próximo commit.',
    sampleCommand: 'git add <archivo>'
  },
  {
    id: 'fast-forward',
    term: 'Fast-Forward (Avance rápido)',
    category: 'operaciones',
    metaphor: 'Como adelantar una película: la historia no se dividió en dos caminos, simplemente te trasladas a donde ya avanzó el otro.',
    definition: 'Tipo de fusión en la que la rama destino no tiene commits nuevos propios, permitiendo a Git mover el puntero hacia adelante sin necesidad de crear un commit de mezcla.',
    sampleCommand: 'git merge --ff-only'
  },
  {
    id: 'cherry-pick',
    term: 'Cherry-Pick (Cosecha selectiva)',
    category: 'operaciones',
    metaphor: 'Es como tomar una sola cereza de un árbol ajeno sin tener que arrancar todas las ramas enteras.',
    definition: 'Comando que copia y aplica selectivamente los cambios de un commit específico de cualquier rama dentro de tu rama actual.',
    sampleCommand: 'git cherry-pick <hash-del-commit>'
  },
  {
    id: 'squash',
    term: 'Squash (Aplastamiento / Fusión de commits)',
    category: 'operaciones',
    metaphor: 'Tomar 10 notas sucias de papel con borradores y redactar un único informe final limpio y conciso.',
    definition: 'Proceso de combinar múltiples commits pequeños o de depuración en un solo commit significativo antes de fusionarlo en la rama principal.',
    sampleCommand: 'git merge --squash <rama>'
  },
  {
    id: 'reflog',
    term: 'Reflog (Registro de referencias)',
    category: 'punteros',
    metaphor: 'La caja negra o grabadora de vuelo de Git: registra cada uno de los movimientos que hiciste en tu máquina.',
    definition: 'Bitácora local que almacena cronológicamente todos los cambios de posición del puntero HEAD, permitiendo recuperar ramas o commits aparentemente eliminados.',
    sampleCommand: 'git reflog'
  }
];
