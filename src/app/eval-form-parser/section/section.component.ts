import {Component, Input, OnInit} from '@angular/core';
import {Section, SectionAttribute, SectionType} from '../../shared/model/form-model';
import {FormEditEventService} from '../form-edit-event.service';

@Component({
  selector: 'app-section-parser',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input('section')section:Section;
  @Input('studentIds')stuIds:string[];

  title;
  description;

  attributeList:SectionAttribute[];

  attrInd:{
    attr:{
      $key: string;
      id: number;
      criteria: string;
      maxMark: number;
      currentMark: number; }[]
    studentId:string
  }[]=[];

  constructor(public editEvent:FormEditEventService) { }

  ngOnInit() {
    if(!this.stuIds)
    {
      this.stuIds=['1','2','3','4'];
      console.log(this.stuIds)
    }

    this.title=this.section.name;
    this.description=this.section.description;
    this.attributeList=this.section.attr;

    if(!this.section.type||this.section.type==SectionType.GROUP){

    }
    else {

      this.editEvent.groupReceived.subscribe(next=>{this.selectIndividuals(next)})
    }
  }

  selectIndividuals(arr:any[])
  {

    this.attrInd=[];
      for(let id of arr)
      {

        let cloneOfA = JSON.parse(JSON.stringify(this.attributeList));
        this.attrInd.push({studentId:id,attr:cloneOfA})
      }

      this.section.attrInd=this.attrInd

  }

}
