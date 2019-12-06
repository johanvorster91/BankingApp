import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ChangePage } from '../modals/change/change.page';
import {CreateAccountPage} from '../modals/create-account/create-account.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ChangePage, CreateAccountPage],
  entryComponents: [ChangePage, CreateAccountPage]
})
export class HomePageModule {}
