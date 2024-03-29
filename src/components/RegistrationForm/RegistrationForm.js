import React, { Component } from 'react'
import { Button, Input, Required } from '../Utils/Utils';
import rgSev from '../../services/registration.service';

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    this.setState({error:null});
    const { full_name, nick_name, user_name, password } = ev.target
    console.log( full_name.value, nick_name.value, user_name.value, password.value )
    //console.log('valid inputs: ',rgSev.validateForm(full_name.value,nick_name.value,user_name.value,password.value))
    try{
    rgSev.validateForm(full_name.value,nick_name.value,user_name.value,password.value)
      rgSev.RegisterUser(user_name.value,full_name.value,password.value,nick_name.value)
              .then((res)=>{
                console.log('registration form submitted')
                full_name.value = ''
                nick_name.value = ''
                user_name.value = ''
                password.value = ''
                this.props.onRegistrationSuccess()
              }).catch(err=>this.setState({error:'The server encontered an error: ' +err.message}));

      
    }
    catch(err)
    {
      this.setState({error:err.message});
    }
    finally{
      password.value = '';
    }
      
    

    
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='full_name'>
          <label htmlFor='RegistrationForm__full_name'>
            Full name <Required />
          </label>
          <Input
            name='full_name'
            type='text'
            required
            id='RegistrationForm__full_name'>
          </Input>
        </div>
        <div className='user_name'>
          <label htmlFor='RegistrationForm__user_name'>
            User name <Required />
          </label>
          <Input
            name='user_name'
            type='text'
            required
            id='RegistrationForm__user_name'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationForm__password'>
            Password <Required />
          </label>
          <Input
            name='password'
            type='password'
            required
            id='RegistrationForm__password'>
          </Input>
        </div>
        <div className='nick_name'>
          <label htmlFor='RegistrationForm__nick_name'>
            Nickname
          </label>
          <Input
            name='nick_name'
            type='text'
            required
            id='RegistrationForm__nick_name'>
          </Input>
        </div>
        <Button type='submit'>
          Register
        </Button>
      </form>
    )
  }
}
