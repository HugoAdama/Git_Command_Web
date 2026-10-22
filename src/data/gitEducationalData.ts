import type {
  GitSosScenario,
  GitWorkflow,
  ComparisonItem,
  QuizQuestion,
  SimulatedCommand
} from '../types/educational';

export type {
  GitSosScenario,
  GitWorkflow,
  ComparisonItem,
  QuizQuestion,
  SimulatedCommand
};

export const gitSosScenarios: GitSosScenario[] = [
  {
    id: 'commit-wrong-branch',
    title: 'Hice commit en la rama incorrecta (ej. en main)',
    subtitle: 'Mover el último commit a una nueva rama sin perder nada',
    category: 'ramas',
    severity: 'media',
    problem: 'Trabajaste y ejecutaste git commit directamente en la rama principal en lugar de crear una rama secundaria.',
    solutionSummary: 'Creamos la rama correcta conservando el commit y luego retrocedemos main al estado previo.',
    steps: [
      {
        command: 'git branch mi-rama-correcta',
        explanation: 'Crea la rama deseada exactamente en el punto actual con tu último commit incluido.'
      },
      {
        command: 'git reset --hard HEAD~1',
        explanation: 'Retrocede la rama actual (main) un commit hacia atrás para dejarla limpia.'
      },
      {
        command: 'git switch mi-rama-correcta',
        explanation: 'Pasa a tu nueva rama donde tu commit sigue intacto y listo para continuar.'
      }
    ],
    tip: 'Si ya habías subido el commit al repositorio remoto, no uses reset --hard; recurre a git revert para crear un commit inverso seguro.'
  },
  {
    id: 'commit-wrong-message',
    title: 'Escribí mal el mensaje del commit o me faltó un archivo',
    subtitle: 'Corregir el commit más reciente de forma instantánea',
    category: 'commits',
    severity: 'baja',
    problem: 'Cometiste una errata en el texto del mensaje o te diste cuenta de que olvidaste incluir un archivo.',
    solutionSummary: 'Usa la bandera --amend para editar el último commit en vez de crear uno nuevo.',
    steps: [
      {
        command: 'git add archivo-olvidado.js',
        explanation: '(Opcional) Si te faltó un archivo, prepáralo primero con git add.'
      },
      {
        command: 'git commit --amend -m "feat: nuevo mensaje corregido"',
        explanation: 'Sobrescribe el mensaje y fusiona los archivos preparados en el commit previo sin duplicar historial.'
      }
    ],
    dangerNotice: 'Usa amend únicamente antes de haber hecho git push al servidor remoto.'
  },
  {
    id: 'committed-env-secret',
    title: 'Hice commit de contraseñas, claves API o un archivo .env',
    subtitle: 'Eliminar archivos sensibles antes de enviarlos a producción',
    category: 'archivos',
    severity: 'alta',
    problem: 'Por error agregaste credenciales privadas a tu repositorio local.',
    solutionSummary: 'Sacar el archivo del control de versiones y agregarlo a .gitignore de inmediato.',
    steps: [
      {
        command: 'git rm --cached .env',
        explanation: 'Elimina el archivo del índice de Git pero lo conserva físicamente en tu disco duro.'
      },
      {
        command: 'echo ".env" >> .gitignore',
        explanation: 'Agrega el archivo a .gitignore para que Git nunca más vuelva a rastrearlo.'
      },
      {
        command: 'git commit -m "fix: remover archivo sensible del control de versiones"',
        explanation: 'Registra el cambio para que el archivo ya no exista en el próximo push.'
      }
    ],
    dangerNotice: 'Si ya hiciste push a GitHub, la clave debe considerarse comprometida y debe ser revocada/regenerada inmediatamente en el proveedor.'
  },
  {
    id: 'need-to-switch-branch-dirty',
    title: 'Necesito cambiar de rama ya pero tengo cambios sin terminar',
    subtitle: 'Guardar temporalmente el trabajo en un escondite seguro',
    category: 'ramas',
    severity: 'baja',
    problem: 'Tu jefe o compañero te pide revisar algo urgente en otra rama, pero tu código actual no compila ni amerita un commit.',
    solutionSummary: 'Oculta tus cambios temporalmente en el cajón de stash y recupéralos cuando vuelvas.',
    steps: [
      {
        command: 'git stash',
        explanation: 'Limpia tu espacio de trabajo y guarda todas tus modificaciones en una pila temporal.'
      },
      {
        command: 'git switch otra-rama',
        explanation: 'Cambia de rama con el directorio totalmente limpio para realizar la tarea urgente.'
      },
      {
        command: 'git switch tu-rama',
        explanation: 'Vuelve a tu rama original cuando hayas finalizado la urgencia.'
      },
      {
        command: 'git stash pop',
        explanation: 'Restaura tus cambios pendientes exactamente como los tenías y vacía el cajón.'
      }
    ]
  },
  {
    id: 'merge-conflicts-abort',
    title: 'Tengo un conflicto de merge y quiero cancelar todo',
    subtitle: 'Volver al estado seguro antes de iniciar el merge',
    category: 'conflictos',
    severity: 'media',
    problem: 'Al ejecutar git merge o git pull aparecieron conflictos complicados y prefieres abortar para no romper nada.',
    solutionSummary: 'Usa la bandera --abort para detener la operación y dejar tu rama tal como estaba antes.',
    steps: [
      {
        command: 'git merge --abort',
        explanation: 'Cancela la fusión en curso y restaura tus archivos al estado previo al intento de mezcla.'
      },
      {
        command: 'git status',
        explanation: 'Verifica que tu árbol de trabajo ha vuelto a un estado completamente limpio.'
      }
    ],
    tip: 'Si el conflicto ocurrió durante un rebase, el comando equivalente es: git rebase --abort.'
  },
  {
    id: 'lost-commit-reflog',
    title: 'Borré una rama o perdí un commit valioso',
    subtitle: 'Rescatar código perdido con la bitácora universal de Git',
    category: 'commits',
    severity: 'alta',
    problem: 'Ejecutaste un reset agresivo o eliminaste una rama creyendo que no servía y perdiste tu trabajo.',
    solutionSummary: 'Git rara vez destruye información. Con git reflog puedes ver cada salto de HEAD y recuperar el hash.',
    steps: [
      {
        command: 'git reflog',
        explanation: 'Muestra un registro cronológico de todas las acciones recientes junto a sus identificadores hash.'
      },
      {
        command: 'git switch -c rama-recuperada <hash-encontrado>',
        explanation: 'Crea una nueva rama partiendo exactamente del commit antes de ser perdido.'
      }
    ],
    tip: 'Los commits huérfanos se conservan en Git habitualmente por al menos 30 días antes del recolector de basura.'
  }
];

