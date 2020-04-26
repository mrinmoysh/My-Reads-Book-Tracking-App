import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import './App.css';
import BookSelves from './BookSelves';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Route
                    exact path="/" render={() => (
                        <BookSelves />
                    )}
                />
                <Route
                    path="/search" render={() => (
                        <SearchBooks />
                    )}
                />

            </div>
        )
    }
}

export default App
