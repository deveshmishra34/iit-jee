import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/_services/users.service';
import { GlobalService } from '../../shared/_services/global.service';
import { InstructionsService } from '../../shared/_services/instructions.service';

@Component({
  selector: 'pp-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  select = 'english';
  isActive = false;
  genIns:string = "Please wait"
  testIns:string = "Please wait"
  instructionMode = "General"  // General & Test

  constructor(
    private _userServices : UsersService,
    private _globalServices : GlobalService,
    private _insService : InstructionsService
  ) {
    this.select = "english";
   }

  ngOnInit() {

    this._insService.genInstructions().subscribe(
      (res) => {
        console.log(res);
        this.genIns = res.data;
      },
      (err) => {
        console.log(err);
        
      }
    )

    this._insService.testInstructions().subscribe(
      (res) => {
        console.log(res);
        this.testIns = res.data;
      },
      (err) => {
        console.log(err);

      }
    )

    this._userServices.self().subscribe(
      res => {
        console.log(res);
        if(res.success){
          this._globalServices.setUser(res.data);
        }else{
          console.log("Unable to get user");
          
        }
      }
    )
  }

  // getInstructions(){
  //   this._userServices.get
  // }

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
