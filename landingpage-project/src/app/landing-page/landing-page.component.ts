import { CommonModule } from '@angular/common';
import { Component, HostListener, signal, computed } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  private readonly SEGMENT_COUNT = 3;
  scrollPosition = signal(0);
  currentSegment = signal(0);
  scrollProgress = signal(0);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const segmentIndex = Math.floor(scrollY / viewportHeight);
    const scrollInSegment = scrollY % viewportHeight;
    const progress = Math.min(1, scrollInSegment / viewportHeight);
    this.scrollPosition.set(scrollY);
    this.currentSegment.set(segmentIndex);
    this.scrollProgress.set(progress);
  }

  screen1Style = computed(() => {
    const progress = this.scrollProgress();
    if (this.currentSegment() === 0) {
      const y = progress * 100;
      const scale = 1 - progress * 0.05;
      const opacity = 1 - progress * 0.5;
      return {
        transform: `translateY(-${y}vh) scale(${scale})`,
        opacity: `${opacity}`,
        'z-index': 13,
      };
    }
    return { transform: 'translateY(-100vh) scale(0.95)', opacity: '0', 'z-index': 10 };
  });

  screen2Style = computed(() => {
    const segment = this.currentSegment();
    const progress = this.scrollProgress();
    if (segment === 0) {
      const scale = 0.95 + progress * 0.05;
      return { transform: 'translateY(0)', opacity: '1', 'z-index': 12, scale: `${scale}` };
    }
    if (segment === 1) {
      const y = progress * 100;
      const scale = 1 - progress * 0.05;
      const opacity = 1 - progress * 0.5;
      return {
        transform: `translateY(-${y}vh) scale(${scale})`,
        opacity: `${opacity}`,
        'z-index': 12,
      };
    }
    return { transform: 'translateY(-100vh) scale(0.95)', opacity: '0', 'z-index': 10 };
  });

  screen3Style = computed(() => {
    const segment = this.currentSegment();
    const progress = this.scrollProgress();
    if (segment < 2) {
      const scale = 0.9 + segment * 0.05 + progress * 0.05;
      return { transform: 'translateY(0)', opacity: '1', 'z-index': 11, scale: `${scale}` };
    }
    if (segment === 2) {
      const y = progress * 100;
      const opacity = 1 - progress;
      const scale = 1 - progress * 0.05;
      return {
        transform: `translateY(-${y}vh) scale(${scale})`,
        opacity: `${opacity}`,
        'z-index': 11,
      };
    }
    return { transform: 'translateY(-100vh) scale(0.95)', opacity: '0', 'z-index': 10 };
  });

  footerOpacity = computed(() => {
    const scrollY = this.scrollPosition();
    const viewportHeight = window.innerHeight;
    const totalHeight = this.SEGMENT_COUNT * viewportHeight;
    const extraScroll = scrollY - totalHeight;
    const fadeDistance = viewportHeight * 0.5;
    if (extraScroll <= 0) return 0;
    const opacity = Math.min(1, extraScroll / fadeDistance);
    return opacity;
  });
}
