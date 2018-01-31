import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

@Component({
	selector: 'app-TestAck',
	templateUrl: './TestAck.component.html',
	styleUrls: ['./TestAck.component.scss']
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