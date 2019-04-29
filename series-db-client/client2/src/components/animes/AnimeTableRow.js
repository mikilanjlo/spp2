import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AnimeTableRow extends Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    delete() {
        axios.post('http://localhost:3000/anim/delete/'+this.props.anime.AnimeID)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }

    render() {
        let anime = this.props.anime;

        return(
            <tr key={anime.AnimeID} className="text-dark">
                <th scope="row">{anime.AnimeID}</th>
                <td>{anime.Name}</td>
                <td>{anime.Episods}</td>
                <td>{anime.Genre}</td>
                <td>{anime.authorIdAuthors}</td>
                <td>
                    <Link to={'/anim/edit/' + this.props.anime.AnimeID} rel="noopener" className="btn btn-sm btn-success">Edit</Link>
                    <a href = "javascript:void(0);" onClick={this.delete} className="btn btn-sm btn-danger">Delete</a>
                </td>
            </tr>
        )
    }
}

export default AnimeTableRow;