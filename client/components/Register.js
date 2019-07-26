import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
			username: '',
			password: ''
		}
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();    
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
        };
        axios.post('http://localhost:5000/api/users/register', newUser)
            .then(res => window.location.href = '/login')
            .catch(error => { console.log('Logout error') });
    };
    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }} className="signup">
                            <h4>Signup</h4>
                            <Row>
                                <Col md="6">
                                    <Form.Group >
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" _ref="firstna" id="firstname" onChange={(e) => this.onChange(e)}  placeholder="First Name" required />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group >
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" _ref="lastname" id="lastname" onChange={(e) => this.onChange(e)}  placeholder="Last Name" required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group >
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type="email" _ref="email" id="email" onChange={(e) => this.onChange(e)} placeholder="E-Mail" required/>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" _ref="password" id="password" onChange={(e) => this.onChange(e)} placeholder="Password" required/>
                            </Form.Group>
                            <Button type="submit">Register</Button>
                            <div>You already have an account? Click <Link to={"/login"}>here</Link> to login.</div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}
