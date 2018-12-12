import { NgModule } from "@angular/core";
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatDividerModule, MatCardModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatExpansionModule} from "@angular/material";

@NgModule({
    imports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatDividerModule, MatCardModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatExpansionModule],
    exports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatDividerModule, MatCardModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatExpansionModule],
})

export class MaterialModule { }