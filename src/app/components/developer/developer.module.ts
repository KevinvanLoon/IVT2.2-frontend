import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { DeveloperRoutingModule } from './developer-routing.module';
import { DeveloperComponent } from './developer.component';
import { DeveloperListComponent } from './developer-list/developer-list.component';
import { DeveloperItemComponent } from './developer-list/developer-item/developer-item.component';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';
import { DeveloperCreateComponent } from './developer-create/developer-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../material.module';


@NgModule({
  declarations: [DeveloperComponent, DeveloperListComponent, DeveloperItemComponent, DeveloperDetailComponent, DeveloperCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    NgbModule,  
    DeveloperRoutingModule 
  ]
})
export class DeveloperModule { }
