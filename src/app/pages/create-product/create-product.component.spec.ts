import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createProductComponent } from './create-product.component';
import { FormProductComponent } from '../../components/form-product/form-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

describe('createProductComponent', () => {
  let component: createProductComponent;
  let fixture: ComponentFixture<createProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        createProductComponent,
        FormProductComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule // Asegúrate de incluir ReactiveFormsModule aquí
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    
    fixture = TestBed.createComponent(createProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
