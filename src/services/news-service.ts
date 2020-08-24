import Categories from '../data/static-data'
import newsData from '../data/news-data'

const NewsAPI = require('newsapi')

interface Article {
    title: string,
    description: string,
    url: string,
    image: string,
    content: string
}

export default class NewsService {

    newsapi: any
    categorylist: string[]

    constructor(api: string = '980c94b4f3fc4629ae78293a2fe4c2fb') {
        this.newsapi = new NewsAPI(api)
        this.categorylist = Object.values(Categories)
    }

    getAllData() {
        return this.categorylist.reduce((promise: Promise<void>, category: string) => {
            return promise
                .then((result) => {
                    return this.getByCategory(category).then((newsList) => {
                        return newsData[category] = newsList
                    })
                })
                .catch(console.error)
        }, Promise.resolve())
    }

     async getByCategory(category: string) {
         const news = await this.newsapi.v2.everything({
            q: category,
            sortBy: 'popularity'
        })
         return await news.articles.map(this._transformArticle)
    }



    _transformArticle = (article: any): Article => {
        return {
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.urlToImage === null || undefined ? 'https://newsapi.org/images/n-logo-border.png' : article.urlToImage,
            content: article.content
        }
    }
}