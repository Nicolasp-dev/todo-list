export const TasksPageConfig = Object.freeze({
  header: 'Mis tareas',
  searchBar: {
    icon: {
      name: 'search',
      slot: 'start',
    },
    input: {
      type: 'text',
      placeholder: 'Buscar por categoría...',
    },
  },
  emptyTasks: {
    description: 'Empieza a organizar tu día creando tu primera tarea',
  },
});
