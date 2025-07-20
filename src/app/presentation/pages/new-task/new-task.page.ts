import { Component } from '@angular/core';
import { Task } from '@core/domain';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  constructor(
    private fb: NonNullableFormBuilder,
    private appendTaskUseCase: AppendTaskUseCase
  ) {}

  private buildForm(): FormGroup<{ title: FormControl<string> }> {
    return this.fb.group({
      title: ['', Validators.required],
    });
  }

  async submitForm() {
    if (this.form.invalid) return;

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
