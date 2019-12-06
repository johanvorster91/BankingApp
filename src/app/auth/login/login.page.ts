import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import {FirebaseConnectionService} from '../../services/firebase-connection.service';
import {CustomerLogin} from '../../models/customer-login';
import { Storage } from '@ionic/storage';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private api: FirebaseConnectionService, private  router: Router, private storage: Storage, public toastController: ToastController) {}

  ngOnInit() {
  }

  login(form) {
    const customerLogin  = new CustomerLogin();
    customerLogin.email = form.value.email;
    customerLogin.password = form.value.password;
    if (form.value.password.length < 6) {
      this.presentToast();
    } else {
      customerLogin.returnSecureToken = true;
      this.api.login((customerLogin)).subscribe((loginResponse) => {
        this.storage.set('loginResponse', loginResponse);
        this.router.navigateByUrl('home');
      });
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Invalid credentials',
      duration: 2000
    });
    toast.present();
  }
}
