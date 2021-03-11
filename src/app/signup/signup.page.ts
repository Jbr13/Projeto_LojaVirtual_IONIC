import { UtilService } from './../util.service';
import { User } from './../interfaces/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public userRegister: User = {};
  private loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private util: UtilService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  async register() {

    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
      this.util.setMenuState(true);
      this.navCtrl.navigateRoot('/home', { animationDirection: 'forward' });
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
