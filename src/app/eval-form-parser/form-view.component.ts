import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavBarTitleService} from '../components/services/nav-bar-title.service';
import {FormService} from '../shared/services/form.service';
import {FormModel, Section} from '../shared/model/form-model';
import {FormEditEventService} from './form-edit-event.service';
import {RealTimeMarkingService} from '../shared/services/real-time-marking.service';


@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  @Input('eval-form')evalForm;

  hideBottom=false;
  hideTop=true;

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    let windowHeight = "innerHeight" in window ? window.innerHeight
      : document.documentElement.offsetHeight;
    let body = document.body, html = document.documentElement;
    let docHeight = Math.max(body.scrollHeight,
      body.offsetHeight, html.clientHeight,
      html.scrollHeight, html.offsetHeight);
    let windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.hideBottom=true;
      this.hideTop=false
    }
    else
    {
      this.hideBottom=false;
      this.hideTop=true
    }

  }

  constructor(private formService: FormService,
              private route: ActivatedRoute, private router: Router,
              private titleBar: NavBarTitleService,
              private editEvent:FormEditEventService,
              public realTimeMarking:RealTimeMarkingService) {
  }

  form:FormModel;
  sectionList:Section[];

  title;
  description;

  private routeId: string;

  uid;
  formId;
  projectId;
  presentId;

  ngOnInit() {

    this.route.params.subscribe(
      params=>{
        this.uid=params['uid'];
        this.formId=params['form'];
        this.projectId=params['p'];
        this.presentId=params['pr'];
        this.formService.getForm(params['uid'],params['form'],params['p'],params['pr']).subscribe(next => {
          this.form = next.data() as FormModel;
          this.printForm()
        }, error1 => console.log(error1))
      }
    );

    this.editEvent.event.subscribe(next=>console.log(this.form))

  }

  init(uid,formid,pid,preid)
  {
      this.realTimeMarking.getCurrentStates(uid,pid,preid).subscribe(
        next=>
        {

        }
      )
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
