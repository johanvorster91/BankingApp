import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import {FirebaseConnectionService} from '../../services/firebase-connection.service';
import {CustomerLogin} from '../../models/customer-login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private api: FirebaseConnectionService, private  router: Router, private storage: Storage) { }

  ngOnInit() {
  }

  login(form) {
    const customerLogin  = new CustomerLogin();
    customerLogin.email = form.value.email;
    customerLogin.password = form.value.password;
    customerLogin.returnSecureToken = true;
    this.api.login((customerLogin)).subscribe((loginResponse) => {
        this.storage.set('loginResponse', loginResponse);
        this.router.navigateByUrl('home');
    });
  }
}
