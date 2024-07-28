import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { By } from '@angular/platform-browser';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the toast message', () => {
    const testMessage = 'Test message';
    component.toastData = { message: testMessage, duration: 3000, type: 'success' };
    fixture.detectChanges();

    const toastElement = fixture.debugElement.query(By.css('.toast'));
    expect(toastElement.nativeElement.textContent).toContain(testMessage);
  });

  it('should apply the correct class based on type', () => {
    component.toastData = { message: 'Test message', duration: 3000, type: 'error' };
    fixture.detectChanges();

    const toastElement = fixture.debugElement.query(By.css('.toast'));
    expect(toastElement.classes['error']).toBeTrue();
  });

  it('should be visible initially and then hide after duration', fakeAsync(() => {
    component.toastData = { message: 'Test message', duration: 3000, type: 'success' };
    fixture.detectChanges();

    expect(component.visible).toBeTrue();

    tick(3000);
    fixture.detectChanges();

    expect(component.visible).toBeFalse();
  }));

  it('should hide the toast after default duration if duration is not provided', fakeAsync(() => {
    component.toastData = { message: 'Test message', duration: undefined as any, type: 'success' };
    fixture.detectChanges();

    expect(component.visible).toBeTrue();

    tick(3000);
    fixture.detectChanges();

    expect(component.visible).toBeFalse();
  }));
});
