import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pp-test-instructions',
  templateUrl: './test-instructions.component.html',
  styleUrls: ['./test-instructions.component.scss']
})
export class TestInstructionsComponent implements OnInit {

  @Input('language') language: string;
  
  constructor() { }

  ngOnInit() {
  }

}
