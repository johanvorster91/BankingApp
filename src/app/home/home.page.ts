import {Component, OnInit} from '@angular/core';
import {FirebaseConnectionService} from '../services/firebase-connection.service';
import { Storage } from '@ionic/storage';
import {Customer} from '../models/customer';
import {AccountDetails} from '../models/account-details';
import {ModalController} from '@ionic/angular';
import {ChangePage} from '../modals/change/change.page';
import {CreateAccountPage} from '../modals/create-account/create-account.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private api: FirebaseConnectionService, private storage: Storage, public modalController: ModalController) {
    this.accountObj = [];
    this.storage.get('loginResponse').then((val) => {
      this.loginResponse = val;
      this.getAccounts();
    });
  }

  clientDetails: Customer;
  clientName: string;
  clientAge: string;
  accountNumbers: number[];
  accountObj: AccountDetails[];
  loginResponse: any;
  public lunch = {
    mainCourse: 'steak',
    desert: 'pudding'
  };
  public dinner: string;

  getAccounts() {
    this.api.clientDetails(this.loginResponse).subscribe((clientDetails) => {
      this.clientName = clientDetails.accounts.name;
      this.clientAge = clientDetails.accounts.age;
      this.clientDetails = clientDetails.accounts;
      console.log(this.clientDetails);
      this.accountNumbers = clientDetails.accounts.accounts;
      this.getBalances();
    });
  }


  getBalances() {
    this.accountNumbers.forEach(accountNumber => {
      const details = new AccountDetails();
      details.accountNumber = accountNumber;
      this.api.retrieveAccount(this.loginResponse, details).subscribe((accountResponse => {
        const acct = new AccountDetails();
        acct.accountNumber = accountNumber;
        acct.balance = accountResponse.balance;
        this.accountObj.push(acct);
      }));
    });

  }

  async openChangeModal(account, type) {
    const api = this.api;
    const loginResponse = this.loginResponse;
    const modal = await this.modalController.create({
      component: ChangePage,
      componentProps: {
        account,
        type,
        api,
        loginResponse
      }
    });
    return await modal.present();
  }

  async openCreateModal() {
    const api = this.api;
    const loginResponse = this.loginResponse;
    const customer = this.clientDetails;
    const modal = await this.modalController.create({
      component: CreateAccountPage,
      componentProps: {
        api,
        loginResponse,
        customer
      }
    });
    return await modal.present();
  }
}

