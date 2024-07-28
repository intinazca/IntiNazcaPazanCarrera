import { Injectable } from '@angular/core';
import { Product } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class stateService {
  private data!: Product;

  constructor() { }

  setData(data: Product) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
}
