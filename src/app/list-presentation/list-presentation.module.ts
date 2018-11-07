import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListMainComponent} from './list-main/list-main.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../components/components.module';
import {MatButtonModule, MatCardModule, MatListModule} from '@angular/material';
import {PresentListService} from './services/present-list.service';
import {FormViewComponent} from './form-view/form-view.component';
import {EvalFormParserModule} from '../eval-form-parser/eval-form-parser.module';


const routes:Routes=[
  {path:'',component:ListMainComponent},
  {path:'form',component:FormViewComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatListModule,
    MatButtonModule,
    EvalFormParserModule,
    MatCardModule
  ],
  declarations: [ListMainComponent, FormViewComponent],
  providers:[PresentListService]
})
export class ListPresentationModule { }
