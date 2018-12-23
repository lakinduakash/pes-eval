import {Component, Input, OnInit} from '@angular/core';
import {SectionAttribute} from '../../shared/model/form-model';
import {FormEditEventService} from '../form-edit-event.service';

@Component({
  selector: 'app-attribute-parser',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  @Input('sectionAtrr')attr:SectionAttribute;

  criteria;
  maxMarks;
  numbers =[];
  currentM;

  constructor(private editEvent:FormEditEventService) {

  }

  ngOnInit() {
    this.criteria=this.attr.criteria;
    this.maxMarks=this.attr.maxMark;
    this.currentM=this.attr.currentMark;

    for (let i=0;i<=this.maxMarks;i++)
      this.numbers.push(i)

    //console.log(this.numbers)
  }

  updateMark($event)
  {
    this.attr.currentMark=this.currentM;
    this.editEvent.event.emit()
  }

}
