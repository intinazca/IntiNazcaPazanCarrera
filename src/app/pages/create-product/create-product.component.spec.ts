import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { createProductComponent } from './create-product.component';
import { stateService } from '../../services/state.service';
import { Product } from '../../interface/interface';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';

// Mock child component
@Component({
  selector: 'app-form-product',
  template: ''
})
class MockFormProductComponent {
  @Input() type: any;
  @Input() produtToEdit: Product = {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    date_revision: '2024-01-01',
    date_release: '2024-02-01',
    logo: 'logo1.png'
  };
}

describe('createProductComponent', () => {
  let component: createProductComponent;
  let fixture: ComponentFixture<createProductComponent>;
  let mockStateService: jasmine.SpyObj<stateService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockStateService = jasmine.createSpyObj('stateService', ['getData']);
    mockActivatedRoute = {
      paramMap: of({
        get: (param: string) => (param === 'param' ? 'edit' : null)
      })
    };

    await TestBed.configureTestingModule({
      declarations: [createProductComponent, MockFormProductComponent],
      providers: [
        { provide: stateService, useValue: mockStateService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Para ignorar errores de elementos desconocidos en el template
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(createProductComponent);
    component = fixture.componentInstance;
    mockStateService.getData.and.returnValue({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      date_revision: '2024-01-01',
      date_release: '2024-02-01',
      logo: 'logo1.png'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get param from route and set type', () => {
    expect(component.type).toBe('edit');
  });

  it('should get product data from state service if type is edit', () => {
    component.type = 'edit'; 
    component.produtToEdit = 
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        date_revision: '2024-01-01',
        date_release: '2024-02-01',
        logo: 'logo1.png'
      };
    expect(mockStateService.getData).toHaveBeenCalled();
  });

  it('should pass the correct inputs to the child component', () => {
    component.produtToEdit =
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        date_revision: '2024-01-01',
        date_release: '2024-02-01',
        logo: 'logo1.png'
      };
    const formProductComponent = fixture.debugElement.query(By.css('app-form-product')).componentInstance;
    expect(formProductComponent.type).toBe('edit');
  });
});
