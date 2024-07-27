import { ComponentFixture, TestBed } from '@angular/core/testing';

import { createProductComponent } from './create-product.component';

describe('createProductComponent', () => {
  let component: createProductComponent;
  let fixture: ComponentFixture<createProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [createProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(createProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
