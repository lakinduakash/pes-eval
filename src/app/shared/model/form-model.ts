export class FormModel {
  $key: string;
  id: string;
  name: string;
  description: string;
  sections: Section[]


}

export class Section {
  $key: string;
  id: number;
  name: string;
  description: string;
  maxMarks: number;
  currentMark: number;
  attr: SectionAttribute[]


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
