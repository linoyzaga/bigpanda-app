import React, { Component } from 'react';
import './App.css';
import HomePage from './containers/HomePage/HomePage';

class App extends Component {
    render() {
        return (
            <div className="PandaApp">
                <HomePage />
            </div>
        );
    }
}

export default App;
