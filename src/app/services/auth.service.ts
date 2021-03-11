import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFAuth: AngularFireAuth,
  ) { }

  login(user: User) {
    return this.angularFAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.angularFAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.angularFAuth.signOut();
  }

  getAuth() {
    return this.angularFAuth;
  }

}
