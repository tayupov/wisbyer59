import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

class ExpensesForm extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  
  onSubmitHandler = (event) => {
    const priceElement = document.getElementById('expensePrince');
    const descriptionElement = document.getElementById('expenseDescription');

    const price = priceElement.value;
    const description = descriptionElement.value;

    if (price && description) {
      this.addExpense({
        price,
        description,
        time: + new Date(),
        user_id: this.props.userId
      });

      priceElement.value = '';
      descriptionElement.value = '';
    }
  }

  addExpense = (expense) => {
    this.props.addExpense(expense);
  }

  render() {
    return (
      <Form onSubmit={this.onSubmitHandler}>
        <Form.Group >
          <Form.Field control={Input} placeholder="Price" id="expensePrince" type="number" min="0" step="0.01"/>
          <Form.Field control={Input} placeholder="Description" id="expenseDescription" type="text" />
          <Form.Field control={Button}>Submit</Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

export default ExpensesForm;