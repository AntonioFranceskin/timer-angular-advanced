import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService]
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;
  private countdownEndSubscription: Subscription;
  private countdownSubscription: Subscription;
  public countdown: number = 0;
get progress() {
  return (this.init - (this.countdown) )/this.init*100
}
  constructor(public timer: TimerService) { }

  ngOnDestroy(): void {
    this.timer.destroy();
    this.countdownEndSubscription.unsubscribe();
    this.countdownSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.timer.restartCountdown(this.init);
    this.countdownEndSubscription = this.timer.countdownEnd$.subscribe(() => {
      console.log('---- countdown end----');
      this.onComplete.emit();
    });
    this.countdownSubscription = this.timer.countdown$.subscribe((data) => {
      this.countdown = data;
    });


  }

}
