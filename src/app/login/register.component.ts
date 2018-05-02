import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
//import * as swal from 'sweetalert';
import swal from 'sweetalert'
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public _router: Router
  ) { }

  comparar(campo1: string, campo2: string) {
    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      
      if ( pass1 === pass2 ) {
        return null;  
      }

      return { comparar: true };
    }
  }

  ngOnInit() {
    init_plugins();


    this.form = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      confirmPassword: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.comparar('password', 'confirmPassword') });


    this.form.setValue({
      nombre: 'User ',
      correo: 'user@user.com',
      password: '123456',
      confirmPassword: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {

    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.form.value.nombre,
      this.form.value.correo,
      this.form.value.password
    );

    this._usuarioService.crearUsuario( usuario )
        .subscribe( resp => this._router.navigate(['/login']));
  }
}
