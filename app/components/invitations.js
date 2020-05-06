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
  role = null;

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
    console.log(this.lastName);
  }

  @action
  updateEmail(evt) {
    this.email = evt.target.value;
    console.log(this.email);
  }


  /**
   * 
   * @param {Event & {target: HTMLSelectElement}} evt 
   */
  @action
  onSelectChanged(evt) {
    this.role = evt.target.value;
    console.log(this.role);
  }
  
  @action
  updateTitle(evt) {
    this.title = evt.target.value;
    console.log(this.title);
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
    const resp = await fetch('https://engage.staging.saleswhale.com/api/v1/invites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(inviteData),
    })

    await resp.json();
  }
}
