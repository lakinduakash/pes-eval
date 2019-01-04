export class FormModel {
  $key: string;
  id: string;
  name: string;
  description: string;
  sections: Section[]; // the user select item array
  totalMarks:number;
  currentMark:number


}

export class Section {
  $key: string;
  id: number;
  name: string;
  description: string;
  maxMarks: number;
  currentMark: number;
  type: SectionType;
  attr: SectionAttribute[];
  attrInd: {
    attr:{
      $key: string;
      id: number;
      criteria: string;
      maxMark: number;
      currentMark: number; }[]
    studentId:string
  }[]


}

export class SectionAttribute {
  $key: string;
  id: number;
  criteria: string;
  maxMark: number;
  currentMark: number;


  constructor() {
  }

}

export class IndividualAttrSet
{
  attr:SectionAttribute;
  studentId:string
}




export const enum SectionType {INDIVIDUAL = 1, GROUP = 2}
