import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";

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
    ],
    exports: [
        //aqui los componentes
        HeaderComponent,
    ]
})

export class ComponentsModule { }