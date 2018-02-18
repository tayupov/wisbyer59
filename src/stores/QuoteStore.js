import { observable, action } from 'mobx'

const QUOTE_URL = process.env.REACT_APP_QUOTE_URL

class QuoteStore {
  @observable quote=null
  @observable fetchStatus='pending'

  // constructor() {
  //   // this.fetchQuote()
  // }

  @action
  fetchQuote() {
    this.quote = null
    fetch(QUOTE_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.fetchStatus = 'done'
      })
      .catch(error => {
        this.fetchStatus = 'error'
      })
  }
}

export default QuoteStore