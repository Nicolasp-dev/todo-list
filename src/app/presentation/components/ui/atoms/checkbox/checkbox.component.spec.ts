import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxComponent>;
  let component: CheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect the checked signal value', () => {
    component.checked = true;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('ion-checkbox'));
    expect(checkbox.attributes['ng-reflect-checked']).toBe('true');
  });

  it('should emit checkedChange event when ionChange is triggered', () => {
    spyOn(component.checkedChange, 'emit');
    component.checked = false;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('ion-checkbox'));
    checkbox.triggerEventHandler('ionChange', { detail: { checked: true } });

    expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
  });
});
