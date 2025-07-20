export const NewTaskConfig = Object.freeze({
  headers: {
    create: 'Crear Tareas',
    edit: 'Editar Tarea',
  },
  titles: {
    task: 'Escribe un nombre para la tarea',
    categories: 'Elige tus categorias',
  },
  taskControl: {
    formControlName: 'title',
    label: 'Titulo',
    placeholder: 'Ej.: Revisar Emails',
  },
  checkbox: {
    slot: 'start',
  },
  button: {
    type: 'submit',
    expand: 'block',
    text: 'Guardar',
  },
  emptyCategories: {
    description:
      ' Aún no tienes categorías. Crea una para ayudarte a organizar mejor tus tareas',
  },
});
