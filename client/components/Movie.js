import React, {Component} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {movie: {
            title: "Movie Title", director: "", plot: "", release_date: "", score: "", poster: ""
        }};
    }
    // Load Movie Data
    componentDidMount() {
        axios.get('http://localhost:5000/api/movies/' + this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({movie: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(this.state.movie);    
    }
    // Delete Movie, Confirm before delete
    deleteMovie(){
        let r = window.confirm("Do you really want to delete the movie?");
        if (r == true) {
            axios.delete('http://localhost:5000/api/movies/delete/' + this.props.match.params.id)
            .then(res => {
                if (res){
                    console.log(res);
                    window.location.href = '/'
                }
            })
            .catch(function (error) {
                console.log(error);
            });
          }
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md="12" className="editButton">
                        <Link to={'/update/' + this.props.match.params.id}><Button>Edit Movie</Button></Link>
                        <Button onClick={()=> this.deleteMovie()} variant="danger" className="deleteButton">Delete Movie</Button>
                    </Col>                    
                    <Col>
                        <img className="moviePoster" src={this.state.movie.poster} />
                    </Col>
                    <Col className="movieInfo">
                        <div className="movieTitle">
                            <p>{this.state.movie.title}</p>
                        </div>
                        <div className="movieRelease">
                            <p><span>Release</span> {new Date(this.state.movie.release_date).getFullYear() + "/" + new Date(this.state.movie.release_date).getMonth()}</p>
                        </div>
                        <div className="movieScore">
                            <p><span>Score</span> {this.state.movie.score}</p>
                        </div>
                        <div className="movieDirector">
                            <p><span>Director</span> {this.state.movie.director}</p>
                        </div>
                        <div className="moviePlot">
                            <p><span>Plot</span></p>
                            <p>{this.state.movie.plot}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
