import { observable, action } from 'mobx'

const API_ROOT = process.env.REACT_APP_API_ROOT;

class UserStore {
  @observable users = []
  @observable activeUser = null
  @observable fetchStatus = 'pending'

  constructor(){
    this.fetchUsers()
  }

  @action.bound
  setActiveUser(user) {
    this.activeUser = user
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