export const gitWorkflows: GitWorkflow[] = [
  {
    id: 'wf-primer-repo',
    title: 'Tu primer proyecto en GitHub',
    badge: 'Principiante',
    description: 'Ruta completa para inicializar una carpeta local y publicarla en un repositorio remoto.',
    steps: [
      {
        stepNumber: 1,
        title: 'Inicializar el repositorio',
        description: 'Crea la estructura oculta .git dentro de tu carpeta actual.',
        command: 'git init',
        mentalModelNote: 'Transforma una carpeta ordinaria en un almacén con memoria temporal de cambios.'
      },
      {
        stepNumber: 2,
        title: 'Preparar todos los archivos iniciales',
        description: 'Mueve todos los archivos del proyecto al área de preparación.',
        command: 'git add .',
        mentalModelNote: 'Coloca tus archivos en la caja lista para ser precintada.'
      },
      {
        stepNumber: 3,
        title: 'Crear el primer commit (Snapshot)',
        description: 'Registra la versión inicial en el historial permanente de tu computadora.',
        command: 'git commit -m "feat: estructura inicial del proyecto"',
        mentalModelNote: 'Guarda una instantánea imborrable con fecha, autor y mensaje.'
      },
      {
        stepNumber: 4,
        title: 'Conectar tu computadora con GitHub',
        description: 'Asigna el alias "origin" a la dirección web de tu repositorio.',
        command: 'git remote add origin https://github.com/usuario/mi-proyecto.git',
        mentalModelNote: 'Crea un puente de comunicación hacia la nube.'
      },
      {
        stepNumber: 5,
        title: 'Publicar tus commits en la nube',
        description: 'Envía tu rama main y la deja vinculada para futuros push rápidos.',
        command: 'git push -u origin main',
        mentalModelNote: 'Sube la caja fuerte local al servidor remoto.'
      }
    ]
  },
  {
    id: 'wf-feature-branch',
    title: 'Flujo en equipo (Feature Branch Workflow)',
    badge: 'Colaboración',
    description: 'El estándar profesional utilizado por equipos en todo el mundo para trabajar en paralelo.',
    steps: [
      {
        stepNumber: 1,
        title: 'Asegurar sincronización de main',
        description: 'Descarga las últimas novedades aprobadas por tus compañeros.',
        command: 'git switch main && git pull',
        mentalModelNote: 'Garantiza que comienzas a trabajar sobre la versión más fresca posible.'
      },
      {
        stepNumber: 2,
        title: 'Crear una rama para tu tarea',
        description: 'Abre un carril separado con un nombre descriptivo.',
        command: 'git switch -c feat/autenticacion-google',
        mentalModelNote: 'Aisla tu código para que si algo se rompe, el proyecto principal permanezca intacto.'
      },
      {
        stepNumber: 3,
        title: 'Preparar y confirmar tus avances',
        description: 'Guarda pequeñas unidades atómicas de trabajo.',
        command: 'git add . && git commit -m "feat: agregar boton de login"',
        mentalModelNote: 'Crea puntos de control claros y legibles para tus compañeros.'
      },
      {
        stepNumber: 4,
        title: 'Publicar tu rama en el remoto',
        description: 'Sube tu rama a GitHub para crear el Pull Request / Merge Request.',
        command: 'git push -u origin feat/autenticacion-google',
        mentalModelNote: 'Comparte tu trabajo para revisión de código (Code Review) sin tocar main.'
      }
    ]
  },
  {
    id: 'wf-resolve-conflict',
    title: 'Resolución de conflictos de fusión',
    badge: 'Esencial',
    description: 'Aprende a identificar, resolver y confirmar cambios cuando dos personas editan las mismas líneas.',
    steps: [
      {
        stepNumber: 1,
        title: 'Descubrir qué archivos chocaron',
        description: 'Git te avisará y marcará los archivos con colisión.',
        command: 'git status',
        mentalModelNote: 'Los archivos con conflicto aparecerán listados bajo "both modified".'
      },
      {
        stepNumber: 2,
        title: 'Inspeccionar los marcadores en el código',
        description: 'Abre el archivo en tu editor de código para elegir la versión correcta.',
        command: 'git diff',
        mentalModelNote: '<<<<<<< HEAD muestra lo que tienes tú. >>>>>>> muestra lo que viene de la otra rama.'
      },
      {
        stepNumber: 3,
        title: 'Limpiar y marcar el conflicto como resuelto',
        description: 'Borra los marcadores y añade el archivo resuelto al área de preparación.',
        command: 'git add archivo-arreglado.js',
        mentalModelNote: 'Hacer add en un archivo en conflicto le indica a Git que ya está resuelto.'
      },
      {
        stepNumber: 4,
        title: 'Cerrar la fusión de forma limpia',
        description: 'Completa el commit de merge para continuar.',
        command: 'git commit -m "merge: resolver conflicto en archivo-arreglado.js"',
        mentalModelNote: 'Sella la unión armónica entre ambos desarrollos.'
      }
    ]
  }
];

