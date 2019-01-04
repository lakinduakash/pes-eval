import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavBarTitleService} from '../components/services/nav-bar-title.service';
import {FormService} from '../shared/services/form.service';
import {FormModel, Section, SectionType} from '../shared/model/form-model';
import {FormEditEventService} from './form-edit-event.service';
import {RealTimeMarkingService} from '../shared/services/real-time-marking.service';
import {STATES} from '../shared/model/prsentation-control';
import {interval, Subscription} from 'rxjs';
import {ProjectService} from '../shared/services/project.service';
import {MatDialog, MatDialogRef} from '@angular/material';


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

  documentExist=true;

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
              private projectService:ProjectService,
              private route: ActivatedRoute, private router: Router,
              private titleBar: NavBarTitleService,
              private editEvent:FormEditEventService,
              public realTimeMarking:RealTimeMarkingService,
              public dialog:MatDialog) {
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

  studentIds=[];

  indMarkMap=new Map<string,number>();

  currentGroup='';
  stateStatus;

  timeSub:Subscription;

  time;

  currentState;


  currentTotalMarks=0;


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

    this.editEvent.event.subscribe(next=>this.realTimeMarking.saveFormTemp(this.formId,this.form));

  }

  init(uid,formid,pid,preid)
  {
      this.realTimeMarking.getCurrentStates(uid,pid,preid).subscribe(
        next=>
        {
          let data=next.payload.data();
          this.currentState=data.currentState;
          //let newForm=this.listenGroupChanges(data.currentGroup)

          if(data.currentGroup!='')
            this.getGroup(data.currentGroup);

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

            this.calculateTotalMark();
          });

          this.realTimeMarking.checkExistSavedForm(this.uid,this.projectId,this.presentId,this.currentGroup).subscribe(
            next=>this.documentExist=next
          )
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
    let dialogRef:MatDialogRef<ConfirmationDialog>= this.dialog.open(ConfirmationDialog,{width:'350px'});

    dialogRef.afterClosed().subscribe(next=>
    {
      if(dialogRef.componentInstance.yesClicked)
      {
        if(this.currentGroup !== '' || this.currentGroup !=undefined) {
          this.realTimeMarking.saveFormFinal(this.uid, this.projectId, this.presentId, this.formId, this.currentGroup, this.form)
            .subscribe(next=>this.documentExist=true);
          this.realTimeMarking.deleteTempForm(this.formId)
        }

        else{
          console.log('no group selected')
        }
      }
    })
  }

  getGroup(groupId)
  {
    this.projectService.getStudentsOfGroup(this.uid,this.projectId,groupId).subscribe(next=>{

      let arr=[];
      Object.values(next).slice(1).forEach(val => arr.push(val));

      this.studentIds=arr;
      console.log(arr);

      arr.forEach(id=>this.indMarkMap.set(id,0));
      this.editEvent.groupReceived.next(arr);
    })


  }


  calculateTotalMark()
  {
    this.editEvent.event.subscribe(next => {
      this.currentTotalMarks = 0;
      if (this.sectionList != undefined) {
        for (let s of this.sectionList) {

          if (!s.type || s.type == SectionType.GROUP) {
            if (s.attr != undefined) {
              for (let k of s.attr) {
                if (k.currentMark != undefined)
                  this.currentTotalMarks += k.currentMark
              }
            }
          } else {
            if (s.attrInd != undefined) {
              for(let memberASet of s.attrInd)
              {
                let memberMark=0;

                for (let k of memberASet.attr) {
                  if (k.currentMark != undefined)
                    memberMark += k.currentMark
                }

                this.indMarkMap.set(memberASet.studentId,memberMark);
              }
            }
          }
        }
      }

      this.form.currentMark=this.currentTotalMarks;
      this.form.individualMarkMap=this.indMarkMap;

    })
  }


}


// @ts-ignore
@Component({
  selector: 'app-c-dialog',
  template: `
    <h1 mat-dialog-title>Submit form</h1>
    <div mat-dialog-content>
      You cannot change marks after submitted.Are you sure to submit?
    </div>

      <div mat-dialog-actions>
        <button mat-button cdkFocusInitial (click)="onNoClick()">Cancel</button>
        <button mat-button (click)="onYesClick()">Submit</button>
      </div>
  `
})

export class ConfirmationDialog implements OnInit {

  yesClicked = false;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialog>) {

  }


  ngOnInit(): void {
  }

  onYesClick() {
    this.yesClicked = true;
    this.dialogRef.close()
  }

  onNoClick() {
    this.dialogRef.close()
  }


}
