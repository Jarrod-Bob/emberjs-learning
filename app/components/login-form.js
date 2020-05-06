import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class LoginFormComponent extends Component {
  @tracked
  userId = null;

  @tracked
  email = '';

  @tracked
  password = '';

  @tracked errorMessage;
  /**
   * @type {AuthService}
   */
  @service auth;

  @service session;

  get isDisabled() {
    return !this.userId;
  }

  @action
  updateEmail(evt) {
    this.email = evt.target.value;
  }

  @action
  updatePassword(evt) {
    this.password = evt.target.value;
  }


  /**
   * 
   * @param {Event & {target: HTMLSelectElement}} evt 
   */
  @action
  onSelectChanged(evt) {
    this.userId = evt.target.value;
  }

  /**
   * 
   * @param {Event & {target: HTMLFormElement}} evt 
   */
  @action
  onLoginFormSubmit(evt) {
    const { target } = evt;
    const val = target.querySelector('select').value;
    evt.preventDefault();
    this.auth.loginWithUserId(val);
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }

  @action
  authenticate(evt) {
    evt.preventDefault();
    // console.log(this.email ,this.password);
    this.auth.login(this.email, this.password);
  }

  // @action
  // async authenticate() {
  //   let email, password;
  //   try {
  //     await this.session.authenticate('authenticator:oauth2', {
  //       email: email,
  //       password: password
  //     }).then(() => {

  //     });
  //   } catch(error) {
  //     this.errorMessage = error.error || error;
  //   }

  //   if (this.session.isAuthenticated) {
  //     console.log("success");
  //   }
  // }

}
