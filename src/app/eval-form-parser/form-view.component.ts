import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavBarTitleService} from '../components/services/nav-bar-title.service';
import {FormService} from '../shared/services/form.service';
import {FormModel, Section} from '../shared/model/form-model';
import {FormEditEventService} from './form-edit-event.service';


@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  @Input('eval-form')evalForm;

  constructor(private formService: FormService, private route: ActivatedRoute, private router: Router,
              private titleBar: NavBarTitleService,private editEvent:FormEditEventService) {
  }

  form:FormModel;
  sectionList:Section[];

  title;
  description;

  private routeId: string;

  ngOnInit() {

    this.route.params.subscribe(
      params=>{
        console.log(params);
        this.formService.getForm(params['uid'],params['form'],params['p'],params['pr']).subscribe(next => {
          this.form = next.data() as FormModel;
          this.printForm()
        }, error1 => console.log(error1))
      }
    );

    this.editEvent.event.subscribe(next=>console.log(this.form))

  }

  printForm()
  {
    console.log(this.form);
    this.sectionList=this.form.sections;
    this.title=this.form.name;
    this.description=this.form.description
  }

  saveForm()
  {

  }



}
