import { observable, action } from 'mobx'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const API_ROOT = process.env.REACT_APP_API_ROOT

class UserStore {
  @observable users = []
  @observable activeUser = null
  @observable fetchStatus = 'pending'

  constructor() {
    this.fetchUsers()
    const user = cookies.get('user')
    if (user) {
      this.setActiveUser(user)
    }
  }

  @action.bound
  setActiveUser(user) {
    this.activeUser = user
    cookies.set('user', JSON.stringify(user), { path: '/' });
  }

  @action
  fetchUsers() {
    fetch(API_ROOT + '/users')
      .then(response => response.json())
      .then(data => {
        this.users = data
        this.fetchStatus = 'done'
      })
      .catch(error => {
        this.fetchStatus = 'error'
      })
  }
}

export default UserStore