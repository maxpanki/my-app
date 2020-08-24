import React from 'react'
import { useHistory } from 'react-router-dom'

const Search = () => {

    const history = useHistory()

    return (
        <form className="form-inline my-2 my-lg-0"
        onSubmit={(e) => {
            e.preventDefault()

            const query = (document.getElementById('searchInput') as HTMLInputElement).value
            history.push(`/search/${query}`)
        }}>
        <input className="form-control mr-sm-2" type="text" id="searchInput" placeholder="Search"/>
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
    )
}

export default Search