import { Component, signal } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component'; 
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [LandingPageComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('landingpage-project');
}
