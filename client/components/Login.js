import React, {Component} from 'react';
import axios from 'axios';
import { Redirect, Link   } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectTo: null
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();    
        const loginUser = {
            email: this.state.email,
            password: this.state.password
        };
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/users/login',
            data: loginUser,
            auth: loginUser,
            withCredentials: true
          })
          .then(res => window.location.href = '/')
          // if log in was successful, but has another failure, check if logged in and if yes redirect
          .catch(function (error) {
            axios.get('http://localhost:5000/api/users',{withCredentials: true}).then(res => {
                if (res.data.user) {
                    window.location.href = '/'
                }
              });
            });
    };
    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }} className="login">
                            <h4>Login</h4>
                            <Form.Group >
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type="email" _ref="email" id="email" onChange={(e) => this.onChange(e)} placeholder="E-Mail" required/>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" _ref="password" id="password" onChange={(e) => this.onChange(e)} placeholder="Password" required/>
                            </Form.Group>
                            <Button size="lg" type="submit" block>Login</Button>
                            <div>You don't have an account? Click <Link to={"/signup"}>here</Link> to signup.</div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}