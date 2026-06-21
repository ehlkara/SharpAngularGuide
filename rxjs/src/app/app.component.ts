import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);
  // private message = signal('Hello!');

  constructor() {
    // effect(() => {
    //   console.log('Clicked ', this.clickCount(), ' times.')
    // });
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.interval.set(this.interval() + 1);
    // }, 1000);
    // console.log(this.message());
    // const subscription = interval(1000).pipe(
    //   map((val) => val * 10)
    // ).subscribe({
    //   next: (val) => console.log(val),
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
    const subscription = this.clickCount$.subscribe({
      next: (value) => console.log('Clicked', value, 'times')
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((count) => count + 1);
  }

}
