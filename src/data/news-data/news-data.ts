

interface Article{
    title: string,
    description: string,
    url: string,
    image: string,
    content: string
}

let newsData: { [id: string]: Article[] }  = {}

export default newsData