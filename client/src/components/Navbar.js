import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import logo from '../logo.jpg';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false};
    }
    componentDidMount(){
        this.setState({loggedIn: this.props.loggedIn});
    }
    logout() {
        axios.get('http://localhost:5000/api/users/logout',{withCredentials: true})
        .then( () => {
            this.props.updateUser({
                loggedIn: false,
                username: null
            })
        })
        .catch(error => {
            console.log('Logout error')
        });
    }
    render() {
        const loggedIn = this.props.loggedIn;
        return (
            <nav className="navbar navbar-expand-lg navbar-light ">
                <Link className="navbar-brand" to={"/"}><img src={logo} alt="logo" /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse w-100 order-1 order-md-0 dual-collapse2" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/movies"}>All Movies</Link>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse w-100 order-3 dual-collapse2" id="navbarNav2">
                    <ul className="navbar-nav ml-auto loginLogout">
                        <li className="nav-item addMovie">
                            <Link to={"/add"}><Button>Add a new Movie</Button></Link>
                        </li>
                        {/* If user is logged in show logout button */}
                        {this.state.loggedIn ? (
                            <li className="nav-item ">
                                <Link to={"#"} onClick={()=>this.logout()}>Logout</Link>
                            </li>
                        ) : (
                            <li className="nav-item ">
                                <Link to={"/login"}>Login</Link>
                                <Link to={"/signup"}>Signup</Link>
                            </li>                         
                            )}
                    </ul>
                </div>
            </nav>
        )
    }
}