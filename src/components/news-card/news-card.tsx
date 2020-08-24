import React from 'react'
import './news-card.css'
import {Link} from "react-router-dom";

interface Article {
    title: string,
    description: string,
    url: string,
    image: string,
}

const NewsCard = ({title, description, url, image}: Article) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 card-container">
            <div className="card">
                <img src={image} alt="icon" />
                <div className="info">
                    <h5 className="card-h5">{title}</h5>
                    <p className="card-p">{description}</p>
                </div>
                <Link className="mt-auto" to={`/article/${title}`}><button className="btn btn-info more-button">More info...</button></Link>
            </div>
        </div>
    )
}

export default NewsCard