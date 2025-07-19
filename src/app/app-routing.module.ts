import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./presentation/pages/home/home.page').then((m) => m.HomePage),
    children: [
      {
        path: 'tasks',
        loadComponent: () =>
          import('./presentation/pages/tasks/tasks.page').then(
            (m) => m.TasksPage
          ),
      },
      {
        path: 'new-task',
        loadComponent: () =>
          import('./presentation/pages/new-task/new-task.page').then(
            (m) => m.NewTaskPage
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
