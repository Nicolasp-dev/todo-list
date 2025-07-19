import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.taskForm.valid) {
      const task = {
        ...this.taskForm.value,
        completed: false,
      };
      console.log('Nueva tarea:', task);
    }
  }
}
