import React, {Component} from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import stern from '../stern.png';

export default class UpdateMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Movie Title", director: "", plot: "", release_date: "", score: "", poster: ""
        , redirect: null, redirectOn: false};
        this.onChange = this.onChange.bind(this);
        this.changeScore = this.changeScore.bind(this);
    }
    // Saving input changes into states
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    componentDidMount() {
        // Loading movie data
        axios.get('http://localhost:5000/api/movies/' + this.props.match.params.id)
            .then(res => {
                this.setState(res.data);
                document.getElementById('release_date').valueAsDate = new Date(res.data.release_date);
            })
            .catch(function (error) {
                console.log(error);
            });    
    }
    onSubmit = e => {
        e.preventDefault();    
        const newMovie = {
            title: this.state.title,
            poster: this.state.poster,
            director: this.state.director,
            release_date: this.state.release_date,
            score: this.state.score,
            plot: this.state.plot
        };
        axios.post('http://localhost:5000/api/movies/update/' + this.props.match.params.id, newMovie)
            .then(res => console.log(res.data));

            window.location.href = '/movie/' + this.props.match.params.id;
    }
    // Save selected/clicked Score
    changeScore(score){
        this.setState({score: score});
    }
    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                <Row>
                    <Col md="4">
                        <img className="addMoviePoster" src={this.state.poster} />
                        <div className="imageByUrl">
                            <Form.Group>
                                <Form.Label>Get image by url</Form.Label>
                                <Form.Control type="text" _ref="poster" id="poster" onChange={(e) => this.onChange(e)} placeholder="Image Url" value={this.state.poster} />
                            </Form.Group>
                        </div>
                    </Col>
                    <Col md="8">
                        <div >
                            <Form.Group >
                                <Form.Label>Movie Title</Form.Label>
                                <Form.Control type="text" _ref="title" id="title" onChange={(e) => this.onChange(e)}  placeholder="Yor new Movie Title" value={this.state.title} required />
                            </Form.Group>
                        </div>
                        <div >
                            <Form.Group >
                                <Form.Label>Release Date</Form.Label>
                                <Form.Control type="date" _ref="release_date" id="release_date" onChange={(e) => this.onChange(e)}  required />
                            </Form.Group>
                        </div>
                        <div >
                            <Row >
                                <Col>
                                    <div className={"sternBox a sel" + this.state.score} id={1} onClick={() => this.changeScore(1)} >
                                        <img src={stern} />
                                        <p>1 Stern</p>  
                                    </div>
                                </Col>
                                <Col>
                                    <div className={"sternBox b sel" + this.state.score} id={2} onClick={() => this.changeScore(2)}>
                                        <img src={stern} />
                                        <img src={stern} />
                                        <p>2 Sterns</p>  
                                    </div>
                                </Col>
                                <Col >
                                    <div className={"sternBox c sel" + this.state.score} id={3} onClick={() => this.changeScore(3)}>
                                        <img src={stern} />
                                        <img src={stern} />
                                        <img src={stern} />
                                        <p>3 Sterns</p>  
                                    </div>
                                </Col>
                                <input type="number" id="score" ref="score" min="1" max="3" value={this.state.score} style={{display: 'none'}} value={this.state.score}/>
                            </Row>
                        </div>
                        <div >
                            <Form.Group >
                                <Form.Label>Director</Form.Label>
                                <Form.Control type="text" _ref="director" id="director" onChange={(e) => this.onChange(e)} placeholder="Director" value={this.state.director} required/>
                            </Form.Group>
                        </div>
                        <div >
                            <Form.Group >
                                <Form.Label>Plot</Form.Label>
                                <Form.Control as="textarea" type="text" _ref="plot" id="plot" onChange={(e) => this.onChange(e)} placeholder="Movie Plot" value={this.state.plot} required/>
                            </Form.Group>
                        </div>
                        <Button type="submit">Update Movie</Button>
                    </Col>
                </Row>
                </Form>
            </Container>
        )
    }
}