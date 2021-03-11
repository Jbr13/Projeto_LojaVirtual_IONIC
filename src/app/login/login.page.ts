import { AuthService } from './../services/auth.service';
import { User } from './../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UtilService } from '../util.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userLogin: User = {};
  private loading: any;

  constructor(
    private util: UtilService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService

  ) { }

  ngOnInit() {
  }

  async login() {

    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
      this.util.setMenuState(true);
      this.navCtrl.navigateRoot('/home-products', { animationDirection: 'forward' });
    } catch (error) {
      console.log(error);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();

    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({message: 'Aguarde por favor...'});
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message });
    toast.present();
  }

}
