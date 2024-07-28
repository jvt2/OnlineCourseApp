// parsers.js

export function parseArticlesResponse(response) {
    const messageContent = response.messageContent;
  
    // Log the type and value of messageContent for debugging
    console.log('Type of messageContent:', typeof messageContent);
    console.log('Value of messageContent:', messageContent);
  
    // Ensure messageContent is a string before calling split
    if (typeof messageContent === 'string') {
      return messageContent.split('\n').map(line => JSON.parse(line));
    } else {
      throw new TypeError('Expected messageContent to be a string');
    }
  }
  // Other parsing functions...
  