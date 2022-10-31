import config from '../config.json';
import { setAlert } from '../store/alert/alertSlice';
import ApiBase from './apiBase';

export default class IdentityApi {
  constructor() {
    this.baseUrl = config.baseUrl;
  }

  async login(username, password) {
    return await fetch(`${this.baseUrl}/api/admin/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        secret: password,
        service_name: 'kube-tools',
        login_type: 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async loginPasscode(passcode) {
    return await fetch(`${this.baseUrl}/api/admin/login`, {
      method: 'POST',
      body: JSON.stringify({
        secret: passcode,
        service_name: 'kube-tools',
        login_type: 2,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
