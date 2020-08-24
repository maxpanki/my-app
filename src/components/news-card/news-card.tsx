import React from 'react'
import './news-card.css'

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
                    <h5><a href={url}>{title}</a></h5>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NewsCard