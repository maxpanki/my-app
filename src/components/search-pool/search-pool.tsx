import React, {Component} from 'react'

import './search-pool.css'

import NewsService from '../../services/news-service'
import NewsCard from '../news-card'
import Loader from '../loader'
import newsData from "../../data/news-data";

interface SearchPoolProps {
    searchQuery: string
}

interface SearchPoolStates {
    newsList: Article[],
    loader: boolean
}
interface Article {
    title: string,
    description: string,
    url: string,
    image: string,
    content: string
}

export default class SearchPool extends Component<SearchPoolProps, SearchPoolStates> {

    newsService = new NewsService()

    state = {
        newsList: [],
        loader: true
    }

    componentDidUpdate(prevProps: Readonly<SearchPoolProps>, prevState: Readonly<SearchPoolStates>, snapshot?: any) {
        const { searchQuery } = this.props
        if(prevProps.searchQuery !== searchQuery){
            this.updateNews(searchQuery)
        }
    }

    componentDidMount() {
        this.updateNews(this.props.searchQuery)
    }

    updateNews(query: string){
        const keys: string[] = Object.keys(newsData)

        if (keys.length === 0){
            this.newsService.getAllData().then(() => {
                this.getNewsList(Object.keys(newsData), query)
            })
        } else {
            this.getNewsList(keys, query)
        }
    }

    getNewsList(keys: string[], query: string){
        let temp_list: Article[] = []

        keys.forEach((key: string) => {
            newsData[key].forEach((article: Article) => {
                if(article.title.toLowerCase().includes(query.toLowerCase())){
                    temp_list.push(article)
                }
            })
        })
        this.setState({
            newsList: temp_list,
            loader: false
        })
    }

    render() {
        const {newsList, loader} = this.state

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
                image={article.image}/>
        })
    }
}