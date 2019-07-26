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
  // Get update from Navbar if user logs out
  updateUser (userObject) {
    this.setState(userObject)
  }
  // Check if user is already loggedin and get user data
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
        // First Page, displays newest 20 added movies
        <Route path="/" exact component={Homepage} />
        // Displays all added movies
        <Route path="/movies" exact component={Movies} />
        // Displays single movie
        <Route path="/movie/:id" exact component={Movie} />
        // Update page for the movie
        <Route path="/update/:id" component={UpdateMovie} />
        // Add a new movie into the database
        <Route path="/add" component={AddMovie} />
        // Login Page
        <Route path="/login" component={Login} />
        // Signup Page
        <Route path="/signup" component={Register} />
      </Router>
    ) 
  }
}


