import {Component, Input, OnInit} from '@angular/core';
import {Section, SectionAttribute, SectionType} from '../../shared/model/form-model';

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

  constructor() { }

  ngOnInit() {
    if(!this.stuIds)
    {
      this.stuIds=['1','2','3','4']
    }
    this.title=this.section.name;
    this.description=this.section.description;
    this.attributeList=this.section.attr;

    if(!this.section.type||this.section.type==SectionType.GROUP){

    }
    else {
      this.selectIndividuals();
    }
  }

  selectIndividuals()
  {
      for(let id of this.stuIds)
      {
        this.attrInd.push({studentId:id,attr:this.attributeList})
      }

      this.section.attrInd=this.attrInd
  }

}
