// parsers.js

// src/utils/parsers.js

// src/utils/parsers.js

export const parseArticlesResponse = (messageContent) => {
    let articles = [];
    try {
        articles = JSON.parse(messageContent);
    } catch (error) {
        console.error('Failed to parse JSON:', error);
    }

    return articles.map((article, index) => ({
        id: index,
        title: article.title,
        description: article.description,
        url: article.url
    })).filter(article => article.title && article.description && article.url);
};


  // Other parsing functions...
  