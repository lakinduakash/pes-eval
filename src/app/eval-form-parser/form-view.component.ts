import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavBarTitleService} from '../components/services/nav-bar-title.service';
import {FormService} from '../shared/services/form.service';
import {FormModel, Section} from '../shared/model/form-model';
import {FormEditEventService} from './form-edit-event.service';
import {RealTimeMarkingService} from '../shared/services/real-time-marking.service';
import {STATES} from '../shared/model/prsentation-control';
import {interval, Subscription} from 'rxjs';


@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  @Input('eval-form')evalForm;

  hideBottom=false;
  hideTop=true;
  buttonDisabled=true;

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
  mainForm:FormModel;
  sectionList:Section[];

  title;
  description;

  private routeId: string;

  uid;
  formId;
  projectId;
  presentId;

  currentGroup='';
  stateStatus;

  timeSub:Subscription;

  time;

  currentState;

  ngOnInit() {

    this.route.params.subscribe(
      params=>{
        this.uid=params['uid'];
        this.formId=params['form'];
        this.projectId=params['p'];
        this.presentId=params['pr'];
        this.formService.getForm(params['uid'],params['form'],params['p'],params['pr']).subscribe(next => {
          this.form = next.data() as FormModel;
          this.mainForm = next.data() as FormModel;
          this.init(this.uid,this.formId,this.projectId,this.presentId)
        }, error1 => console.log(error1))
      }
    );

    this.editEvent.event.subscribe(next=>this.realTimeMarking.saveFormTemp(this.formId,this.form))

  }

  init(uid,formid,pid,preid)
  {
      this.realTimeMarking.getCurrentStates(uid,pid,preid).subscribe(
        next=>
        {
          let data=next.payload.data();
          this.currentState=data.currentState;
          //let newForm=this.listenGroupChanges(data.currentGroup)
          this.stateBehaviour(data.currentState,data.currentGroup);
          this.setTimer(data.startTime,data.currentState);

          //if(newForm)
            //return
          this.realTimeMarking.getTempForm(this.formId).subscribe(next=>{
            const data=next.data();
            if(data!=undefined) {
              if(!(this.currentState == STATES.suspended || this.currentState ==STATES.finished))
                  this.form = data;
            }
            else{
              console.log('no cache form')
            }
            this.printForm();
          })
        }
      )

  }

  setTimer(startTime,state)
  {
    if (state != 2 && state != 3 &&((this.timeSub == undefined || this.timeSub.closed)))
    {
        this.timeSub=interval(1000).subscribe(val=>
          {
            let b = startTime;
            let a = Date.now();
            let totalSecs = Math.trunc(a / 1000 - b.seconds);

            let minutes = Math.floor(totalSecs / 60);
            let seconds = totalSecs % 60;

            this.time = ' ' + minutes + " minutes " + seconds + ' seconds '
          }

        )
    }
  }


  listenGroupChanges(newGroup)
  {
    if(newGroup !==this.currentGroup) {
      if(this.currentGroup!='') {
        this.form = this.mainForm;

        this.printForm();
        console.log(newGroup);
        return true
      }
      return false
    }
    return false

  }


  stateBehaviour(state,group)
  {
    this.currentGroup= 'group ' +group;
    switch (state) {

      case STATES.finished: {
        this.currentGroup='';
        this.stateStatus='Not started';
        this.buttonDisabled=true;
        break
      }

      case STATES.running: {
        this.stateStatus='Presentation running';
        this.buttonDisabled=false;
        break
      }

      case STATES.paused: {
        this.stateStatus='Presentation paused,wait for start';
        this.buttonDisabled=true;
        break
      }
      case STATES.suspended: {
        this.stateStatus='Presentation canceled';
        this.buttonDisabled=true;
        if(this.timeSub!=undefined)
          this.timeSub.unsubscribe();
        this.time='';
        this.realTimeMarking.deleteTempForm(this.formId);
        break
      }
      default: {
        this.currentGroup='';
        this.stateStatus='Not started';
        this.buttonDisabled=true;
        this.realTimeMarking.deleteTempForm(this.formId);
        if(this.timeSub!=undefined)
          this.timeSub.unsubscribe();
        this.time=''
      }
    }
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
    if(this.currentGroup !== '' || this.currentGroup !=undefined) {
      this.realTimeMarking.saveFormFinal(this.uid, this.projectId, this.presentId, this.formId, this.currentGroup, this.form);
      this.realTimeMarking.deleteTempForm(this.formId)
    }

    else{
      console.log('no group selected')
    }
  }



}
