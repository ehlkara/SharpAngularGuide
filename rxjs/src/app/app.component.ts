import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      // subscriber.error();
      if (timesExecuted > 5) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...')
      subscriber.next({ message: 'New Value' });
      timesExecuted++;
    }, 2000);
  });
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
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Interval completed'),
      error: (error) => console.log('Error', error)
    });
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
