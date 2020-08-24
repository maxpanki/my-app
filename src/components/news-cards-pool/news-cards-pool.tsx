import React, {Component} from 'react'

import './news-cards-pool.css'

import NewsService from '../../services/news-service'
import NewsCard from '../news-card'
import Loader from '../loader'
import newsData from "../../data/news-data";

interface NewsCardsPoolProps {
    currentCategory: string,
}

interface NewsCardsPoolStates {
    newsList: Article[],
    loader: boolean
}
interface Article {
    title: string,
    description: string,
    url: string,
    image: string
}

export default class NewsCardsPool extends Component<NewsCardsPoolProps, NewsCardsPoolStates> {

    newsService = new NewsService()

    state = {
        newsList: [],
        loader: true,
    }

    componentDidUpdate(prevProps: Readonly<NewsCardsPoolProps>) {
        if(prevProps.currentCategory !== this.props.currentCategory) {
            this.updateNews()
        }
    }

    componentDidMount() {
        this.updateNews()
    }

    updateNews(){
        const { currentCategory } = this.props
        if(typeof newsData[currentCategory] === "undefined"){
            this.newsService.getAllData().then(() => {
                this.setState({
                    newsList: newsData[currentCategory],
                    loader: false
                })
            })
        } else {
            this.setState({
                newsList: newsData[currentCategory],
                loader: false
            })
        }
    }

    render() {
        const { newsList, loader } = this.state

        if (loader){
            return <Loader />
        }

        if (newsList.length === 0){
            return <h4>Sorry there is no News on your demand.</h4>
        }


        return newsList.map((article: Article) => {
            return <NewsCard
                title={article.title}
                description={article.description}
                url={article.url}
                image={article.image} />
        })
    }
}