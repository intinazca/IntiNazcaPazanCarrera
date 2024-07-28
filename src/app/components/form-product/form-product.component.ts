import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Product, DataAlert, toastInterface } from '../../interface/interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent {
  createItemGroup!: FormGroup;
  title: string = "Formulario de Registro";

  // variables del toast
  toastVisible: boolean = false;
  toastData!: toastInterface;

  constructor(
    private service: ProductService,
    // formulario
    public builderForm: FormBuilder,
  ) {
    this.generateItemGroup();
  }

  generateItemGroup() {
    this.createItemGroup = this.builderForm.group(this.getFormControls());

    this.createItemGroup.get('date_revision')?.setValidators([
      Validators.required,
      this.oneYearAfterReleaseValidator.bind(this)
    ]);
  }

  getFormControls(): { [key in keyof Product]: FormControl } {
    return {
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
        this.noWhitespaceValidator
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      logo: new FormControl('', Validators.required),
      date_release: new FormControl('', [
        Validators.required,
        this.futureOrTodayDateValidator
      ]),
      date_revision: new FormControl(''),
    };
  }

  // validadores personalizados
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.value && control.value.trim().length >= 5;
      return isValid ? null : { whitespace: true };
    };
  }

  futureOrTodayDateValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const selectedDate = new Date(control.value);
    selectedDate.setHours(0, 0, 0, 0);

    // Verificar si las fechas son válidas
    if (isNaN(selectedDate.getTime())) {
      return { invalidDateFormat: true };
    }

    return selectedDate >= currentDate ? null : { invalidDate: true };
  }


  oneYearAfterReleaseValidator(control: AbstractControl): ValidationErrors | null {
    const releaseDateValue = this.createItemGroup.get('date_release')?.value;
    if (!releaseDateValue) return { invalidReleaseDate: true };

    const releaseDate = new Date(releaseDateValue);
    const revisionDate = new Date(control.value);

    // Parsear las fechas usando el formato YYYY-MM-DD
    if (isNaN(releaseDate.getTime()) || isNaN(revisionDate.getTime())) {
      return { invalidDateFormat: true };
    }

    releaseDate.setFullYear(releaseDate.getFullYear() + 1);
    return revisionDate >= releaseDate ? null : { invalidRevisionDate: true };
  }

  async createProduct() {
    try {
      const exist = await this.service.getProductId(this.createItemGroup.value.id);
      console.log("existe", exist);
      if (!exist) {
        console.log("data a mandar:", this.createItemGroup.value);
        const response = await this.service.postProduct(this.createItemGroup.value);
        console.log("respuesta: ", response);

        if (response.message) {
          console.log("guardado con exito");
          this.showToast({ message: 'Guardado con exito', duration: 3000, type: 'success' });
        }
      } else {
        console.log("ya existe con ese id");
        this.showToast({ message: 'El producto ya esxiste con ese id', duration: 3000, type: 'warning' });
      }
    } catch (error) {
      // toast de error
      this.showToast({ message: 'Error al guardar', duration: 3000, type: 'error' });
      console.log(error);
    }
  }

  showToast(data: toastInterface) {
    this.toastData = data;
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, data.duration);
  }

}
