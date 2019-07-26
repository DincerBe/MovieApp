import React, {Component} from 'react';
import axios from 'axios';
import MoviesListItem from './MoviesListItem';
import { Container, Row, Col } from 'react-bootstrap';

export default class Movies extends Component {

    constructor(props) {
        super(props);
        this.state = {movies: [{}], page: 1};
        this.changePage = this.changePage.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/movies')
            .then(res => {
                this.setState({movies: res.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    renderMovieList(){
        // Rendering all movies; 8 movies per page
        let MovieList = this.state.movies;
        let page = this.state.page;
        let MovieListArray = MovieList.slice((page - 1) * 8 , page * 8 );		
		return MovieListArray.map((movie) => {
				return (
					<MoviesListItem md="3" key={movie._id} movieData={movie} />
				);
			});
    }
    changePage(page){
        this.setState({
            page: page
        }); 
    }
    renderpageNumbers(){
        let NumberOfMovies = this.state.movies.length;
        // 6 movies per page
        let pageNumber = Math.ceil(NumberOfMovies / 8);
        let pageNumbers = [];
        for (var i = 1;i <= pageNumber; i++){
            pageNumbers.push(i);
        }		
		return pageNumbers.map((page) => {
                console.log(page);
				return (
					<p key={page} onClick={()=>this.changePage(page)}>{page}</p>
				);
			});
	}
    render() {
        return (
            <Container>
                <Row>
                    {this.renderMovieList()}
                    <div className="pagination">
                        <p>Go to page  </p>
                        {this.renderpageNumbers()}
                    </div> 
                </Row>
            </Container>
        )
    }
}