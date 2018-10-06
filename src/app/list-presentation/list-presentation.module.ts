import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListMainComponent} from './list-main/list-main.component';
import {RouterModule, Routes} from '@angular/router';


const routes:Routes=[
  {path:'',component:ListMainComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListMainComponent]
})
export class ListPresentationModule { }
