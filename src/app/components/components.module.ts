import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { FormProductComponent } from "./form-product/form-product.component";
import { ToastComponent } from "./toast/toast.component";
import { ModalComponent } from "./modal/modal.component";
import { SpinnerComponent } from "./spinner/spinner.component";
@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        //aqui los componentes
        HeaderComponent,
        FormProductComponent,
        ToastComponent,
        ModalComponent,
        SpinnerComponent
    ],
    exports: [
        //aqui los componentes
        HeaderComponent,
        FormProductComponent,
        ToastComponent,
        ModalComponent,
        SpinnerComponent
    ]
})

export class ComponentsModule { }