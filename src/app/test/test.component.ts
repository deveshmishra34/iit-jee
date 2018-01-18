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
  sections: any;
  sectionObject = [];
  activeSectionIndex = 0;
  activeQuestionIndex = 0;
  sectionQuestion: any;

  constructor(private rd: Renderer2, private testService: TestService) {
    document.addEventListener('contextmenu', event => event.preventDefault());
    this.startTimer();
  }

  ngOnInit() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.sectionObject = [];
    this.activeSectionIndex = 0;
    this.activeQuestionIndex = 0;
    this.testService.getQuestions().subscribe(
      questions => {
        if (questions && questions.rows) {
          questions.rows.forEach(element => {
            let found = false;
            this.sectionObject.forEach(sec => {
              if (sec['section_id'] === element['section_id']) {
                found = true;
                sec.questions.push(element);
              }
            });
            if (!found) {
              this.sectionObject.push({
                section_name: element['section_name'],
                section_id: element['section_id'],
                questions: []
              })
              this.sectionObject[this.sectionObject.length - 1].questions.push(element);
            }
          });
        }
        this.getQuestion(this.activeSectionIndex, this.activeQuestionIndex);
      },
      err => console.log(err)
    );
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

  getQuestionOfSection(sectionIndex) {
    this.activeQuestionIndex = 0;
    this.activeSectionIndex = sectionIndex;
    this.getQuestion(this.activeSectionIndex, this.activeQuestionIndex);
    console.log(this.sectionObject[this.activeSectionIndex].questions)
  }


  getQuestion(sectionIndex, questionIndex) {
    this.testService.getQuestionDetails(this.sectionObject[sectionIndex].questions[questionIndex].questions_id).subscribe(
      quest => this.questions = quest.rows,
      err => console.log(err)
    );
  }

  getNextButtonVisibility() {
    if (!((
      this.sectionObject[this.activeSectionIndex] &&
      this.sectionObject[this.activeSectionIndex].questions[this.activeQuestionIndex + 1]) || (this.sectionObject[this.activeSectionIndex + 1]))) {
      return false;
    }
    return true;
  }

  getNext() {
    if (this.sectionObject[this.activeSectionIndex].questions[this.activeQuestionIndex + 1]) {
      this.activeQuestionIndex++;
    } else if (this.sectionObject[this.activeSectionIndex + 1]) {
      this.activeQuestionIndex = 0;
      this.activeSectionIndex++;
    } else {
      alert('No Next Question to be display');
      return;
    }
    this.getQuestion(this.activeSectionIndex, this.activeQuestionIndex);
  }

}
