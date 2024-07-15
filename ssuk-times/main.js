const API_KEY = `20d1a87375b944aabce0c52c8cc088db`;
let newsList = [];

const getLatestNews = async () => {
  // URL 인스턴스를 활용해서 api 주소를 만듬
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("response", newsList);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `
      <div class="row">
        <div class="col-lg-4">
          <img
            src="${
              news.urlToImage ||
              "https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_576,h_500/s3/2/50552/image%20not%20available(26).jpg"
            }"
            alt="기사 사진"
          />
        </div>
        <div class="col-lg-8">
          <h2>${news.title}</h2>
          <p>${
            news.description == null || news.description == ""
              ? "내용없음"
              : news.description.length > 200
              ? news.description.substr(0, 200) + "..."
              : news.description
          }</p>
          <span>${news.source.name} * ${news.publishedAt}</span>
        </div>
      </div>
    `
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

const openNav = () => {
  document.getElementById("menu").style.width = "250px";
  document.getElementById("menu").style.marginLeft = "0px";
};

const closeNav = () => {
  document.getElementById("menu").style.width = "0";
  document.getElementById("menu").style.marginLeft = "-250px";
};

const openSearch = () => {
  const search = document.getElementById("search-form");

  if (search.style.display === "none") {
    search.style.display = "flex";
    search.style.opacity = "1";
  } else {
    search.style.display = "none";
    search.style.opacity = "0";
  }
};
