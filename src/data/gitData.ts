import type { GitCommand, GitStage, GitHop, GitTopic } from '../types/git';

export type { GitCommand, GitStage, GitHop, GitTopic };

export const gitStages: GitStage[] = [
  {
    id: 'working-tree',
    title: 'Carpeta de trabajo',
    subtitle: 'Tus archivos locales',
    icon: 'folder'
  },
  {
    id: 'staging-area',
    title: 'Área de preparación',
    subtitle: 'Lo que irá en el commit (Index)',
    icon: 'check-square'
  },
  {
    id: 'local-repo',
    title: 'Repositorio local',
    subtitle: 'Tu historial (.git)',
    icon: 'git-commit'
  },
  {
    id: 'remote-repo',
    title: 'Remoto',
    subtitle: 'GitHub, GitLab o servidor',
    icon: 'cloud'
  }
];

export const gitHops: GitHop[] = [
  {
    id: 'add',
    command: 'git add',
    title: 'Preparar cambios',
    description: 'De la carpeta de trabajo al área de preparación (Staging Area).',
    fromIndex: 0,
    toIndex: 1,
    commands: [
      {
        command: 'git status',
        description: 'Muestra el estado de los archivos modificados y sin seguimiento',
        detail: 'Úsalo antes de agregar archivos para verificar qué ha cambiado exactamente.',
        tag: 'habitual'
      },
      {
        command: 'git diff',
        description: 'Muestra línea por línea los cambios aún no preparados',
        detail: 'Compara tu carpeta de trabajo contra el área de preparación.',
        tag: 'habitual'
      },
      {
        command: 'git add <archivo>',
        description: 'Prepara un archivo específico para el próximo commit',
        detail: 'Ejemplo: git add index.html estilos.css',
        tag: 'básico'
      },
      {
        command: 'git add .',
        description: 'Prepara todos los cambios en el directorio actual y subdirectorios',
        detail: 'Incluye modificaciones, creaciones y eliminaciones.',
        tag: 'básico'
      },
      {
        command: 'git add -p',
        description: 'Modo interactivo: permite revisar y preparar fragmento por fragmento',
        detail: 'Ideal para commits limpios con cambios específicos por partes.',
        tag: 'avanzado'
      }
    ]
  },
  {
    id: 'commit',
    command: 'git commit',
    title: 'Guardar en el historial',
    description: 'Del área de preparación al repositorio local como una instantánea permanente.',
    fromIndex: 1,
    toIndex: 2,
    commands: [
      {
        command: 'git commit -m "feat: mensaje claro"',
        description: 'Crea un nuevo commit con un mensaje descriptivo',
        detail: 'Sigue convenciones como Conventional Commits (feat, fix, docs, refactor).',
        tag: 'básico'
      },
      {
        command: 'git commit -am "mensaje"',
        description: 'Prepara archivos rastreados y hace el commit en un solo paso',
        detail: 'No incluye archivos nuevos que nunca han sido rastreados por Git.',
        tag: 'habitual'
      },
      {
        command: 'git commit --amend',
        description: 'Modifica el último commit (agrega cambios o corrige el mensaje)',
        detail: 'Úsalo solo antes de haber subido el commit al repositorio remoto.',
        tag: 'avanzado'
      },
      {
        command: 'git log --oneline --graph --decorate',
        description: 'Visualiza el historial de commits en un gráfico de una línea',
        detail: 'Excelente para entender la bifurcación y unión de ramas.',
        tag: 'habitual'
      }
    ]
  },
  {
    id: 'push',
    command: 'git push',
    title: 'Subir al remoto',
    description: 'Transfiere tus commits locales a un servidor remoto como GitHub o GitLab.',
    fromIndex: 2,
    toIndex: 3,
    commands: [
      {
        command: 'git remote add origin <url>',
        description: 'Conecta el repositorio local con un repositorio remoto',
        detail: 'Ejemplo: git remote add origin https://github.com/usuario/repo.git',
        tag: 'básico'
      },
      {
        command: 'git push -u origin main',
        description: 'Sube tus commits por primera vez y asocia la rama local con la remota',
        detail: 'La bandera -u (upstream) te permite usar simplemente "git push" después.',
        tag: 'básico'
      },
      {
        command: 'git push',
        description: 'Sube los commits nuevos a la rama remota vinculada',
        detail: 'Asegúrate de que tus cambios locales estén sincronizados primero.',
        tag: 'habitual'
      },
      {
        command: 'git push origin --delete <nombre-rama>',
        description: 'Elimina una rama remota en el servidor',
        detail: 'Útil para limpiar ramas de características ya fusionadas en producción.',
        tag: 'avanzado'
      }
    ]
  },
  {
    id: 'pull',
    command: 'git pull',
    title: 'Traer del remoto',
    description: 'Descarga los cambios de GitHub y los fusiona directamente en tu carpeta de trabajo.',
    fromIndex: 3,
    toIndex: 0,
    isReverse: true,
    commands: [
      {
        command: 'git pull',
        description: 'Descarga y fusiona los cambios remotos en tu rama actual',
        detail: 'Equivale a ejecutar "git fetch" seguido de "git merge".',
        tag: 'básico'
      },
      {
        command: 'git pull --rebase',
        description: 'Aplica tus commits locales por encima de los cambios remotos',
        detail: 'Evita commits de unión innecesarios y mantiene un historial lineal.',
        tag: 'habitual'
      },
      {
        command: 'git fetch',
        description: 'Descarga referencias e historiales remotos sin modificar tus archivos',
        detail: 'Permite inspeccionar lo nuevo con "git status" o "git diff origin/main".',
        tag: 'habitual'
      },
      {
        command: 'git clone <url>',
        description: 'Clona un repositorio remoto completo en una nueva carpeta local',
        detail: 'Descarga todas las ramas, etiquetas y el historial completo del proyecto.',
        tag: 'básico'
      }
    ]
  }
];

