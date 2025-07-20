import { Component, Input } from '@angular/core';
import { Task } from '@core/domain';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppendTaskUseCase } from '@core/domain/use-cases/tasks/append-task.use-case';

interface TaskFormValue {
  title: string;
}

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage {
  form = this.buildForm();
  public header: string = '';
  @Input() task!: Task;

  constructor(
    private fb: NonNullableFormBuilder,
    private appendTaskUseCase: AppendTaskUseCase,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.header = this.task ? 'Editar Tarea' : 'Creat Tarea';

    if (this.task) {
      console.log(this.task);
      this.form.patchValue({ title: this.task.title });
    }
  }

  private buildForm(): FormGroup<{ title: FormControl<string> }> {
    return this.fb.group({
      title: ['', Validators.required],
    });
  }

  async submitForm() {
    if (this.form.invalid) return;

    const title = this.form.getRawValue().title;

    if (this.task) {
      this.modalCtrl.dismiss({ ...this.task, title });
      return;
    }

    const task = this.buildTaks(this.form.getRawValue());
    await this.appendTaskUseCase.execute(task);
    this.form.reset();
  }

  private buildTaks(form: TaskFormValue): Task {
    return {
      id: Math.random(),
      completed: false,
      title: form.title,
    };
  }
}
