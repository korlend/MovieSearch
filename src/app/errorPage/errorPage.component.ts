import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'errorPage',
    templateUrl: './errorPage.component.html',
    styleUrls: ['./errorPage.component.scss']
})
export class ErrorPageComponent implements OnInit {

    url: string;

    constructor(private router: Router) {
        
    }

    ngOnInit(): void {
        this.url = this.router.url;
        console.log(this.router.parseUrl(this.url));
    }
}
