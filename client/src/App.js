import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";

import Navbar from './components/Navbar';
import UpdateMovie from './components/UpdateMovie';
import AddMovie from './components/AddMovie';
import Movie from './components/Movie';
import Movies from './components/Movies';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';


export default class App extends Component {
  constructor() {
      super();
      this.state = {
          fullname: null,
          loggedIn: false
      }
      this.getUser = this.getUser.bind(this);
      this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.getUser()
  }
  updateUser (userObject) {
    this.setState(userObject)
  }
  getUser() {
    axios.get('http://localhost:5000/api/users',{withCredentials: true}).then(res => {
      if (res.data.user) {
        console.log(res);
        this.setState({
          loggedIn: true,
          username: res.data.user.user.user.fullname
        });
        console.log(res.data.user.user.user.fullname);
      } else {
        this.setState({
          loggedIn: false,
          fullname: null
        })
      };
    });
  }
  render() {
    return(
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar loggedIn={this.state.loggedIn} updateUser={this.updateUser} key={this.state.loggedIn} />
          </header>
        </div>
        <Route path="/" exact component={Homepage} />
        <Route path="/movies" exact component={Movies} />
        <Route path="/movie/:id" exact component={Movie} />
        <Route path="/update/:id" component={UpdateMovie} />
        <Route path="/add" component={AddMovie} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Register} />
      </Router>
    ) 
  }
}


