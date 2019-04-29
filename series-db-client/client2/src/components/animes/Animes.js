import React, { Component } from 'react';

import axios from 'axios';
import AnimesTable from './AnimesTable';
import AuthHelper from '../auth/AuthHelper';

class Animes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animes: []
        };
    }

    AuthHelper = new AuthHelper();

    componentDidMount() {
        this.getAnimes()
        if (this.AuthHelper.loggedIn()) {
            const confirm = this.AuthHelper.getConfirm();
            if (confirm) {
                this.setState({
                    confirmed: true
                })
            }
        }
    }

    componentDidUpdate() {
        this.getAnimes()
    }

    getAnimes() {
        axios.get('http://localhost:3000/anim')
            .then(response => {
                this.setState({
                    animes: response.data.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return(
            <AnimesTable animes={this.state.animes}/>
        )
    }
}

export default Animes;