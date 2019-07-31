import React from 'react';

export default class LoginError extends React.Component{
  state = {
    hasError:false
  }
  static getDerivedStateFromError(err){
    return {hasError:true};
  }

  render(props){
    if(this.state.hasError)
      return <h2>Invalid Credentials</h2>
    else
      return this.props.children;
  }
}