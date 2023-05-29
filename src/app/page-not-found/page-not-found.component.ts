import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  constructor(private router: Router) {}

  currentUrl: string = "https://roach.buffsovernexus.com" + this.router.url;

  handleClick() {
    console.log("triggered");
    this.router.navigate(['login']);
  }
}
