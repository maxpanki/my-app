import React, {Component} from 'react'

import Header from '../header'
import NewsCardsPool from '../news-cards-pool'

import './app.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SearchPool from '../search-pool'

export default class App extends Component {

    render () {
    return (
            <div>
                <Router>
                    <Route render={({history}) => {
                        const { pathname } = history.location
                        return <Header pathname={pathname} />
                    }} />
                    <div className="title">
                        <h2>Most Popular News</h2>
                    </div>
                    <div className="cards row justify-content-center">
                        <Switch>
                            <Route path="/" exact component={} />

                            <Route path="/:category" exact render={({ match }) => {
                                const { category } = match.params
                                return <NewsCardsPool currentCategory={category} />
                            }} />

                            <Route path="/search/:query" render={({ match }) => {
                                const { query } = match.params
                                return <SearchPool searchQuery={query} />
                            }} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }

}