import { Component, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit, OnInit {

  isAuthenticated: boolean = false;
  userNameInitial: any = null;
  rol = null;
  constructor(private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  ngOnInit(): void {
    this.userNameInitial = this.authService.getUser();
    this.rol = this.userNameInitial.rol;
  }

  logout(): void {
    this.authService.logout();
  }
  scrollElements!: NodeListOf<Element>;

  ngAfterViewInit() {
    this.scrollElements = document.querySelectorAll('.js-scroll');
    this.handleScrollAnimation(); // Initial check after view initializes
  }

  // Function to check if the element is in view
  elementInView(el: Element, dividend: number = 1): boolean {
    const elementTop = (el as HTMLElement).getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  }

  // Function to display the scroll element
  displayScrollElement(element: Element): void {
    (element as HTMLElement).classList.add('scrolled');
  }

  // Function to handle the scroll animation
  handleScrollAnimation(): void {
    this.scrollElements.forEach((el) => {
      if (this.elementInView(el, 1.25)) {
        this.displayScrollElement(el);
      }
    });
  }

  // HostListener to listen to scroll events
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.handleScrollAnimation();
  }
}