export const gitComparisons: ComparisonItem[] = [
  {
    id: 'fetch-vs-pull',
    title: 'git fetch vs git pull',
    commandA: {
      name: 'git fetch',
      description: 'Descarga referencias, ramas y commits del servidor remoto SIN modificar tus archivos locales.',
      whenToUse: 'Siempre que quieras curiosear qué hicieron tus compañeros sin alterar tu carpeta de trabajo.',
      pros: [
        '100% seguro: nunca genera conflictos en tus archivos',
        'Permite revisar con git diff origin/main antes de aplicar',
        'No altera tu rama actual'
      ],
      cons: [
        'Requiere un paso adicional (merge o rebase) para aplicar los cambios'
      ]
    },
    commandB: {
      name: 'git pull',
      description: 'Equivale a ejecutar "git fetch" seguido automáticamente de "git merge".',
      whenToUse: 'Cuando sabes con certeza que quieres incorporar los cambios remotos de inmediato.',
      pros: [
        'Rápido y conveniente en un solo comando',
        'Mantiene tu rama al día en un segundo'
      ],
      cons: [
        'Puede detonar conflictos de merge sorpresa en tu pantalla',
        'Puede crear commits de mezcla innecesarios si no usas --rebase'
      ]
    },
    keyTakeaway: 'Regla de oro: si tienes dudas o cambios a medias, usa fetch primero; si estás limpio y listo, usa pull.'
  },
  {
    id: 'merge-vs-rebase',
    title: 'git merge vs git rebase',
    commandA: {
      name: 'git merge',
      description: 'Crea un commit especial con dos padres que une dos líneas de tiempo preservando la historia exacta.',
      whenToUse: 'En ramas públicas y compartidas como main o desarrollo en equipo.',
      pros: [
        'No reescribe el historial pasado',
        'Registra exactamente cuándo y cómo se produjo la integración',
        'Operación no destructiva y reversible'
      ],
      cons: [
        'Genera un historial con forma de trenza si hay muchas ramas',
        'Crea commits de merge que pueden considerarse ruidosos'
      ]
    },
    commandB: {
      name: 'git rebase',
      description: 'Corta tus commits locales y los vuelve a pegar uno a uno encima de la punta más reciente de la otra rama.',
      whenToUse: 'En tus ramas personales antes de abrir un Pull Request para mantener un historial lineal y limpio.',
      pros: [
        'Historial 100% recto y limpio, fácil de leer con git log',
        'Elimina commits de unión innecesarios',
        'Facilita el uso de git bisect para rastrear errores'
      ],
      cons: [
        'Reescribe los identificadores hash de los commits',
        'Peligroso si se aplica sobre ramas que otros ya clonaron'
      ]
    },
    keyTakeaway: 'Regla de oro: Nunca hagas rebase sobre una rama pública compartida por otros desarrolladores.'
  },
  {
    id: 'restore-vs-reset-vs-revert',
    title: 'git restore vs git reset vs git revert',
    commandA: {
      name: 'git restore / git reset',
      description: 'Modifican archivos locales o mueven el puntero HEAD hacia atrás en el historial de tu máquina.',
      whenToUse: 'Antes de subir cambios al remoto. Para descartar cambios en progreso o sacar archivos de staging.',
      pros: [
        'git restore es la herramienta moderna y limpia para archivos',
        'git reset --soft permite rehacer un commit con cambios intactos'
      ],
      cons: [
        'git reset --hard es destructivo y puede eliminar cambios no guardados',
        'No se debe usar en ramas ya enviadas al servidor remoto'
      ]
    },
    commandB: {
      name: 'git revert',
      description: 'Crea un NUEVO commit que aplica exactamente los cambios matemáticamente opuestos al commit que deseas anular.',
      whenToUse: 'Siempre que un cambio ya haya llegado a la rama principal en GitHub o producción.',
      pros: [
        'Completamente seguro para ramas compartidas',
        'No reescribe el pasado; agrega un nuevo registro transparente',
        'Fácil de auditar en revisiones de seguridad'
      ],
      cons: [
        'Aumenta el número de commits en el historial'
      ]
    },
    keyTakeaway: 'Local y no subido: usa restore o reset. Ya subido a GitHub: usa revert.'
  },
  {
    id: 'switch-vs-checkout',
    title: 'git switch vs git checkout',
    commandA: {
      name: 'git switch',
      description: 'Comando moderno (Git 2.23+) diseñado con un único propósito: cambiar o crear ramas.',
      whenToUse: 'Siempre que vayas a moverte de rama o crear una nueva con la opción -c.',
      pros: [
        'Sintaxis intuitiva y sin ambigüedades',
        'No hay riesgo de sobreescribir archivos por error accidental'
      ],
      cons: [
        'Solo maneja ramas (las tareas de archivos pasaron a git restore)'
      ]
    },
    commandB: {
      name: 'git checkout',
      description: 'Comando histórico multipropósito que servía tanto para cambiar ramas como para descartar cambios en archivos.',
      whenToUse: 'En tutoriales antiguos o proyectos con versiones muy viejas de Git.',
      pros: [
        'Ampliamente conocido en StackOverflow'
      ],
      cons: [
        'Sintaxis confusa: un descuido en un argumento podía borrar un archivo en vez de cambiar de rama',
        'Desaconsejado por el equipo oficial de desarrollo de Git en código moderno'
      ]
    },
    keyTakeaway: 'Usa git switch para ramas y git restore para archivos. Olvídate de checkout.'
  }
];

