import {Component, OnInit} from '@angular/core';
import {PresentListService} from '../services/present-list.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-main',
  templateUrl: './list-main.component.html',
  styleUrls: ['./list-main.component.css']
})
export class ListMainComponent implements OnInit {

  presentList:EvalPresentationData[]=[];

  constructor(private pls:PresentListService,private router:Router) { }

  ngOnInit() {
    this.pls.getPresentationList().subscribe(
      next=>
      {
        console.log('jjj');
        let l=next.data().presentations as EvalPresentationData[];
        l.forEach(item=>this.presentList.push(item))
      }
    )
  }

  open(data:EvalPresentationData)
  {
    this.router.navigate(['presentations/form',{uid:data.uid,p:data.projectId,pr:data.presentId,form:data.formId}])
  }

}

export interface EvalPresentationData {
  formId: string
  uid: string
  projectId: string
  presentId: string

}
