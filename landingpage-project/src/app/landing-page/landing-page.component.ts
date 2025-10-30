import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  signal,
  computed,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  scrollPosition = signal(0);
  currentSegment = signal(0);
  scrollProgress = signal(0);

  private readonly SEGMENT_COUNT = 2;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    let segmentIndex = Math.floor(scrollY / viewportHeight);

    const scrollInSegment = scrollY % viewportHeight;
    const progress = Math.min(1, scrollInSegment / viewportHeight);

    this.scrollPosition.set(scrollY);
    this.currentSegment.set(segmentIndex);
    this.scrollProgress.set(progress);
  }

  screen1Style = computed(() => {
    const segment = this.currentSegment();
    const progress = this.scrollProgress();

    if (segment === 0) {
      const y = progress * 100;
      const scale = 1 - progress * 0.1;
      const opacity = 1 - progress * 0.5;
      return {
        transform: `translateY(-${y}vh) scale(${scale})`,
        opacity: `${opacity}`,
        'z-index': 12,
      };
    }
    return { transform: 'translateY(-100vh) scale(0.9)', opacity: '0', 'z-index': 10 };
  });

  screen2Style = computed(() => {
    const segment = this.currentSegment();
    const progress = this.scrollProgress();

    if (segment === 0) {
      const scale = 0.95 + progress * 0.05;
      return { transform: 'translateY(0)', opacity: '1', 'z-index': 11, scale: `${scale}` };
    }

    if (segment === 1) {
      const y = progress * 100;
      const scale = 1 - progress * 0.1;
      const opacity = 1 - progress * 0.5;
      return {
        transform: `translateY(-${y}vh) scale(${scale})`,
        opacity: `${opacity}`,
        'z-index': 11,
      };
    }

    return { transform: 'translateY(-100vh) scale(0.9)', opacity: '0', 'z-index': 10 };
  });

  screen3Style = computed(() => {
    const segment = this.currentSegment();
    const progress = this.scrollProgress();

    if (segment < 2) {
      let scale = 0.9 + segment * 0.05 + progress * 0.05;
      return { transform: 'translateY(0)', opacity: '1', 'z-index': 10, scale: `${scale}` };
    }

    if (segment === 2) {
      const y = progress * 100;
      const scale = 1 - progress * 0.1;
      const opacity = 1 - progress * 0.5;
      return {
        transform: `translateY(-${y}vh) scale(${scale})`,
        opacity: `${opacity}`,
        'z-index': 10,
      };
    }

    return { transform: 'translateY(-100vh) scale(0.9)', opacity: '0', 'z-index': 10 };
  });

  footerOpacity = computed(() => {
    const segment = this.currentSegment();
    const progress = this.scrollProgress();

    if (segment === this.SEGMENT_COUNT) {
      return progress;
    }

    if (segment > this.SEGMENT_COUNT) {
      return 1;
    }

    return 0;
  });
}
