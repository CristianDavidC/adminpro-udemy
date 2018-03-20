import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    /** Crear promesa directamente */
    // let promesa = new Promise((resolve, reject) => {
    // let contador = 0;
    // let intervalo = setInterval(() =>{
    //     contador += 1;
    //     console.log(contador);
    //     if(contador === 3) {
    //       resolve('SUCCESS!');
    //       // reject('ERROR!');
    //       clearInterval(intervalo);
    //     }
    //   },1000)
    // });

    // promesa.then(
    //   result => console.log('Terminó, ', result) // El mensaje puede tener cualquier nombre
    // )
    // .catch (error => console.log('Error en la promesa, ', error))

    /** Llama a la función que retorna una promesa */
    this.contar().then(
      result => console.log('Terminó, ', result) // El mensaje puede tener cualquier nombre
    )
    .catch (error => console.log('Error en la promesa, ', error))
  }

  ngOnInit() {
  }

  // Función que retorna una promesa. Se puede especificar el tipo de dato que devuelve la promesa.
  contar(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() =>{
          contador += 1;
          // console.log(contador);
          if(contador === 3) {
            resolve(true); // Tipo de dato devuelto. Ej: bool, string, etc
            // reject('ERROR!');
            clearInterval(intervalo);
          }
        },1000)
      });
  }
}
