import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/interface';

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

  constructor(private service: ProductService) {}

  async ngOnInit() {
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
  
}
