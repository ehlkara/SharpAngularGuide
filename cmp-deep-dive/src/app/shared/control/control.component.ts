import {
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent {
  // @HostBinding('class') className = 'control';
  // @HostListener('click', ['$event']) onClick(event: Event) {
  //   console.log(event);
  // }
  label = input.required<string>();
  private el = inject(ElementRef);

  // @ContentChild('input') private readonly control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;

  private readonly control = contentChild<
    HTMLInputElement | HTMLTextAreaElement
  >('input');

  onClick() {
    console.log(this.el);
    console.log(this.control());
  }
}
