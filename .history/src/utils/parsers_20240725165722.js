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
  
    return messageContent.map((article, index) => ({
      id: index,
      title: article.title,
      description: article.description,
      url: article.url
    })).filter(article => article.title && article.description && article.url);
  };
  

  // Other parsing functions...
  