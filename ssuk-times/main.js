const API_KEY = `20d1a87375b944aabce0c52c8cc088db`;
const defaultImage =
  "https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_576,h_500/s3/2/50552/image%20not%20available(26).jpg";
let newsList = [];
let category = "";
let keyword = "";

const menus = document.querySelectorAll("#menu ul li");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchText = document.getElementById("search-text");
const title = document.getElementById("title");

// 메뉴 클릭 시 카테고리별 검색
menus.forEach((menu) => menu.addEventListener("click", categorySearch));

// 검색창 검색
searchForm.addEventListener("submit", keywordSearch);

// 검색창 초기화
searchInput.addEventListener("focus", function () {
  searchInput.value = "";
});

// 로고 클릭 시 초기화
title.addEventListener("click", function () {
  // all로 클릭 표시
  menus.forEach((menu) => (menu.style.borderColor = "white"));
  menus[0].style.borderColor = "black";

  // 검색 결과 내용 안보이기
  searchText.style.display = "none";

  // 검색창, 검색 내용 초기화
  searchForm.style.display = "none";
  searchInput.value = "";

  category = "";
  keyword = "";
  getLatestNews(category, keyword);
});

// 카테고리별 검색
function categorySearch(e) {
  // 클릭한 카테고리 표시
  menus.forEach((menu) => (menu.style.borderColor = "white"));
  e.target.style.borderColor = "black";

  // 클릭한 카테고리 이름 가져오기
  category = e.target.textContent.toLowerCase();
  console.log(e, category);

  // 전체일 경우 ""로 대체
  if (category === "all") category = "";

  // 클릭한 카테고리 데이터 요청 및 렌더
  getLatestNews(category, keyword);

  // searchInput.value = ""; // 초기화
}

// 키워드별 검색
function keywordSearch(e) {
  e.preventDefault();
  category = "";
  keyword = searchInput.value;

  getLatestNews(category, keyword);

  // 검색 결과 내용
  searchText.style.display = "black";
  searchText.textContent = `"${keyword}"에 대해 검색한 결과입니다.`;
}

// 뉴스 데이터 호출
const getLatestNews = async (category, keyword) => {
  try {
    console.log(category, keyword);

    // URL 인스턴스를 활용해서 api 주소를 만듬
    const url = new URL(
      // `https://newsapi.org/v2/top-headlines?q=${keyword}&country=kr&category=${category}&apiKey=${API_KEY}`
      `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}&country=kr&category=${category}&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // api 호출이 성공일 경우 랜더, 아닐 경우 에러 메세지 노출
    if (response.status === 200) {
      // api 호출은 잘 됐지만, 뉴스 데이터가 없을 경우 에러 메세지 노출
      if (!data.articles.length > 0) {
        throw new Error("No matches for your search");
      } else {
        newsList = data.articles;
        render();
      }
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    errorRender(error.message);
  }
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

// 에러 메세지 렌더
const errorRender = (errorMessage) => {
  const errorHTML = `
      <div id="error" class="alert alert-danger" role="alert">
        ${errorMessage}
      </div>
  `;

  document.getElementById("news-board").innerHTML = errorHTML;
};
getLatestNews(category, keyword);

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
