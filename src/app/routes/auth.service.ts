import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
// import { auth } from 'firebase/app';
import { ToasterService } from '../services/toaster.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    public toast : ToasterService,
    public users : UserService,
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user.uid;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  async SignIn(email : string, password : string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result) {
          if(result.user.emailVerified == true){

            const dados = {
              uid: result.user.uid || "",
              name: result.user.displayName || "",
              email: result.user.email || "",
              photoURL: result.user.photoURL || ""
            };

            this.users.user_id = dados.uid;
            localStorage.setItem('user', JSON.stringify(dados.uid));
            this.router.navigate(['home-desktop']);
            // this.SetUserData(dados);
          }
          else {
            this.toast.presentToast('Conta não validada, acesse seu email e abra o link para concluir o cadastro', 'danger', 2000 )
          }
        }
        else {
          this.toast.presentToast('Falha ao consultar banco, tente novamente', 'danger', 2000 )
        }

      }).catch((error) => {
        console.error(error);
        this.toast.presentToast('Login ou senha inválidos', 'danger', 2000 )
      })
  }

  // Sign up with email/password
  async SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider());
  // }

  // Auth logic to run auth providers
  async AuthLogin(provider) {
    return await this.afAuth.signInWithPopup(provider)
    .then((result) => {
      console.warn(result);
      this.ngZone.run(() => this.router.navigate(['home-desktop']));
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user : any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'Sem Nome',
      photoURL: user.photoURL || '../../assets/images/avatar.png',
      emailVerified: user.emailVerified || '',
      role: user.role || 'user',
      theme: {
        color1: user.color1 || '#5d66d3',
        color2: user.color2 || '#353a85',
        color3: user.color3 || '#ffffff',
      },
      materias: user.materias || []
    };

    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  async SignOut() {
    return await this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  setUserRole(id : string, dados : any){
    return this.afs.collection('usuarios').doc(id).update(dados);
  }

}