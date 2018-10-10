import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavBarTitleService} from '../components/services/nav-bar-title.service';
import {FormService} from '../shared/services/form.service';
import {FormModel, Section} from '../shared/model/form-model';


@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  @Input('eval-form')evalForm;

  constructor(private formService: FormService, private route: ActivatedRoute, private router: Router,
              private titleBar: NavBarTitleService) {
  }

  form:FormModel;
  sectionList:Section[];

  title;
  description;

  private routeId: string;

  ngOnInit() {
    this.titleBar.setTitle("Form view");
    this.route.paramMap.subscribe(next => this.routeId = next.get('id'));
    console.log(this.routeId);

    this.formService.getForm("","","","").subscribe(next => {
      this.form = next.data() as FormModel;
      this.printForm()
    }, error1 => console.log(error1))

  }

  printForm()
  {
    console.log(this.form);
    this.sectionList=this.form.sections;
    this.title=this.form.name;
    this.description=this.form.description
  }



}
