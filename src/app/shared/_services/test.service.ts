import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()

export class TestService {

    baseUrl: string = "http://35.154.35.118:3003";

    constructor(private http: Http) { }

    getQuestions(testId = 403, clientId = 1): Observable<any> {
        return this.http.get(`${this.baseUrl}/getQuestionsInATestUser?test_id=${testId}&client_id=${clientId}`)
            .map(res => res.json());
    }

    getQuestionDetails(questionId, userId = 2, clientId = 1) {
        return this.http.get(`${this.baseUrl}/getQuestionDetailsWithOptionsUser?client_id=${clientId}&questions_id=${questionId}&user_id=${userId}`)
            .map(res => res.json());
    }

    postAnswer(data) {
        return this.http.post(this.baseUrl + '/postActivityDuringTestUser', data)
            .map((res) => res.json());
    }

}