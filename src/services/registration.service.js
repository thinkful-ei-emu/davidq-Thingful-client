const config = require('../config')

export default {

  RegisterUser(user_name, full_name, password, nickname=null){
    let option ={
      method:'POST',
      headers: new Headers({'Content-type':'application/json'}),
      body: JSON.stringify({user_name,full_name,password,nickname})
    };
    return fetch('http://localhost:8000/api'+'/register',option)
      .then((resp)=>{
        if(!resp.ok)
          return Promise.reject(new Error(resp.statusText))
        else
          return resp.json();
      })
  },
  /**
   *  @param
   * @summary must be used in a try catch block
   */
  validateForm(full_name, nick_name, user_name, password){
    if(!/^\S([A-Za-z]+)\s([A-Za-z]+)\S$/.test(full_name))// matches 2 words with no numbers
      throw new Error('full name must be 2 worlds with no numbers')
    if(!/\w{1,8}/.test(user_name))
      throw new Error('username cant be longer than 8 characters');
    if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/.test(password))//upper-lower-number-special
      throw new Error('password must have upper and lower case, a number and a symbol');
    return true;
  }

}