import { Component, OnInit } from '@angular/core';
import { stateService } from '../../services/state.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interface/interface';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class createProductComponent implements OnInit {
  type: any;
  optionalParam: string | null = null;
  produtToEdit: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private stateService: stateService,
  ) {
    this.getParamRoute();
    console.log("this.type:", this.type);
    
    if (this.type == 'edit') {
      this.produtToEdit = this.stateService.getData(); // Obtén los datos desde el servicio
      console.log("productoa editar",this.produtToEdit);
    }
  }

  ngOnInit(): void {
  }

  getParamRoute() {
    this.route.paramMap.subscribe(params => {
        this.type = params.get('param'); // Obtener el parámetro opcional
    });
  }

}
