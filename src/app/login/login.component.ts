import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  public auth2: any;

  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '923516345543-a1apacli5mbs0bm8nqrl4t7po32lb1ic.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE

        let token = googleUser.getAuthResponse().id_token;

        this._usuarioService.loginGoogle(token)
              .subscribe(resp => window.location.href = '#dashboard');

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
      this.googleInit();
  }

  ingresar(f: NgForm) {

    if (f.invalid) {
      return;
    }

    let usuario = new Usuario(null, f.value.email, f.value.password);

    this._usuarioService.login(usuario, f.value.recuerdame)
          .subscribe( resp => this.router.navigate(['/dashboard']) );
  }
}
