import React, { Component } from 'react';
import './App.css';
import HomePage from './containers/HomePage/HomePage';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="PandaApp">
                <HomePage />
            </div>
        );
    }
}

export default App;
