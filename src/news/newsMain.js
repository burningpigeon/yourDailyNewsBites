require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.NEWS_API_KEY; 
console.log('Loaded ENV:', process.env);

class Story {
    constructor() {
        this.title = null;
        this.link = null;
        this.summary = null;
        this.image = null;
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

function getHeadlines(apiKey, category) {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
    console.log('API KEY:', apiKey); // ⬅️ Should print your key, not undefined
    if (!apiKey) {
        console.error('api key is undefined');
        process.exit(1);
    }
    
    const url = 'https://gnews.io/api/v4/top-headlines';
    const params = {
        topic: category, // Use 'topic', not 'category'
        from: startDate.toISOString(),
        to: endDate.toISOString(),
        lang: 'en',
        max: 3,
        token: apiKey // Use 'token', not 'apikey'
    };
    
    return axios.get(url, { params })
        .then(response => {
            const articles = response.data.articles || [];
            return articles.map(article => ({
                title: article.title,
                link: article.url,
                image: article.image,
                description: article.description
            }));
        })
        .catch(error => {
            console.error(`Error: ${error.response?.status} - ${error.response?.statusText}`);
            console.log(error.response?.data || error.message);
            return null;
        });
}

function breakHeadlines(headlines, categoryHeadlinesIn) {
    if (headlines.length >= 3) {
        categoryHeadlinesIn.story1.title = headlines[0].title;
        categoryHeadlinesIn.story1.link = headlines[0].link;
        categoryHeadlinesIn.story1.image = headlines[0].image;
        categoryHeadlinesIn.story1.summary = headlines[0].description;

        categoryHeadlinesIn.story2.title = headlines[1].title;
        categoryHeadlinesIn.story2.link = headlines[1].link;
        categoryHeadlinesIn.story2.image = headlines[1].image;
        categoryHeadlinesIn.story2.summary = headlines[1].description;

        categoryHeadlinesIn.story3.title = headlines[2].title;
        categoryHeadlinesIn.story3.link = headlines[2].link;
        categoryHeadlinesIn.story3.image = headlines[2].image;
        categoryHeadlinesIn.story3.summary = headlines[2].description;
    }
}

(async () => {
    const tech = new CategoryHeadlines('technology');
    const topStories = await getHeadlines(apiKey, tech.topic);
    if (topStories) {
        breakHeadlines(topStories, tech);
        console.log(tech);
    }
})();