export const gitQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    scenario: 'Hiciste modificaciones en "estilos.css" y ejecutaste "git add estilos.css", pero te diste cuenta de que aún no quieres incluirlo en el próximo commit.',
    question: '¿Qué comando moderno te permite sacar "estilos.css" del área de preparación sin perder tu código escrito?',
    options: [
      {
        label: 'git restore --staged estilos.css',
        isCorrect: true,
        explanation: 'Correcto: "git restore --staged" saca el archivo del área de preparación (índice) manteniendo todas tus líneas de código intactas en tu carpeta de trabajo.'
      },
      {
        label: 'git rm estilos.css',
        isCorrect: false,
        explanation: 'Incorrecto: "git rm" eliminaría el archivo del repositorio y de tu disco duro.'
      },
      {
        label: 'git reset --hard',
        isCorrect: false,
        explanation: 'Peligro: "git reset --hard" destruiría tus cambios no guardados.'
      },
      {
        label: 'git revert estilos.css',
        isCorrect: false,
        explanation: 'Incorrecto: "git revert" se usa sobre hashes de commits confirmados, no sobre archivos en preparación.'
      }
    ]
  },
  {
    id: 2,
    scenario: 'Quieres crear una rama llamada "feat/perfil" y trasladarte a ella inmediatamente en un solo paso con la sintaxis moderna de Git.',
    question: '¿Cuál es el comando recomendado por la documentación actual de Git?',
    options: [
      {
        label: 'git switch -c feat/perfil',
        isCorrect: true,
        explanation: 'Excelente: "git switch -c" (o --create) es el estándar moderno adoptado para crear y posicionarte en una nueva rama sin la ambigüedad del antiguo checkout.'
      },
      {
        label: 'git branch feat/perfil -c',
        isCorrect: false,
        explanation: 'Incorrecto: "git branch" crea la rama pero no te traslada a ella.'
      },
      {
        label: 'git merge -c feat/perfil',
        isCorrect: false,
        explanation: 'Incorrecto: "git merge" sirve para fusionar ramas existentes.'
      },
      {
        label: 'git new branch feat/perfil',
        isCorrect: false,
        explanation: 'Incorrecto: Ese comando no existe en la sintaxis de Git.'
      }
    ]
  },
  {
    id: 3,
    scenario: 'Subiste un commit erróneo a la rama "main" en GitHub que ya fue descargado por varios compañeros de equipo.',
    question: '¿Cuál es la estrategia más segura para deshacer ese commit en un repositorio compartido?',
    options: [
      {
        label: 'git revert <hash-del-commit>',
        isCorrect: true,
        explanation: 'Exacto: "git revert" crea un commit nuevo que invierte los cambios del commit erróneo. Al no reescribir la historia pasada, no causa conflictos a tus compañeros.'
      },
      {
        label: 'git reset --hard HEAD~1 && git push -f',
        isCorrect: false,
        explanation: 'Peligroso: Hacer push forzado en una rama compartida reescribe el historial y romperá el trabajo de tus compañeros.'
      },
      {
        label: 'git stash drop',
        isCorrect: false,
        explanation: 'Incorrecto: "git stash drop" solo elimina entradas del cajón temporal de stash local.'
      },
      {
        label: 'git restore --all',
        isCorrect: false,
        explanation: 'Incorrecto: "git restore" solo afecta tus archivos locales sin confirmar, no los commits remotos.'
      }
    ]
  },
  {
    id: 4,
    scenario: 'Quieres inspeccionar qué cambios han subido tus compañeros a GitHub antes de decidir si los fusionas o no en tu código.',
    question: '¿Qué comando descarga la información remota sin tocar ni alterar tus archivos locales?',
    options: [
      {
        label: 'git fetch',
        isCorrect: true,
        explanation: 'Muy bien: "git fetch" descarga todas las referencias y commits nuevos del servidor remoto, pero deja tus archivos locales y tu rama actual 100% intactos.'
      },
      {
        label: 'git pull',
        isCorrect: false,
        explanation: 'No: "git pull" intenta unir (merge) los cambios de inmediato, lo que podría generar conflictos inesperados.'
      },
      {
        label: 'git checkout origin/main',
        isCorrect: false,
        explanation: 'Te colocaría en estado "detached HEAD", pero primero necesitas haber hecho fetch para conocer los cambios nuevos.'
      },
      {
        label: 'git clone',
        isCorrect: false,
        explanation: '"git clone" solo se usa para descargar un repositorio nuevo desde cero en una carpeta vacía.'
      }
    ]
  },
  {
    id: 5,
    scenario: 'Acabas de hacer un commit local pero olvidaste agregar una pequeña modificación en un archivo antes de subirlo.',
    question: '¿Qué opción te permite incorporar ese cambio al último commit sin generar un commit duplicado?',
    options: [
      {
        label: 'git add . && git commit --amend --no-edit',
        isCorrect: true,
        explanation: 'Perfecto: Preparas los cambios con "git add" y con "git commit --amend --no-edit" los fusionas limpiamente en el último commit conservando el mismo mensaje.'
      },
      {
        label: 'git commit -m "fix"',
        isCorrect: false,
        explanation: 'Crearía un nuevo commit innecesario ensuciando el historial.'
      },
      {
        label: 'git reset --hard',
        isCorrect: false,
        explanation: 'Destruiría la modificación que querías incorporar.'
      },
      {
        label: 'git push --force',
        isCorrect: false,
        explanation: 'No agrega la modificación pendiente, solo fuerza el push de lo que ya tenías.'
      }
    ]
  }
];

