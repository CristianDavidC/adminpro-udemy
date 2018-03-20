import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription; // Para manejar los subscribe y unsuscribe al observable

  constructor() {
    /** Observable directo */

    // let obs = new Observable( observer => {
    //    let contador = 0;   
    //    let intervalo = setInterval(() =>{
    //     contador += 1;
    //     observer.next(contador);
    //     if(contador === 3) {
    //       clearInterval(intervalo);
    //       observer.complete();
    //     }

    //     if(contador === 2) {
    //       // clearInterval(intervalo);
    //       observer.error('AUXILIO');
    //     }
    //   },1000)
    // });

    /** El observable tiene 3 callbacks : next, error, complete */
    
    // obs.retry(2) // Especifica cuantas veces se puede repetir. Recibe dos paramatros
    // .subscribe( numero => {
    //   console.log('Subs ', numero);
    // },
    // error => {
    //   console.error('ERROR ',error);
    // },
    // () => {
    //   console.log('El observador terminó');
    // })

    /** Llamado desde funcion */

    // this.regresaObservable()
    //   .retry(2) // Especifica cuantas veces se puede repetir. Recibe dos paramatros
    //   .subscribe( numero => {
    //     console.log('Subs ', numero);
    //   },
    //   error => {
    //     console.error('ERROR ',error);
    //   },
    //   () => {
    //     console.log('El observador terminó');
    //   })

    // this.regresaObservableMap()
    //   .subscribe( numero => {
    //     console.log('Subs ', numero);
    //   },
    //   error => {
    //     console.error('ERROR ',error);
    //   },
    //   () => {
    //     console.log('El observador terminó');
    //   })

    //  this.regresaObservableFilter()
    //   .subscribe( numero => {
    //     console.log('Subs ', numero);
    //   },
    //   error => {
    //     console.error('ERROR ',error);
    //   },
    //   () => {
    //     console.log('El observador terminó');
    //   })

    this.suscription = this.regresaObservableUnsuscribe()
      .subscribe( numero => {
        console.log('Subs ', numero);
      },
      error => {
        console.error('ERROR ',error);
      },
      () => {
        console.log('El observador terminó');
      })
   }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.suscription.unsubscribe();
  }

  regresaObservable(): Observable<number> {
    return new Observable( observer => {
       let contador = 0;   
       let intervalo = setInterval(() =>{
        contador += 1;
        observer.next(contador);
        if(contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        if(contador === 2) {
          // clearInterval(intervalo);
          observer.error('AUXILIO');
        }
      },1000)
    });
  }

  regresaObservableMap(): Observable<any> {
    return new Observable( observer => {
       let contador = 0;   
       let intervalo = setInterval(() =>{
        contador += 1;
        let salida = {
          valor: contador
        }
        observer.next(salida);
        if(contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
      },1000)
    })
    .retry(2)
    .map( (result: any) => { // Para que no marque error en la salida 
        return result.valor;
    });
  }

  regresaObservableFilter(): Observable<any> {
    return new Observable( observer => {
       let contador = 0;   
       let intervalo = setInterval(() =>{
        contador += 1;
        let salida = {
          valor: contador
        }
        observer.next(salida);
        if(contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
      },1000)
    })
    .map( (result: any) => { // Para que no marque error en la salida 
        return result.valor;
    })
    .filter( (valor: any, index: number ) => { // index es parametro opcional
      // console.log('Filter ', valor, index);
      return (valor % 2) === 1 ? true : false; 
    });
  }

  regresaObservableUnsuscribe(): Observable<any> {
    return new Observable( observer => {
       let contador = 0;   
       let intervalo = setInterval(() =>{
        contador += 1;
        let salida = {
          valor: contador
        }
        observer.next(salida);
        // if(contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
      },500)
    })
    .map( (result: any) => { // Para que no marque error en la salida 
        return result.valor;
    })
    .filter( (valor: any, index: number ) => { // index es parametro opcional
      // console.log('Filter ', valor, index);
      return (valor % 2) === 1 ? true : false; 
    });
  }
}
