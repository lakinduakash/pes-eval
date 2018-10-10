import {Component, Input, OnInit} from '@angular/core';
import {Section} from '../../core/model/form-model';

@Component({
  selector: 'app-section-parser',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input('section')section:Section;

  title;
  description;

  attributeList;

  constructor() { }

  ngOnInit() {
    this.title=this.section.name;
    this.description=this.section.description;
    this.attributeList=this.section.attr
  }

}
