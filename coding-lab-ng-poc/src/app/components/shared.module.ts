import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DataPaginatorComponent } from './data-paginator/data-paginator.component';
import { NgxSpinnerModule  } from "ngx-spinner";
import { PopupAlertComponent } from './popup-alert/popup-alert.component';

@NgModule({
  declarations: [NavbarComponent, DataPaginatorComponent, PopupAlertComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [NavbarComponent, DataPaginatorComponent, PopupAlertComponent]
})
export class SharedModule { }
