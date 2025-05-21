require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.NEWS_API_KEY; 

class Story {
    constructor() {
        this.title = null;
        this.link = null;
        this.summary = null;
        this.source = null;
    }
}

class CategoryHeadlines {
    constructor(topic) {
        this.topic = topic;
        this.story1 = new Story();
        this.story2 = new Story();
        this.story3 = new Story();
    }
}

function getHeadlines(category) {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
    if (!apiKey) {
        console.error('api key is undefined');
        process.exit(1);
    }
    
    const url = 'https://gnews.io/api/v4/top-headlines';
    const params = {
        topic: category.topic,
        from: startDate.toISOString(),
        to: endDate.toISOString(),
        lang: 'en',
        token: apiKey 
    };
    console.log(params)
    
    return axios.get(url, { params })
        .then(response => {
            const articles = response.data.articles || [];
            return articles.map(article => ({
                title: article.title,
                link: article.url,
                name: article.source.name,
                description: article.description,
            }));
        })
        .catch(error => {
            console.error(`Error: ${error.response?.status} - ${error.response?.statusText}`);
            return null;
        });
}

function breakHeadlines(headlines, categoryHeadlinesIn) {
    if (headlines.length >= 3) {
        categoryHeadlinesIn.story1.title = headlines[0].title;
        categoryHeadlinesIn.story1.link = headlines[0].link;
        categoryHeadlinesIn.story1.summary = headlines[0].description;
        categoryHeadlinesIn.story1.source = headlines[0].name;

        categoryHeadlinesIn.story2.title = headlines[1].title;
        categoryHeadlinesIn.story2.link = headlines[1].link;
        categoryHeadlinesIn.story2.summary = headlines[1].description;
        categoryHeadlinesIn.story2.source = headlines[1].name;

        categoryHeadlinesIn.story3.title = headlines[2].title;
        categoryHeadlinesIn.story3.link = headlines[2].link;
        categoryHeadlinesIn.story3.summary = headlines[2].description;
        categoryHeadlinesIn.story3.source = headlines[2].name;
    }
}

(async () => {
    const category = new CategoryHeadlines('sports');
    const topStories = await getHeadlines(category);
    console.log(topStories);
    if (topStories) {
        breakHeadlines(topStories, category);
        console.log(category);
    }
})();