const API_KEY = `20d1a87375b944aabce0c52c8cc088db`;
const defaultImage =
  "https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_576,h_500/s3/2/50552/image%20not%20available(26).jpg";
let newsList = [];
let category = "";

const menus = document.querySelectorAll("#menu ul li");

// 카테고리별 검색
menus.forEach((menu) => {
  menu.addEventListener("click", (e) => {
    // 클릭한 카테고리 이름 가져오기
    const textContent = e.target.textContent.toLowerCase();
    console.log(e, textContent);

    // 클릭한 카테고리 표시
    menus.forEach((menu) => (menu.style.borderColor = "white"));
    e.target.style.borderColor = "black";

    // 클릭한 카테고리 데이터 요청 및 렌더
    getLatestNews(textContent);
  });
});

// 뉴스 데이터 호출
const getLatestNews = async (category) => {
  // URL 인스턴스를 활용해서 api 주소를 만듬
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("response", newsList);
};

// 뉴스 리스트 랜더
const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `
      <div class="row">
        <div class="col-lg-4 news-image">
          <img
            src="${news.urlToImage || defaultImage}"
            alt="${news.title}"
            onerror="this.onerror=null; this.src='${defaultImage}';"
          />
        </div>
        <div class="col-lg-8 news-textbox">
          <h2>${news.title}</h2>
          <p>${
            news.description == null || news.description == ""
              ? "내용없음"
              : news.description.length > 200
              ? news.description.substr(0, 200) + "..."
              : news.description
          }</p>
          <span>${news.source.name || "no source"} * ${moment(
        news.publishedAt
      ).fromNow()}</span>
        </div>
      </div>
    `
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews(category);

// 메뉴 열기
const openNav = () => {
  document.getElementById("menu").style.display = "block";
  document.getElementById("menu").style.left = "0px";
};

// 메뉴 닫기
const closeNav = () => {
  document.getElementById("menu").style.left = "-250px";
};

// 검색창 열기
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
