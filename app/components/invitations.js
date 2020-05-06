import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Router from '@ember/routing/router';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class InvitationsComponent extends Component {
  @tracked
  firstName = '';

  @tracked
  lastName = '';

  @tracked
  role = '';

  @tracked
  email = '';

  @tracked
  title = '';

  @tracked errorMessage;

  /**
   * @type {Router}
   */
  @service router;
  @action
  updateFirstName(evt) {
    this.firstName = evt.target.value;
    console.log(this.firstName);
  }

  @action
  updateLastName(evt) {
    this.lastName = evt.target.value;
  }

  @action
  updateEmail(evt) {
    this.email = evt.target.value;
  }

  @action
  onSelectedChange(evt) {
    this.role = evt.target.value;
  }
  
  @action
  updateTitle(evt) {
    this.title = evt.target.value;
  }

  @action
  async sendInvite(evt) {
    evt.preventDefault();
    let inviteData = {
      invite: {
        first_name: this.firstName,
        last_name: this.lastName,
        title: this.title,
        role: this.role,
        email: this.email
      }
    }
    debugger;
    await fetch('https://engage.staging.saleswhale.com/api/v1/invites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Author': 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(inviteData),
    })
  }

  @action
  test(evt) {
    evt.preventDefault();
    alert(777);
  }

}
