import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AnimeTableRow from './AnimeTableRow';

class AnimesTable extends Component {
    render() {
        let animes = this.props.animes;

        const animesList = animes.map((anime) => <AnimeTableRow anime = {anime} />);

        return(
            <div className="row">
                <div id="lol" className="col-md-6 offset-md-3">
                {animes === undefined
                    ? null
                    : <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Series</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Author ID</th>
                            <th scope="col"><Link to={'/anim/create'} className="btn btn-sm btn-success" title="Add a New Anime">+</Link></th>
                        </tr>
                        </thead>
                        <tbody>
                        {animesList}
                        </tbody>
                    </table>
                }
                </div>
            </div>
        );
    }
}

export default AnimesTable;