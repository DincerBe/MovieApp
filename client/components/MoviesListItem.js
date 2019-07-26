import React, {Component} from 'react';
import { Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default class MoviesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Col md={this.props.md} className="movieItem">
                <Link to={"/movie/"+this.props.movieData._id}>
                    <div className="movieItemImage">
                        <img alt="" src={this.props.movieData.poster} />
                    </div>
                    <div>
                        <p className="title">{this.props.movieData.title}</p>
                        <p><span>Release</span> {new Date(this.props.movieData.release_date).getFullYear() + "/" + new Date(this.props.movieData.release_date).getMonth()}</p>
                    </div>
                    <div>
                        <p className="score"><span>Score</span> {this.props.movieData.score}</p>
                    </div>
                </Link>
            </Col>    
        )
    }
}