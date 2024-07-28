import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';

describe('ProductService', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductService],
        });

        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    //inicio de pruebas

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch products', (done) => {
        const mockData = [
            {
                "date_release": "2024-07-29",
                "date_revision": "2027-10-28",
                "description": "dasdasdasd",
                "id": "veinte",
                "logo": "asdasdadas",
                "name": "sadasdas"
            }
        ];
        service.getProduct().then(data => {
            expect(data).toEqual(mockData);
            done(); //simulamos la promesa
        });

        const req = httpMock.expectOne(`bp/products`); //simulo la peticion http
        expect(req.request.method).toBe('GET');//verifico que metodo http sea sea el esperado
        req.flush(mockData); //simulo la respuesta
    });

    it('should create a product', (done) => {
        const newProduct = {
            "date_release": "2024-07-29",
            "date_revision": "2027-10-28",
            "description": "dasdasdasd",
            "id": "veinte",
            "logo": "asdasdadas",
            "name": "sadasdas"
        };
        service.postProduct(newProduct).then(data => {
            expect(data).toEqual(newProduct);
            done();
        });

        const req = httpMock.expectOne(`/bp/products`);
        expect(req.request.method).toBe('POST');
        req.flush(newProduct);
    });

    it('should update a product', (done) => {
        const productId = 'veinte';
        const updatedProduct = {
          "date_release": "2024-07-29",
          "date_revision": "2027-10-28",
          "description": "dasdasdasd",
          "logo": "asdasdadas",
          "name": "sadasdas"
        };

        service.updateProduct(updatedProduct, productId).then(data => {
            expect(data).toEqual(updatedProduct);
            done();
        });

        const req = httpMock.expectOne(`/bp/products/${productId}`);
        expect(req.request.method).toBe('PUT');
        req.flush(updatedProduct);
    });

    it('should delete a product', (done) => {
        const productId = 1;

        service.deleteProduct(productId).then(data => {
            expect(data).toEqual({});
            done();
        });

        const req = httpMock.expectOne(`/bp/products/${productId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });

    it('should verify product id', (done) => {
        const productId = "20";
        const verificationResponse = { valid: true };

        service.getProductId(productId).then(data => {
            expect(data).toEqual(verificationResponse);
            done();
        });

        const req = httpMock.expectOne(`/bp/products/verification/${productId}`);
        expect(req.request.method).toBe('GET');
        req.flush(verificationResponse);
    });
});
