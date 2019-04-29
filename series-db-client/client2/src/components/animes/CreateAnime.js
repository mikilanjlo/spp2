import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthHelper from '../auth/AuthHelper';

class CreateAnim extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            Episods: "",
            Genre: "",
            author: "",
            possibleAuthors: [],
            created: false,
            error: "",
            confirmed: false,
        }

        this.statusCode = "";

        this.onChangeAnimeName = this.onChangeAnimeName.bind(this);
        this.onChangeAnimeEpisods = this.onChangeAnimeEpisods.bind(this);
        this.onChangeAnimeGenre = this.onChangeAnimeGenre.bind(this);
        this.onChangeAnimeAuthor= this.onChangeAnimeAuthor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    AuthHelper = new AuthHelper();

    componentDidMount() {
        this.getPossibleAuthors()
        if (this.AuthHelper.loggedIn()) {
            const confirm = this.AuthHelper.getConfirm();
            if (confirm) {
                this.setState({
                    confirmed: true
                })
            }
        }
    }

    getPossibleAuthors() {
        axios.get('http://localhost:3000/authors')
            .then(response => {
                this.setState({
                    possibleAuthors: response.data.data
                })
            })
            .catch(err => console.log(err))
    }


    onChangeAnimeName(e) {
        this.setState({
            Name: e.target.value
        });
    }

    onChangeAnimeEpisods(e) {
        this.setState({
            Episods: e.target.value
        });
    }

    onChangeAnimeGenre(e) {
        this.setState({
            Genre: e.target.value
        });
    }

    onChangeAnimeAuthor(e) {
        this.setState({
            author: e.target[e.target.selectedIndex].value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            Name: this.state.Name,
            Episods: this.state.Episods,
            Genre: this.state.Genre,
            author: this.state.author,
        };

        axios.post('http://localhost:3000/anim/create', obj)
            .then((response) => {
                console.log(response.data)
                this.statusCode = response.status
            })
            .then((response) => {
                if (this.statusCode == 200){
                    this.setState({
                        created: true
                    })
                }
            })
            .catch(err => {
                console.log(err);
                this.statusCode = 400;
                this.setState({
                    created: false
                })
            })
    }

    render() {
        const possibleAuthors = this.state.possibleAuthors.map((author) =>
            <option key={author.idAuthors} value={author.Name}>{author.Name}</option>)

        let errorBlock = <p></p>

        if (this.state.created) {
            return <Redirect from='/anim/create' to='/anim' />
        } else if (!this.state.created && this.statusCode == 400) {
            errorBlock = <p className="text">This anime is already exist!</p>
        } else if (!this.state.created && this.statusCode == 500) {
            errorBlock = <p className="text">There is error processing creation. Trye again later.</p>
        }

        return (
            <div className="container">
                {errorBlock}
                <form className="add-player-form" id="player_form" onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <div className="col-sm-5">
                            <input type="text" className="form-control" name="Name" id="Name"
                                   placeholder="Name" value={this.state.Name} onChange={this.onChangeAnimeName} required/>
                        </div>
                        <div className="col-sm-5 messages"></div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-5">
                            <input type="text" className="form-control" name="Pages" id="Pages"
                                   placeholder="Pages" value={this.state.Episods} onChange={this.onChangeAnimeEpisods}  required/>
                        </div>
                        <div className="col-sm-5 messages"></div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-5">
                            <input type="text" className="form-control" name="Genre" id="Genre"
                                   placeholder="Genre" value={this.state.Genre} onChange={this.onChangeAnimeGenre}  required/>
                        </div>
                        <div className="col-sm-5 messages"></div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-5">
                            <select id="author" name="author" className="form-control"
                                    onChange={this.onChangeAnimeAuthor} required>
                                {possibleAuthors}
                            </select>
                        </div>
                        <div className="col-sm-5 messages"></div>
                    </div>
                    <div className="form-group col-sm-5">
                        <button type="submit" className="btn btn-primary float-right" id="submit-player-button">Add Anime</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateAnim;