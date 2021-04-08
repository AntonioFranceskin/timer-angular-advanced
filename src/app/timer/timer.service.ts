import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TimerService {
  private countdownTimerRef: any = null;


  //  1.- Comentar esta  propiedad

  //public countdown:number = 0;


  public paused: boolean = true;
  private init: number = 0;


  private countdownEndSource = new Subject<void>();
  public countdownEnd$ = this.countdownEndSource.asObservable();


  //  1.- Declarar  el  BehaviorSubject
  // Un BehaviorSubject se diferencia de un Subject  porque  siempre tiene un  valor (estado)
  // Al subcribirme a  un BehaviorSubject  obtengo el ultimo valor
  // Para  asignar  un valor  se utiliza el metodo next();

  private countdownSource = new BehaviorSubject<number>(0);
  public countdown$ = this.countdownSource.asObservable();


  constructor() { }

  destroy(): void {
    this.clearTimeout();
  }

  restartCountdown(init?) {
    if (init) this.init = init;
    if (this.init && this.init > 0) {
      this.paused = true;
      this.clearTimeout();

      //  2.- asignar this.init  al  contador en este  caso  al BehaviorSubject
      this.countdownSource.next(this.init);
      //this.countdown = this.init;
    }
  }

  toogleCountdown() {
    this.paused = !this.paused;
    if (this.paused == false) {
      this.doCountdown();
    }
    else {
      this.clearTimeout();
    }
  }

  private doCountdown() {
    this.countdownTimerRef = setTimeout(() => {

       //  3.- obtener el valor  del   BehaviorSubject en este  instante

       this.countdownSource.next(this.countdownSource.getValue() -1);

      //this.countdown = this.countdown - 1;
      this.processCountdown();
    }, 1000);
  }

  private processCountdown() {


//  4.- obtener el valor  del   BehaviorSubject en este  instante

    //if (this.countdown == 0) {

      if (this.countdownSource.getValue() <= 0) {
      this.countdownEndSource.next();

      console.log("--countdown end--");
    }
    else {
      this.doCountdown();
    }
  }

  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

}