export const terminalMockData: SimulatedCommand[] = [
  {
    cmd: 'git status',
    label: 'Estado inicial',
    stageActive: 0,
    output: `On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/app.js
	modified:   public/styles.css

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	src/auth.js

no changes added to commit (use "git add" to track)`
  },
  {
    cmd: 'git add .',
    label: 'Preparar archivos',
    stageActive: 1,
    output: `On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   src/app.js
	modified:   public/styles.css
	new file:   src/auth.js`
  },
  {
    cmd: 'git commit -m "feat: login con autenticacion"',
    label: 'Confirmar commit',
    stageActive: 2,
    output: `[main 9d4f1a2] feat: login con autenticacion
 3 files changed, 48 insertions(+), 6 deletions(-)
 create mode 100644 src/auth.js`
  },
  {
    cmd: 'git push origin main',
    label: 'Enviar al remoto',
    stageActive: 3,
    output: `Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 624 bytes | 624.00 KiB/s, done.
Total 4 (delta 2), reused 0 (delta 0), pack-reused 0
To https://github.com/developer/git-command-web.git
   b23f81e..9d4f1a2  main -> main`
  },
  {
    cmd: 'git log --oneline --graph',
    label: 'Ver historial',
    stageActive: 2,
    output: `* 9d4f1a2 (HEAD -> main, origin/main) feat: login con autenticacion
* b23f81e fix: corregir responsive en moviles
* 3a089f1 feat: estructura inicial del proyecto`
  }
];
