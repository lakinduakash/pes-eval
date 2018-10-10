import {Component, Input, OnInit} from '@angular/core';
import {SectionAttribute} from '../../shared/model/form-model';

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

  constructor() {

  }

  ngOnInit() {
    this.criteria=this.attr.criteria;
    this.maxMarks=this.attr.maxMark;

    for (let i=0;i<=this.maxMarks;i++)
      this.numbers.push(i)

    console.log(this.numbers)
  }

}
