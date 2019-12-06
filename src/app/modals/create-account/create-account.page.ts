import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {AccountDetails} from '../../models/account-details';
import {LoginResponse} from '../../models/login-response';
import {Customer} from '../../models/customer';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {

  constructor(private modalController: ModalController, public toastController: ToastController) {}
  @Input() public api: any;
  @Input() public loginResponse: LoginResponse;
  @Input() public customer: Customer;
  overdraft: any;

  async closeModal() {
    await this.modalController.dismiss();
  }

  createAccount() {
    const newAccount = new AccountDetails();
    newAccount.balance = 0;
    newAccount.accountNumber = Math.floor(Math.random() * 1000000000);
    newAccount.overdraft = this.overdraft;
    this.api.updateAccountCreate(this.loginResponse, newAccount).subscribe(( resp ) => {
      this.customer.accounts.push(newAccount.accountNumber)
      this.api.updateClient(this.loginResponse, this.customer).subscribe(() => {
        this.presentToast();
        this.closeModal();
      });
    });

  }

  async presentToast() {
    const toast = await this.toastController.create({
      position: 'middle',
      message: 'Transaction successful',
      duration: 2000
    });
    toast.present();
  }

}
