// parsers.js

// src/utils/parsers.js

export const parseArticlesResponse = (messageContent) => {
    if (typeof messageContent !== 'string') {
        console.error('Expected messageContent to be a string, but got:', typeof messageContent);
        return [];
    }
    
    const lines = messageContent.split('\n\n');
    return lines.map((line, index) => {
        const [title, ...descriptionParts] = line.split(': ');
        const titleText = title.trim();
        const descriptionText = descriptionParts.join(': ').trim();

        // Extract the URL if available in the description
        const urlMatch = descriptionText.match(/(https?:\/\/[^\s]+)/);
        const url = urlMatch ? urlMatch[0] : '';

        return { id: index, title: titleText, description: descriptionText, url: url };
    }).filter(article => article.title && article.description);
};


  // Other parsing functions...
  