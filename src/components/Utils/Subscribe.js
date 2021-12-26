import React, { Component } from 'react';
import axios from 'axios';
import { URL_EMAIL } from './paths';

class Subscribe extends Component{
  state = {
    email: '',
    error: false,
    success: false,
    alreadyIn: false
  }

  clearMessages = () => {
    // console.log("clean up");
    setTimeout(() => {
      this.setState({
        error: false,
        success: false,
        alreadyIn: false
      })
    },3000)
  }

  saveSubscription = (email) => {
    axios.get(`${URL_EMAIL}?email=${email}`)
      .then(response => {
        if (!response.data.length) {
          axios(URL_EMAIL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            data: JSON.stringify({email})
          }).then(
            response => {
              this.setState({
                email: '',
                success: true
              });
              this.clearMessages();
            }
          )
        } else {
          this.setState({
            email: '',
            alreadyIn: true
          });
          this.clearMessages();
        }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let email = this.state.email;
    // console.log(email);
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(email)) {
      //subscribe user
      this.saveSubscription(email)
    } else {
      this.setState({error:true})
    }
    this.clearMessages();
  }

  onChangeInput = (event) => {
    this.setState ({
      email: event.target.value
    });
    // console.log(this.state.email);
  }

  render() {
    const state = this.state;
    return (
      <div className="subcribe_panel">
        <h3>Subscribe to us</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={state.email} placeholder="your email address" onChange={this.onChangeInput} />
            <div className={ state.error ? "error show" : "error" }>Check your email</div>
            <div className={ state.success ? "success show" : "success" }>Thank you</div>
            <div className={ state.alreadyIn ? "success show" : "success" }>You are already on the DB</div>
          </form>
        </div>
        <small>Loler daedaewdaedawe</small>
      </div>
    )
  }
}

export default Subscribe;