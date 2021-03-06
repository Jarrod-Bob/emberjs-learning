import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class LoginRoute extends Route {
  /**
   * @type {AuthService}
   */
  @service auth
  async beforeModel(transition) {
    super.beforeModel(transition);
    if(this.auth.currentUserId) {
      //this.transitionTo('invitations');
      this.transitionTo('teams');
    }
  }
}
