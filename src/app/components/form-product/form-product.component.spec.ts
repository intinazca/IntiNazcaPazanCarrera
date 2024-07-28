import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormProductComponent } from './form-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormProductComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [ProductService]
    }).compileComponents();
    
    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
