// parsers.js

// src/utils/parsers.js

// src/utils/parsers.js

export const parseArticlesResponse = (messageContent) => {
    if (typeof messageContent === 'string') {
      try {
        messageContent = JSON.parse(messageContent);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        return [];
      }
    }

    const articles = messageContent.map((article, index) => {
      console.log(`Article ${index}:`, article);
      return {
        id: index,
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.image // Assuming the API response includes an image field
      };
    }).filter(article => article.title && article.description && article.url);
  
    return articles;

  };
  

  // Other parsing functions...
  