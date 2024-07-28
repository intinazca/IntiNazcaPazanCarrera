import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewProductComponent } from './view-product.component';
import { ProductService } from '../../services/product.service';
import { stateService } from '../../services/state.service';

describe('ViewProductComponent', () => {
  let component: ViewProductComponent;
  let fixture: ComponentFixture<ViewProductComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockStateService: jasmine.SpyObj<stateService>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProduct', 'deleteProduct']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockStateService = jasmine.createSpyObj('StateService', ['setData']);

    await TestBed.configureTestingModule({
      declarations: [ViewProductComponent],
      imports: [FormsModule],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: stateService, useValue: mockStateService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductComponent);
    component = fixture.componentInstance;
    mockProductService.getProduct.and.returnValue(Promise.resolve({ data: [] }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update paginated values on search term change', () => {
    component.tableValues = [
      { id: '1', name: 'Product 1', description: '', date_revision: '', date_release: '', logo: '' },
      { id: '2', name: 'Product 2', description: '', date_revision: '', date_release: '', logo: '' }
    ];
    component.searchTerm = 'Product 1';
    component.onSearchTermChange();

    expect(component.paginatedValues.length).toBe(1);
    expect(component.paginatedValues[0].name).toBe('Product 1');
  });

  it('should navigate to create product page on button click', () => {
    const navigateButton = fixture.debugElement.query(By.css('.btn-agregar')).nativeElement;
    navigateButton.click();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/create-product']);
  });

  it('should toggle dropdown menu', () => {
    component.tableValues = [
      { id: '1', name: 'Product 1', description: '', date_revision: '', date_release: '', logo: '' }
    ];
    component.updatePaginatedValues();
    fixture.detectChanges();

    const menuButton = fixture.debugElement.query(By.css('.menu-button')).nativeElement;
    menuButton.click();

    expect(component.openDropdownId).toBe('1');
    menuButton.click();
    expect(component.openDropdownId).toBeNull();
  });

  it('should open modal on delete item', () => {
    component.tableValues = [
      { id: '1', name: 'Product 1', description: '', date_revision: '', date_release: '', logo: '' }
    ];
    component.updatePaginatedValues();
    fixture.detectChanges();

    const menuButton = fixture.debugElement.query(By.css('.menu-button')).nativeElement;
    menuButton.click();
    fixture.detectChanges();

    const deleteOption = fixture.debugElement.query(By.css('ul.dropdown li:nth-child(2)')).nativeElement;
    deleteOption.click();

    expect(component.showModal).toBeTrue();
    expect(component.messageModal).toContain('Product 1');
  });

  // Agrega más pruebas según sea necesario
});
