import React from 'react'
import { Form, Input, Select, Button } from 'semantic-ui-react'

const API = 'https://wisbyer59-api.herokuapp.com/';
const USER_PATH = 'users?'; 

class ExpensesForm extends React.Component {

  constructor(props) {
    super(props);
    this.onDebtorChange = this.onDebtorChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.state = {
      debtorId: '',
      debtorOptions: [{
        key: 0, value: 'Both', text: 'Both'
      }]
    }
  }

  componentDidMount() {
    fetch(API + USER_PATH)
      .then(response => response.json())
      .then(users => {
        const debtorOptions = users
        .filter(user => user.id !== this.props.user.id)
        .map(user => ({ key: user.id, value: user.name, text: user.name }))
        .concat(this.state.debtorOptions);

        this.setState({
          debtorOptions
        });
      })
  } 
  
  onSubmitHandler = (event) => {
    const priceElement = document.getElementById('expensePrince');
    const descriptionElement = document.getElementById('expenseDescription');
    const debtorElement = document.getElementById('expenseDebtor');

    const price = priceElement.value;
    const description = descriptionElement.value;
    const debtorId = this.state.debtorId;

    if (price && description && (typeof debtorId === 'number')) {
      this.addExpense({
        price,
        description,
        time: + new Date(),
        user_id: debtorId
      });

      priceElement.value = '';
      descriptionElement.value = '';
      debtorElement.firstChild.innerHTML = '';
    }
  }

  addExpense = (expense) => {
    this.props.addExpense(expense);
  }

  onDebtorChange = (e, select) => {
    const debtor = this.state.debtorOptions.find(debtor => (debtor.value === select.value))
    if (debtor) {
      this.setState({
        debtorId: debtor.key
      })
    }
  }

  render() {
    return (
      <Form onSubmit={this.onSubmitHandler}>
        <Form.Group widths="equal">
          <Form.Field control={Input} placeholder="Price" id="expensePrince" type="number" min="0" step="0.01"/>
          <Form.Field control={Input} placeholder="Description" id="expenseDescription" type="text" />
          <Form.Field control={Select} placeholder="Debtor" id="expenseDebtor" options={this.state.debtorOptions} onChange={this.onDebtorChange} />
          <Form.Field control={Button}>Submit</Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

export default ExpensesForm;