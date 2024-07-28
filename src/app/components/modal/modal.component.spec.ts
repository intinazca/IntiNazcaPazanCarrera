import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit false when cancel button is clicked', () => {
    spyOn(component.result, 'emit');

    const cancelButton = fixture.debugElement.query(By.css('button:first-child')).nativeElement;
    cancelButton.click();

    expect(component.result.emit).toHaveBeenCalledWith(false);
  });

  it('should emit true when confirm button is clicked', () => {
    spyOn(component.result, 'emit');

    const confirmButton = fixture.debugElement.query(By.css('button:last-child')).nativeElement;
    confirmButton.click();

    expect(component.result.emit).toHaveBeenCalledWith(true);
  });
});
