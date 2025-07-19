import { Component, signal } from '@angular/core';
import { GetTodosUseCase, Todo } from '@core/domain';
import { IonicModule } from '@ionic/angular';
import { TaskItemComponent } from '../../components/ui/molecules/task-item/task-item.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {}
