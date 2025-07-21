import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent, IonicModule.forRoot()],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display default text "Guardar"', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button.nativeElement.textContent.trim()).toBe('Guardar');
  });

  it('should render input text', () => {
    component.text = 'Crear';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button.nativeElement.textContent.trim()).toBe('Crear');
  });

  it('should bind the "disabled" input', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should bind the "type" input', () => {
    component.type = 'button';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button.attributes['ng-reflect-type']).toBe('button');
  });

  it('should bind the "expand" input', () => {
    component.expand = 'full';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button.attributes['ng-reflect-expand']).toBe('full');
  });
});
