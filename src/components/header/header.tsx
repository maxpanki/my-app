import React, {Component} from 'react'
import './header.css'
import Categories from '../../data/static-data'
import {Link} from "react-router-dom";
import Search from "../search";

interface headerState {
    currentLocation: string
}

interface headerProps {
    pathname: string
}

export default class Header extends Component<headerProps, headerState>{

    state = {
        currentLocation: ''
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<headerState>, snapshot?: any) {
        if (prevProps.pathname !== this.props.pathname) {
            this.setState({
                currentLocation: this.props.pathname
            })
        }
    }

    componentDidMount() {
        this.setState({
            currentLocation: this.props.pathname
        })
    }

    renderMenu (currentLocation: string) {
        return Object.values(Categories).map((category: string) => {
            return (
                <li className={`/${category}` === currentLocation ? "nav-item active" : "nav-item"}>
                    <Link to={`/${category}`} className="nav-link">{category}</Link>
                </li>
            )
        })
    }

    render() {
        const { currentLocation } = this.state
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light header">
                <Link to={`/${Categories.CATEGORY1}`} className="navbar-brand">NewsAPI</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03"
                        aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav mr-auto">
                        {this.renderMenu(currentLocation)}
                    </ul>
                    <Search />
                </div>
            </nav>
        )
    }
}