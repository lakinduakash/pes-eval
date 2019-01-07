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

  finishLoaded=false;
  isEmptyP=false;
  isError=false;

  constructor(private pls:PresentListService,private router:Router,public presentationService:PresentationService) { }

  ngOnInit() {
    this.pls.getPresentationList().subscribe(
      next=>
      {
        let l=next.data().presentations as EvalPresentationRawData[];

        if(l)
        l.forEach(item=>{
          this.presentationService.getPresentation(item.uid,item.projectId,item.presentId).subscribe(
            data=>{
              console.log(data.data());
              this.presentList.push({rawDetails:item,presentDetails:data.data()})

            }
          )

        });
        else
        {
          this.isEmptyP=true
        }

        this.finishLoaded=true;
      },
      error1 => this.isError=true
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
  scheduledTo
  created
}

export class EvalPresentationRawData {
  formId: string;
  uid: string;
  projectId: string;
  presentId: string

}
