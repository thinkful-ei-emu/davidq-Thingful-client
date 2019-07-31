import React, { Component } from 'react'
import { Button, Input } from '../Utils/Utils'
import ts from '../../services/token-service';
import config from '../../config';
let endpoint = config.API_ENDPOINT; 

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitBasicAuth = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target

    console.log('login form submitted')
    let options = {
      method:'POST',
      headers: new Headers({'Content-type': 'application/json'}),
      body: JSON.stringify({user_name:user_name.value,password:password.value})
    };
    fetch(endpoint + '/login',options)
      .then(res=>{
          if(res.ok)
            return res.json();
          else
            throw new Error('invalid credentials');
      }).then(token=>
        {
          ts.saveAuthToken(token.token)
          user_name.value = ''
          password.value = ''
          this.props.onLoginSuccess()
        })

    
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitBasicAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <Input
            required
            name='user_name'
            id='LoginForm__user_name'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='LoginForm__password'>
          </Input>
        </div>
        <Button type='submit'>
          Login
        </Button>
      </form>
    )
  }
}
