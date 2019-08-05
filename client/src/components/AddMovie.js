import React, {Component} from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import stern from '../stern.png';

export default class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '',score: "", poster: ""};
        this.onChange = this.onChange.bind(this);
        this.changeScore = this.changeScore.bind(this);
    }
    // Saving input changes into states
    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
        // Create new movie object    
        const newMovie = {
            title: this.state.title,
            poster: this.state.poster,
            director: this.state.director,
            release_date: this.state.release_date,
            score: this.state.score,
            plot: this.state.plot,
        };

        axios.post('http://localhost:5000/api/movies/add', newMovie)
            .then(res => console.log(res.data));
        // Cleaning up after success
        this.setState({
            title: "",
            poster: "http://localhost:3000/EmptyMovieImage.png",
            director: "",
            release_date: "",
            score: "",
            plot: "",
        }) 
    }
    // Save selected/clicked Score
    changeScore(score){
        this.setState({score: score});
    }
    render() {
        return (
            <Container>
                <Row>
                    <h4 className="pageHeadline">Add a new Movie</h4>
                </Row>    
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col md="4">
                            {/* Preview poster image and load a placeholder for poster image */}
                            <img className="addMoviePoster" src={this.state.poster == "" ? "http://localhost:3000/EmptyMovieImage.png" : this.state.poster} />
                            <div className="imageByUrl">
                                <Form.Group>
                                    <Form.Label>Get image by url</Form.Label>
                                    <Form.Control type="text" _ref={this.posterInput} id="poster" onChange={(e) => this.onChange(e)} placeholder="Image Url" value={this.state.poster} required />
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
                                    <Form.Control type="date" _ref="release_date" id="release_date" onChange={(e) => this.onChange(e)} required />
                                </Form.Group>
                            </div>
                            <div >
                                {/* Movie Ratings are from 1 to 3 */}
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
                            <Button type="submit">Add Movie</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}
