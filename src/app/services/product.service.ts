import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(
        private http: HttpClient,
    ) {

    }

    // obtener productos
    getProduct(): Promise<any> {
        
        return new Promise((resolve, reject) => {
            this.http.get(`bp/products`)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    error => {
                        reject(error);
                    }
                )
        })
    }

    //crear producto
    postProduct(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`/bp/products`, data)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    error => {
                        reject(error);
                    }
                )
        })
    }
    //actualizar prodcuto
    updateProduct(data: any, id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(`/bp/products/${id}`, data)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    error => {
                        reject(error);
                    }
                )
        })
    }
    //eliminar producto
    deleteProduct(id:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(`/bp/products/${id}`)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    error => {
                        reject(error);
                    }
                )
        })
    }

    //verificar id
    getProductId(id:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`/bp/products/verification/${id}`)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    error => {
                        reject(error);
                    }
                )
        })
    }
}