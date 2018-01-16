import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pp-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { 
    document.addEventListener('contextmenu', event => event.preventDefault()); 
    this.startTimer();
  }

  ngOnInit() {
  }

  startTimer() {
    // set starting date
    var startDate = new Date();
    var twoHrsLater = new Date(startDate.getTime() + (2 * 1000 * 60 * 60));

    var x = setInterval(function () {

      var now = new Date().getTime();
      var distance = <any>twoHrsLater - now;

      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("timer").innerHTML = "<strong>Time Left :" + hours + "h "
        + minutes + "m " + seconds + "s </strong>";

      if (distance < 0) {
        clearInterval(x);
        // todo when the time is over
        // document.getElementById("timer").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

}
