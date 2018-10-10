import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListMainComponent} from './list-main/list-main.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../components/components.module';
import {MatListModule} from '@angular/material';
import {PresentListService} from './services/present-list.service';


const routes:Routes=[
  {path:'',component:ListMainComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatListModule
  ],
  declarations: [ListMainComponent],
  providers:[PresentListService]
})
export class ListPresentationModule { }
