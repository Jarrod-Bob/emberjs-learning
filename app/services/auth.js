import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Router from '@ember/routing/router';
import CookiesService from 'ember-cookies/services/cookies';
import fetch from 'fetch';

const AUTH_KEY = 'shlack-userid'

export default class AuthService extends Service {
  @service session;
  // @action
  // login(email, password) {
  //   const resp = await fetch('', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   return resp.json();
  // }
  @action
  async login(email, password) {
    let authData = {
      auth: {
        email: email,
        password: password
      }
    };
    const resp = await fetch('https://engage.staging.saleswhale.com/api/v1/auth/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    })
    const obj = await resp.json();
    sessionStorage.setItem('token', obj.session.jwt);
    this.router.transitionTo('invitations');    
  }

  /**
   * @type {Router}
   */
  @service router;

  /**
   * @type {CookiesService}
   */
  @service cookies;

  get currentUserId() {
    return window.localStorage.getItem(AUTH_KEY);
  }

  loginWithUserId(userId) {
    window.localStorage.setItem(AUTH_KEY, userId);
    this.router.transitionTo('teams');
  }

  @action
  logout() {
    window.localStorage.removeItem(AUTH_KEY);
    this.router.transitionTo('login');
  }
}
