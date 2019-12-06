import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Customer} from '../models/customer';
import {CustomerLogin} from '../models/customer-login';
import {LoginResponse} from '../models/login-response';
import {AccountDetails} from '../models/account-details';

@Injectable({
  providedIn: 'root'
})
export class  FirebaseConnectionService {

  loginURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAR4Yezxk7Ao4qeFntu7tIvE7pH28Eh64Y';

  // tslint:disable-next-line:max-line-length
  clientURL = 'https://momentum-retail-practical-test.firebaseio.com/clients/<localId_from_login_response>.json?auth=<idToken_from_login_response>';
  // tslint:disable-next-line:max-line-length
  accountListUpdateURL = 'https://momentum-retail-practical-test.firebaseio.com/clients/<localId_from_login_response>/accounts.json?auth=<idToken_from_login_response>';

  accountUrl = 'https://momentum-retail-practical-test.firebaseio.com/accounts/<account_number>.json?auth=<idToken_from_login_response>';

  // tslint:disable-next-line:max-line-length
  accountUpdateCreate = 'https://momentum-retail-practical-test.firebaseio.com/accounts/<account_number>.json?auth=<idToken_from_login_response>';



  constructor(private httpClient: HttpClient) {}

  public login(loginDetails: CustomerLogin) {
    return this.httpClient.post<LoginResponse>(`${this.loginURL}`, loginDetails);
  }

  public clientDetails(loginResponse: LoginResponse) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(`${this.clientURL.replace('<localId_from_login_response>', loginResponse.localId).replace('<idToken_from_login_response>', loginResponse.idToken)}`);
  }

  public updateClient(loginResponse: LoginResponse, customer: Customer) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put(`${this.accountListUpdateURL.replace('<localId_from_login_response>', loginResponse.localId).replace('<idToken_from_login_response>', loginResponse.idToken)}`, customer);
  }

  public retrieveAccount(loginResponse: LoginResponse, account: AccountDetails) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<AccountDetails>(`${this.accountUrl.replace('<account_number>', account.accountNumber + '' ).replace('<idToken_from_login_response>', loginResponse.idToken)}`);
  }

  public updateAccountCreate(loginResponse: LoginResponse, account: AccountDetails) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put(`${this.accountUpdateCreate.replace('<account_number>', account.accountNumber + '').replace('<idToken_from_login_response>', loginResponse.idToken)}`, account);
  }
}
