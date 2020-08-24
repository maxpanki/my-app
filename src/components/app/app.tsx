import React, {Component} from 'react'

import Header from '../header'
import NewsCardsPool from '../news-cards-pool'

import './app.css'

import {BrowserRouter as Router, Route, RouteComponentProps, Switch} from 'react-router-dom'
import SearchPool from '../search-pool'
import WelcomePage from '../welcome-page'
import NotFound from "../not-found";
import ArticlePage from "../article";

export default class App extends Component {

    render () {
    return (
            <div>
                <Router>
                    <Route render={({history}) => {
                        const { pathname } = history.location
                        return <Header pathname={pathname} />
                    }} />

                    <div className="cards row justify-content-center">
                        <Switch>
                            <Route path="/" exact component={WelcomePage} />

                            <Route path="/:category" exact render={({ match }) => {
                                const { category } = match.params
                                return <NewsCardsPool currentCategory={category} />
                            }} />

                            <Route path="/search/:query" render={({ match }) => {
                                const { query } = match.params
                                return <SearchPool searchQuery={query} />
                            }} />

                            <Route path="/article/:title" render={({match}) => {
                                const { title } = match.params
                                return <ArticlePage title={title}/>
                            }
                            }/>

                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }

}