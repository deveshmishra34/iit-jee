import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pp-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  select = 'english';
  isActive = false;
  instructionMode = "General"  // General & Test

  constructor() {
    this.select = "english";
   }

  ngOnInit() {
  }

  toggleMode() {
    if(this.instructionMode == 'Test') {
      this.instructionMode = 'General'
    } else {
      this.instructionMode = 'Test';
    }
  }

  newTab() {
    window.open('/test', '_blank', 'location=yes', true);
  }

}
