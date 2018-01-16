import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pp-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  instructionMode: any = "General"  // General & Test

  constructor() { }

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
