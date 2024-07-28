// parsers.js

// src/utils/parsers.js

// src/utils/parsers.js
// src/utils/parsers.js
export const parseArticlesResponse = (data) => {
  // Assuming data is an array of article objects without an id
  return data.map((article, index) => ({
    id: index, // Generate an id based on the index
    title: article.title.trim(), // Remove extra spaces if any
    description: article.description.trim(), // Remove extra spaces if any
    url: article.url.trim(), // Remove extra spaces if any
    image: article.image ? article.image.trim() : undefined // Optional image field
  }));
};

  // Other parsing functions...
  