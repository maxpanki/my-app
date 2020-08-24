import React, {Component} from 'react'

import './article.css'
import newsData from "../../data/news-data";
import NewsService from "../../services/news-service";
import { Redirect } from 'react-router-dom';
import Loader from "../loader";

interface ArticleProps {
    title: string
}

interface ArticleState {
    article: Article,
    loader: boolean
}

interface Article {
    title: string,
    description: string,
    url: string,
    image: string,
    content: string
}

export default class ArticlePage extends Component<ArticleProps, ArticleState> {

    newsService = new NewsService()

    state = {
        article: {
            title: '',
            description: '',
            url: '',
            image: '',
            content: ''
        },
        loader: true
    }

    componentDidMount() {
        if(Object.keys(newsData).length === 0){
            this.newsService.getAllData().then(() => {
                this.getArticle(this.props.title)
                this.setState({
                    loader: false
                })
            })
        } else {
            this.getArticle(this.props.title)
            this.setState({
                loader: false
            })
        }
    }

    getArticle(title: string) {
        const keys = Object.keys(newsData)

        keys.forEach((key: string) => {
            newsData[key].forEach((article: Article) => {
                if(article.title === title){
                    this.setState({
                        article: article
                    })
                }
            })
        })
    }

    render() {
        const { article, loader } = this.state

        if(loader) {
            return <Loader />
        }

        if(article.title === '') {
            return <Redirect to='/notfound/404' />
        }

        return (
            <div className="container">
                <div className="row image-row">
                    <div className="col-12">
                        <img className="article-img" src={article.image} />
                    </div>
                    <div className="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
                        <h1>{article.title}</h1>
                        <p>{article.content}</p>
                    </div>
                </div>
            </div>
        )
    }

}