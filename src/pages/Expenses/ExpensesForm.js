import React from 'react'
import { Form } from 'semantic-ui-react'

import categories from 'constants/categories';

/* 
The react state of this component describes the form data
and will be used to create an expense
 */
class ExpensesForm extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      price: '',
      description: '',
      time: null,
      debtorIds: [],
      category: ''
    }
  }

  componentDidMount() {
    this.setState({ user_id: this.props.activeUser })
  }

  handleSubmit = (event) => {
    const { price, description, debtorIds } = this.state

    if (price && description && debtorIds.length > 0) {
      const expense = {
        price: +price,
        description,
        time: + new Date(),
        user_id: this.props.activeUser.id,
        debtor_ids: debtorIds
      }
      this.props.addExpense(expense);
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { users, activeUser } = this.props
    const debtorOptions = users
      .filter(user => user.id !== activeUser.id)
      .map(user => ({ key: user.id, value: user.id, text: user.name }) )

    const { price, description, category } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input placeholder='Price' name='price' value={price} type='number' min='0' step='0.01' onChange={this.handleChange} />
        <Form.Input placeholder='Description' name='description' value={description} type='text' onChange={this.handleChange} />
        <Form.Select multiple placeholder='Debtor' name='debtorIds' options={debtorOptions} onChange={this.handleChange} />
        <Form.Select placeholder='Category' name='category' value={category} options={categories} pointing='right' onChange={this.handleChange} />
        <Form.Button basic fluid>Submit</Form.Button>
      </Form>
    );
  }
}

export default ExpensesForm;