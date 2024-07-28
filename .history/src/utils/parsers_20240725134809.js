// Function to parse recommended articles response
export const parseArticlesResponse = (messageContent) => {
    const lines = messageContent.split('\n\n');
    return lines.map((line, index) => {
      const [title, ...descriptionParts] = line.split(': ');
      const titleText = title.trim();
      const descriptionText = descriptionParts.join(': ').trim();
      
      // Extract the URL if available in the description
      const urlMatch = descriptionText.match(/(https?:\/\/[^\s]+)/);
      const url = urlMatch ? urlMatch[0] : '';
  
      return { id: index, title: titleText, description: descriptionText.replace(url, '').trim(), url: url };
    }).filter(article => article.title && article.description && article.url);
  };
  
  // Other parsing functions...
  