import { Directive } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePaqge($event)',
  },
})
export class SafeLinkDirective {
  constructor() {
    console.log('SafeLinkDirective is active!');
  }

  onConfirmLeavePaqge(event: MouseEvent) {
    const wantToLeave = window.confirm(
      'Are you sure you want to leave this page?',
    );
    if (wantToLeave) {
      return;
    }
    event.preventDefault();
  }
}
