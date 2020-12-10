import { 
  Component, 
  ElementRef, 
  Input,
} from '@angular/core'

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { 
  AutofillEvent, 
  CdkTextareaAutosize 
} from '@angular/cdk/text-field';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

let uid = 0;

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  host: {
    '[class.filled]': '!empty',
  }
})
export class TextInput {
  @Input() name: string;

  @Input() label: string;

  @Input()
  get multiline(): boolean {
    return this._multiline;
  }
  set multiline(val: boolean) {
    this._multiline = coerceBooleanProperty(val);
  }
  _multiline = false;

  @Input() control;

  id = `text-input-${uid++}`;

  empty = true;

  destroyed = new Subject();

  constructor(private el: ElementRef, private fm: FocusMonitor) {
    fm.monitor(el.nativeElement, true);
  }

  ngOnInit() {
    this.empty = !this.control.value;
    this.control.valueChanges.pipe(takeUntil(this.destroyed))
        .subscribe(val => this.empty = !val);
  }

  ngOnDestory() {
    this.fm.stopMonitoring(this.el.nativeElement);
    this.destroyed.next();
    this.destroyed.complete();
  }

  autofillChange(e: AutofillEvent, autosize?: CdkTextareaAutosize) {
    this.el.nativeElement.classList.toggle(
        'autofilled', e.isAutofilled);
    if (autosize) {
      autosize.resizeToFitContent(true);
    }
  }

  clear() {
    this.control.reset();
    this.el.nativeElement.querySelector('textarea,input').focus();
  }
}