export const gitTopics: GitTopic[] = [
  {
    id: 'empezar',
    title: 'Empezar',
    badge: 'Inicio',
    description: 'Configuración inicial de Git y creación del primer repositorio.',
    commands: [
      {
        command: 'git config --global user.name "Tu Nombre"',
        description: 'Define tu nombre para que aparezca como autor en los commits',
        detail: 'Se guarda en ~/.gitconfig y aplica a todos tus repositorios.',
        tag: 'básico'
      },
      {
        command: 'git config --global user.email "tu@correo.com"',
        description: 'Define tu correo electrónico vinculado a tu cuenta de GitHub',
        detail: 'Usa el mismo correo con el que te diste de alta en tu plataforma Git.',
        tag: 'básico'
      },
      {
        command: 'git config --global init.defaultBranch main',
        description: 'Configura "main" como el nombre por defecto de la rama principal',
        detail: 'Estándar moderno adoptado por Git, GitHub y GitLab.',
        tag: 'habitual'
      },
      {
        command: 'git config --list',
        description: 'Muestra todas las variables de configuración activas',
        detail: 'Agrega --show-origin para saber en qué archivo está cada configuración.',
        tag: 'habitual'
      },
      {
        command: 'git init',
        description: 'Inicializa un repositorio Git vacío en el directorio actual',
        detail: 'Crea la carpeta oculta .git donde se almacena todo el control de versiones.',
        tag: 'básico'
      }
    ]
  },
  {
    id: 'ramas',
    title: 'Ramas',
    badge: 'Flujo',
    description: 'Crea líneas de desarrollo paralelas sin alterar la rama principal.',
    commands: [
      {
        command: 'git branch',
        description: 'Lista todas las ramas locales (la activa aparece con un asterisco)',
        detail: 'Usa "git branch -a" para listar también las ramas remotas.',
        tag: 'básico'
      },
      {
        command: 'git switch -c <nueva-rama>',
        description: 'Crea una nueva rama y se traslada inmediatamente a ella',
        detail: 'Sintaxis moderna recomendada en lugar de "git checkout -b".',
        tag: 'básico'
      },
      {
        command: 'git switch <rama>',
        description: 'Cambia a una rama existente',
        detail: 'Sintaxis moderna y segura que reemplaza "git checkout <rama>".',
        tag: 'básico'
      },
      {
        command: 'git merge <rama>',
        description: 'Fusiona la rama indicada dentro de la rama en la que te encuentras',
        detail: 'Por ejemplo, ubicado en "main", ejecuta "git merge feat-login".',
        tag: 'habitual'
      },
      {
        command: 'git branch -d <rama>',
        description: 'Elimina una rama local que ya ha sido fusionada',
        detail: 'Usa -D (mayúscula) para forzar la eliminación si la rama no se ha fusionado.',
        tag: 'habitual'
      }
    ]
  },
  {
    id: 'deshacer',
    title: 'Deshacer',
    badge: 'Recuperar',
    description: 'Estrategias seguras y eficaces para corregir errores en cada fase.',
    commands: [
      {
        command: 'git restore <archivo>',
        description: 'Descarta los cambios locales en un archivo no preparado',
        detail: 'Devuelve el archivo al estado del último commit registrado.',
        tag: 'cuidado'
      },
      {
        command: 'git restore --staged <archivo>',
        description: 'Saca un archivo del área de preparación sin perder sus cambios',
        detail: 'Reemplaza el antiguo y confuso "git reset HEAD <archivo>".',
        tag: 'habitual'
      },
      {
        command: 'git reset --soft HEAD~1',
        description: 'Deshace el último commit conservando todos los cambios preparados',
        detail: 'Ideal para rehacer un commit con un mejor mensaje o cambios extra.',
        tag: 'avanzado'
      },
      {
        command: 'git reset --hard HEAD~1',
        description: 'Deshace el último commit y elimina por completo los cambios',
        detail: 'Peligro: Esta acción destruye los cambios no guardados.',
        tag: 'cuidado'
      },
      {
        command: 'git revert <hash-commit>',
        description: 'Crea un nuevo commit que invierte de forma segura los cambios de uno previo',
        detail: 'Es la manera recomendada y segura de revertir commits ya subidos al remoto.',
        tag: 'habitual'
      },
      {
        command: 'git stash',
        description: 'Guarda temporalmente cambios sucios para limpiar el espacio de trabajo',
        detail: 'Permite cambiar de rama rápidamente sin perder tu trabajo pendiente.',
        tag: 'básico'
      },
      {
        command: 'git stash pop',
        description: 'Restaura y elimina del almacén los últimos cambios guardados con stash',
        detail: 'Vuelve a aplicar tu trabajo exactamente donde lo dejaste.',
        tag: 'básico'
      }
    ]
  }
];
