import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButtonComponent } from './icon-button.component';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply "no-justify" class when isCategoryFilterEnabled is false', () => {
    component.isCategoryFilterEnabled = false;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button.classes['no-justify']).toBeTrue();
  });

  it('should NOT apply "no-justify" class when isCategoryFilterEnabled is true', () => {
    component.isCategoryFilterEnabled = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button.classes['no-justify']).toBeFalsy();
  });

  it('should disable the button when "disabled" is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should emit "clicked" event when button is clicked', () => {
    spyOn(component.clicked, 'emit');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('ion-button'));
    button.triggerEventHandler('click');

    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
