import {Component, OnInit} from '@angular/core';
import {PresentListService} from '../services/present-list.service';
import {Router} from '@angular/router';
import {PresentationService} from '../../shared/services/presentation.service';

@Component({
  selector: 'app-list-main',
  templateUrl: './list-main.component.html',
  styleUrls: ['./list-main.component.css']
})
export class ListMainComponent implements OnInit {

  presentList:EvalPresentationData[]=[];

  constructor(private pls:PresentListService,private router:Router,public presentationService:PresentationService) { }

  ngOnInit() {
    this.pls.getPresentationList().subscribe(
      next=>
      {
        let l=next.data().presentations as EvalPresentationRawData[];
        l.forEach(item=>{
          this.presentationService.getPresentation(item.uid,item.projectId,item.presentId).subscribe(
            data=>{
              console.log(data.data());
              this.presentList.push({rawDetails:item,presentDetails:data.data()})
            }
          )

        })
      }
    )
  }

  open(data:EvalPresentationRawData)
  {
    this.router.navigate(['presentations/form',{uid:data.uid,p:data.projectId,pr:data.presentId,form:data.formId}])
  }

}

export interface EvalPresentationData {

  rawDetails:EvalPresentationRawData
  presentDetails:Presentation

}

export interface Presentation {
  name:string;
  description?:string
}

export interface EvalPresentationRawData {
  formId: string
  uid: string
  projectId: string
  presentId: string

}
