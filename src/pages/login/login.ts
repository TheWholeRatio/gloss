import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Config, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';



import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type


  constructor(public navCtrl: NavController,
    public user: User,
    public platform: Platform,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private googlePlus: GooglePlus,
    public statusBar: StatusBar) {
      platform.ready().then(() => {
        console.log("initialized ")
        this.silentLoginGoogle()
        this.statusBar.overlaysWebView(true);
      });
  }

  ionViewWillLeave() {
    this.statusBar.overlaysWebView(false);
  }
  ionViewWillEnter(){
    this.statusBar.overlaysWebView(true);
  }
  // Attempt to login in through our User service
  loginGoogle() {
    console.log('this happened')
    this.googlePlus.login({
      'webClientId': ''
    }).then((res) => {
        console.log(JSON.stringify(res));
    }, (err) => {
        console.log(err);
    });
  }

  logoutGoogle(){
    console.log("this was called")
    this.googlePlus.logout()
    .then((res) => {
        console.log(JSON.stringify(res));
    }, (err) => {
        console.log(err);
    });
  }

  silentLoginGoogle(){
    this.googlePlus.trySilentLogin({
      'webClientId': '842226328889-8norh1jltjp13097b79i1n9lfpjdoh4c.apps.googleusercontent.com'
    }).then((res) => {
        console.log("silent login complete")
        console.log(res);
        this.user.imageUrl = res.imageUrl;
        this.user.firstName = res.givenName;
        this.user.lastName = res.familyName;
        this.user.token = res.token;
        this.nav.setRoot();

    }, (err) => {
        console.log("silent login failed")
        console.log(err);
    });
  }
}
