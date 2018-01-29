import { Component, OnInit, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import { TestService } from "../services/test.service";

@Component({
  selector: 'pp-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  select: string = "english";
  @ViewChild('questionModal') questionModal: ElementRef;
  @ViewChild('instructionModal') instructionModal: ElementRef;
  @ViewChild('scroll') scroll: ElementRef;
  @ViewChild('answer') answer: ElementRef;
  currentCursorPosition = 0;
  fullWidth: boolean = true;
  questions: any;
  sections: any;
  sectionObject = [];
  activeSectionIndex = 0;
  activeQuestionIndex = 0;
  sectionQuestion: any;
  nums: string[] = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "-"];
  expectedAnswer: string = '';
  testObject = {
    sectionObject : []
  };

  constructor(private rd: Renderer2, private testService: TestService) {
    document.addEventListener('contextmenu', event => event.preventDefault());
    this.startTimer();
  }

  ngOnInit() {
    this.getAllQuestions();
  }

  startTimer() {
    // set starting date
    let startDate = new Date();
    let twoHrsLater = new Date(startDate.getTime() + (3 * 1000 * 60 * 60));
    let self = this;
    let x = setInterval(function () {

      let now = new Date().getTime();
      let distance = <any>twoHrsLater - now;
      if (self.sectionObject && self.sectionObject[self.activeSectionIndex] && self.sectionObject[self.activeSectionIndex].questions[self.activeQuestionIndex]) {
        self.sectionObject[self.activeSectionIndex].questions[self.activeQuestionIndex].time_taken++;
      }
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("timer").innerHTML = "<strong>Time Left :" + hours + "h "
        + minutes + "m " + seconds + "s </strong>";

      if (distance < 0) {
        clearInterval(x);
        // todo when the time is over
      }
    }, 1000);
  }

  showPaper() {
    let questionModal = this.questionModal.nativeElement;
    this.rd.setStyle(questionModal, 'display', 'block');
  }

  showInstruction() {
    let instructionModal = this.instructionModal.nativeElement;
    this.rd.setStyle(instructionModal, 'display', 'block');
  }

  closeQuestionModal() {
    let questionModal = this.questionModal.nativeElement;
    this.rd.setStyle(questionModal, 'display', 'none');
  }

  closeInstructionModal() {
    let instructionModal = this.instructionModal.nativeElement;
    this.rd.setStyle(instructionModal, 'display', 'none');
  }

  scrollToBottom() {
    this.scroll.nativeElement.scrollTo({
      top: this.scroll.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  scrollToTop() {
    this.scroll.nativeElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getNums(val) {
    debugger;
    let tempValue = [];
    if (!this.expectedAnswer) {
      this.expectedAnswer = val;
      this.currentCursorPosition = 1;
      setTimeout(() => {
        this.setSelectionRange(this.answer.nativeElement, this.currentCursorPosition, this.currentCursorPosition);
      }, 10);
    } else {
      tempValue = this.expectedAnswer.split('');
      tempValue = Object.assign(tempValue, tempValue.splice(this.currentCursorPosition, 0, val));
      this.expectedAnswer = tempValue.join('');
      setTimeout(() => {
        let textBox = this.answer.nativeElement;
        this.currentCursorPosition++;
        this.setSelectionRange(this.answer.nativeElement, this.currentCursorPosition, this.currentCursorPosition);
      }, 10);
    }
  }

  removeCharacter() {

  }

  clear() {
    // debugger;
    this.expectedAnswer = "";
  }

  goLeft() {
    debugger;
    this.currentCursorPosition = Math.max(0, this.currentCursorPosition - 1);
    this.setSelectionRange(this.answer.nativeElement, this.currentCursorPosition, this.currentCursorPosition);
  }

  goRight() {
    debugger;
    this.currentCursorPosition = Math.min(this.expectedAnswer.length, this.currentCursorPosition + 1);
    this.setSelectionRange(this.answer.nativeElement, this.currentCursorPosition, this.currentCursorPosition);
  }

  setSelectionRange(input, selectionStart, selectionEnd) {
    debugger;
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    } else {
      console.log("Unable to change position");
    }
  }

  getAllQuestions() {
    
    this.sectionObject = [];
    this.activeSectionIndex = 0;
    this.activeQuestionIndex = 0;
    this.testService.getQuestions().subscribe(
      questions => {
        // debugger;
        if (questions && questions.rows) {
          questions.rows.forEach(element => {
            element.time_taken = 0;
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
                attempted: 0,
                not_answered: 0,
                not_visited: 0,
                review_later: 0,
                answered_marked: 0,

                questions: []
              })
              this.sectionObject[this.sectionObject.length - 1].questions.push(element);

            }
          });
          
        }

        // getting not visited count
        this.sectionObject.forEach( (section) => {
          section.not_visited = section.questions.length - 1;
        });

        this.testObject['sectionObject'] = this.sectionObject;
        this.testObject['attempted'] = 0;
        this.testObject['not_answered'] = 0;
        this.testObject['not_visited'] = questions.rows.length;
        this.testObject['review_later'] = 0;
        this.testObject['answered_marked'] = 0;
        
        this.getQuestion(this.activeSectionIndex, this.activeQuestionIndex);
      },
      err => console.log(err)
    );
    console.log(this.sectionObject);
    console.log(this.testObject);
  }

  getQuestionOfSection(sectionIndex) {
    this.activeQuestionIndex = 0;
    this.activeSectionIndex = sectionIndex;
    this.getQuestion(this.activeSectionIndex, this.activeQuestionIndex);
  }


  getQuestion(sectionIndex, questionIndex) {
    this.testService.getQuestionDetails(this.sectionObject[sectionIndex].questions[questionIndex].questions_id).subscribe(
      quest => {
        this.questions = quest.rows;
        this.questions.answerStatus = "";
      },
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
    // debugger;
    
    // check for question status and update it 
    if(this.expectedAnswer){
      this.questions.answerStatus = "answered";
      console.log(this.expectedAnswer);
      // increment the answered value from section object
      this.sectionObject[this.activeSectionIndex].attempted = this.sectionObject[this.activeSectionIndex].attempted + 1;
    }else{
      this.questions.answerStatus = "skipped";
      // increment the answered value from section object
      this.sectionObject[this.activeSectionIndex].not_answered = this.sectionObject[this.activeSectionIndex].not_answered + 1;
    }
    this.postActivity(this.questions);
    console.log(this.questions);

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

    // decrement the not_visited value from section object
    this.sectionObject[this.activeSectionIndex].not_visited = this.sectionObject[this.activeSectionIndex].not_visited - 1;
    // this.testObject.sectionObject[this.activeSectionIndex]['not_visited'] = this.sectionObject[this.activeSectionIndex].not_visited - 1;
    this.clear();
    this.scrollToTop();
  }

  markForReview(){

    if (this.expectedAnswer) {
      this.questions.answerStatus = "Answered And Review Later";
      // increment the answered value from section object
      this.sectionObject[this.activeSectionIndex].answered_marked = this.sectionObject[this.activeSectionIndex].answered_marked + 1;
      console.log(this.expectedAnswer);
    } else {
      this.questions.answerStatus = "Review Later";
      this.sectionObject[this.activeSectionIndex].review_later = this.sectionObject[this.activeSectionIndex].review_later + 1;
    }
    
    console.log(this.questions);

    
    if (this.sectionObject[this.activeSectionIndex].questions[this.activeQuestionIndex + 1]) {
      this.activeQuestionIndex++;
    } else if (this.sectionObject[this.activeSectionIndex + 1]) {
      this.activeQuestionIndex = 0;
      this.activeSectionIndex++;
    } else {
      alert('No Next Question to be display');
      return;
    }
    // this.postActivity(this.questions);
    this.getQuestion(this.activeSectionIndex, this.activeQuestionIndex);

    // decrement the not_visited value from section object
    this.sectionObject[this.activeSectionIndex].not_visited = this.sectionObject[this.activeSectionIndex].not_visited - 1;
    console.log(this.testObject.sectionObject[0]['review_later']);

    this.clear();
    this.scrollToTop();
  }

  postActivity(questions){
    const data = {
      "test_id": '403',
      "section_id": this.sectionObject[this.activeSectionIndex].section_id,
      "questions_id": questions.questions_id,
      // "user_answer": questions.selectedAnswers.sort(),
      "user_answer": this.expectedAnswer,
      // "time_taken": (questions.ticks * 1000),
      "time_taken": 1200,
      "questions_type": questions.questions_type,
      "user_id": JSON.parse(localStorage.getItem('verified')).User_id,
      "client_id": JSON.parse(localStorage.getItem('verified')).client_client_id,
      "attempt_status": questions.answerStatus,
      "questions_difficulty_level": questions.questions_difficulty_level,
      "questions_average_time": questions.questions_average_time,
      "questions_chapter_id": questions.questions_chapter_id,
      "questions_subject_id": questions.questions_subject_id,
      "questions_positive_marks": questions.questions_positive_marks,
      "questions_negative_marks": questions.questions_negative_marks,
      "questions_answer": questions.questions_answer
    }

    this.testService.postAnswer(data)
      .subscribe(
      data => {
        //start the timer back again to get time spent on the new question
      },
      err => {
        console.log("error", err);
      }, () => {
        console.log("Question Post");
        // this.model.selectedAnswers = [];
        // this.model.clearInput = '';
        // if (queNo !== this.model.questionList.length) {
        //   this.questionSelect(queNo + 1);
        // } else {
        //   this.finishTest(false);
        // }
      });
  }

}
