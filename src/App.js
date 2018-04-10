import React, { Component } from 'react';
import './sass/index.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Button } from './components/Button';

const apiURI = 'http://127.0.0.1:8080/';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    fetch(`${apiURI}auth/info`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => this.setState({ user: data }));
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <Header userInfo={user}/>
        <main>
          <p className="App-intro">
            Hello {user.username}<br />
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Button href="https://google.com/" colour="blue" label="Google"/>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
