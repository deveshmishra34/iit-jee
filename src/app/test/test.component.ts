import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { TestService } from "../services/test.service";

@Component({
  selector: 'pp-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild('questionModal') questionModal: ElementRef;
  @ViewChild('instructionModal') instructionModal: ElementRef;

  fullWidth: boolean = true;
  questions: any;

  constructor(private rd: Renderer2, private testService: TestService) {
    document.addEventListener('contextmenu', event => event.preventDefault());
    this.startTimer();
  }

  ngOnInit() {
    this.testService.getQuestions().subscribe(
      questions => console.log(questions),  //this.questions = questions,
      err => console.log(err)
    )
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
      }
    }, 1000);
  }

  showPaper() {
    var questionModal = this.questionModal.nativeElement;
    this.rd.setStyle(questionModal, 'display', 'block');
  }

  showInstruction() {
    var instructionModal = this.instructionModal.nativeElement;
    this.rd.setStyle(instructionModal, 'display', 'block');
  }

  closeQuestionModal() {
    var questionModal = this.questionModal.nativeElement;
    this.rd.setStyle(questionModal, 'display', 'none');
  }

  closeInstructionModal() {
    var instructionModal = this.instructionModal.nativeElement;
    this.rd.setStyle(instructionModal, 'display', 'none');
  }

}
