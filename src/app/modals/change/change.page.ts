import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {LoginResponse} from '../../models/login-response';
import {AccountDetails} from '../../models/account-details';
import {isNumber} from 'util';

@Component({
    selector: 'app-change',
    templateUrl: './change.page.html',
    styleUrls: ['./change.page.scss'],
})
export class ChangePage {

    constructor(private modalController: ModalController, public toastController: ToastController) {
    }

    @Input() public account: AccountDetails;
    @Input() public type: string;
    @Input() public api: any;
    @Input() public loginResponse: LoginResponse;
    amount: number;

    async closeModal() {
        await this.modalController.dismiss();
    }

    changeBalance() {
        if (!isNumber(this.amount)) {
            return;
        }

        if (!this.account.balance) {
            this.account.balance = 0;
        }
        if (this.type === 'Withdraw') {
            this.account.balance -= this.amount;
        } else if (this.type === 'Deposit') {
            this.account.balance += this.amount;
        }

        this.api.updateAccountCreate(this.loginResponse, this.account).subscribe((resp) => {
            this.presentToast();
            this.closeModal();
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
