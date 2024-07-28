import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, toastInterface } from '../../interface/interface';
import { Router } from '@angular/router';
import { stateService } from '../../services/state.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'] // Usa 'styleUrls' en lugar de 'styleUrl'
})
export class ViewProductComponent implements OnInit {
  rowsPerPage: number = 5;
  currentPage: number = 1;
  tableValues: Product[] = [];
  paginatedValues: Product[] = [];
  searchTerm: string = '';

  // variables modal
  openDropdownId: string | null = null;
  showModal: boolean = false;
  messageModal: string = '';
  produtToEdit!: Product;

  // variables del toast
  toastVisible: boolean = false;
  toastData!: toastInterface;

  constructor(
    private service: ProductService,
    private router: Router,
    private stateService: stateService
  ) { }

  ngOnInit() {
    this.initValues();
  }

  async initValues(){
    try {
      const { data } = await this.service.getProduct();
      this.tableValues = data;
      this.updatePaginatedValues();
      console.log('data: ', data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }

  updatePaginatedValues() {
    const filteredValues = this.tableValues.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedValues = filteredValues.slice(start, end);
  }

  onRowsPerPageChange() {
    this.currentPage = 1; // Resetea a la primera página al cambiar el número de filas por página
    this.updatePaginatedValues();
  }

  onSearchTermChange() {
    this.currentPage = 1; // Resetea a la primera página al cambiar el término de búsqueda
    this.updatePaginatedValues();
  }

  trackById(index: number, item: Product) {
    return item.id;
  }

  navigateToCreateProduct() {
    this.router.navigate(['/create-product']);
  }

  navigateToEditProduct(data: Product) {
    this.stateService.setData(data);
    this.router.navigate(['/create-product/edit']);
  }

  //menu contextual
  toggleDropdown(id: string) {
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica si el clic fue fuera del menú desplegable
    if (!targetElement.closest('.dropdown') && !targetElement.closest('.menu-button')) {
      this.openDropdownId = null;
    }
  }

  editItem(item: Product) {
    this.openDropdownId = null;
    this.produtToEdit = item;
    console.log('Editing item:', this.produtToEdit);
    this.navigateToEditProduct(item)
  }

  deleteItem(item: Product) {
    this.openDropdownId = null;
    this.messageModal = `¿Estas seguro de elimiar el producto ${item.name}?`;
    this.produtToEdit = item;
    console.log('Editing item:', this.produtToEdit);
    this.openModal();
  }

  openModal() {
    this.showModal = true;
  }

  async handleModalResult(result: any) {
    try {
      this.showModal = false; // Cierra el modal
      if (result) {
        console.log('Confirmado');
        const response = await this.service.deleteProduct(this.produtToEdit.id);
        console.log("response: ", response);
        if (response.message) {
          await this.initValues();
          this.showToast({ message: `${response.message}`, duration: 3000, type: 'success' });
        }
      } else {
        console.log('Cancelado');
      }
    } catch (error) {
      this.showToast({ message: 'Error al guardar', duration: 3000, type: 'error' });
      console.log(error);
    }
  }

  async refreshData(){

  }

  // metodos toast
  showToast(data: toastInterface) {
    this.toastData = data;
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, data.duration);
  }

}
