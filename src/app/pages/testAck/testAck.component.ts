import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

@Component({
	selector: 'app-TestAck',
	templateUrl: './testAck.component.html',
	styleUrls: ['./testAck.component.scss']
})
export class TestAckComponent {
	constructor(private router: Router) {
	}

	logout(){
		localStorage.clear();
		// this.router.navigate(['']);
		window.close();
	}
}