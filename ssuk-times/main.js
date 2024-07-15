const API_KEY = `20d1a87375b944aabce0c52c8cc088db`;
let news = [];

const getLatestNews = async () => {
  // URL 인스턴스를 활용해서 api 주소를 만듬
  const url = new URL(
    `https://ssuk-times.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("response", news);
};

getLatestNews();
