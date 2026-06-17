function searchFunction(){
	let input = document.getElementById("searchInput");
	let filter = input.value.toLowerCase();
	let ul = document.getElementById("artcleList");
	let il = ul.getElementByTagName("li");
	
	for (let i = 0; i < li.length; i++){
		let text = li[i].textContent || li[i].innerText;
		if (text.toLowerCase().indexOf(filter) > -1){
			li[i].style.display = "";
		}
		else{
			li[i].style.display = "none";
		}
	}
}

window.onload = function () {
    function updateTime() {
      const now = new Date();
      document.getElementById("dateheure").innerHTML = now.toLocaleString();
    }

    updateTime();
    setInterval(updateTime, 1000);
};


let news = [
  {
    img: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/46fc6827-980d-491d-b4ca-429a0281d76f/fddcef10-fa33-44b2-86c8-30615c6f0fa8.jpg?w=1600&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=21ee1801dc9e6e3a434ea905ee9cbae18487415953dc1f7963d9b16eea4b225d",
    title: "Gloria and Grace are cooking something",
    desc: "Stock markets react to economic updates"
  },
  {
    img: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/29/f5/e4/59/b0/v1_E10/E10PLB8.jpg?w=1600&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=7d5bc67ec7b118e31139006d21b304bcf4ea5508f6595c382fd4e8117c10f733",
    title: "when you have time, visit Greece",
    desc: "make I cook this beans finish."
  },
  {
    img: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/46/73/8c/23/ee/v1_E10/E10BK8LT.jpg?w=1600&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=d19b7f7c46180897bda401d2d9d8f47d42dd787d10be82ee0097154141b35f40",
    title: "JESUS est le Chemin, la Verite et la Vie",
    desc: "AI and robotics reshape modern industries"
  },
  {
    img: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/e5/c4/09/50/7a/v1_E10/E10AG887.jpg?w=1600&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=67b8086922c6c391b1fde399a25c2ceb9ee598b898801043044940b222375bb6",
    title: "in progress of building the future",
    desc: "Top teams compete in thrilling finals"
  }
];

let index = 0;

/* SHOW SLIDE */
function showSlide(i) {
  index = i;
  document.getElementById("slide").src = news[i].img;
  document.getElementById("title").textContent = news[i].title;
  document.getElementById("desc").textContent = news[i].desc;
  //updateDots();
}

/* DOTS */
function createDots() {
  let dotsContainer = document.getElementById("dots");
  for (let i = 0; i < news.length; i++) {
    let dot = document.createElement("span");
    dot.classList.add("dot");
    dot.onclick = () => showSlide(i);
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  let dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[index].classList.add("active");
}

/* NEXT / PREV */
function nextSlide() {
  index = (index + 1) % news.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + news.length) % news.length;
  showSlide(index);
}

/* AUTO SLIDE */
setInterval(nextSlide, 5000);

/* DRAG / SWIPE */
let startX = 0;
let isDragging = false;

const slider = document.getElementById("slider");

slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
});

slider.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;

  let endX = e.clientX;

  if (startX - endX > 50) {
    nextSlide(); // swipe left
  } else if (endX - startX > 50) {
    prevSlide(); // swipe right
  }
});

slider.addEventListener("mouseleave", () => {
  isDragging = false;
});

/* MOBILE TOUCH SUPPORT */
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextSlide();
  } else if (endX - startX > 50) {
    prevSlide();
  }
});

/* INIT */
//createDots();
//showSlide(0);

function toggleMenu(){
document.getElementById("links").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}

function closeMenu(){
document.getElementById("links").classList.remove("show");
document.getElementById("overlay").classList.remove("show");
}

function toggleMenuAbout(){
document.getElementById("linksAbout").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}

function closeMenu(){
document.getElementById("linksAbout").classList.remove("show");
document.getElementById("overlay").classList.remove("show");
}

function toggleMenuAnnounces(){
document.getElementById("linksAnnounces").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}

function closeMenu(){
document.getElementById("linksAnnounces").classList.remove("show");
document.getElementById("overlay").classList.remove("show");
}

function toggleMenuEconomy(){
document.getElementById("linksEconomy").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}

function closeMenu(){
document.getElementById("linksEconomy").classList.remove("show");
document.getElementById("overlay").classList.remove("show");
}

function toggleMenuEducation(){
document.getElementById("linksEducation").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}
function closeMenu(){
document.getElementById("linksEducation").classList.remove("show");
document.getElementById("overlay").classList.remove("show");
}

function toggleMenuEntertainment(){
document.getElementById("linksEntertainment").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}

function closeMenu(){
document.getElementById("linksEntertainment").classList.remove("show");
document.getElementById("overlay").classList.remove("show");
}

function toggleMenuLaugh(){
document.getElementById("linksLaugh").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}

function closeMenu(){
document.getElementById("linksLaugh").classList.remove("show");
document.getElementById("overlay").classList.remove("show");
}

function toggleMenuPolitics(){
document.getElementById("linksPolitics").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}

function closeMenu(){
document.getElementById("linksPolitics").classList.remove("show");
document.getElementById("overlay").classList.remove("show");
}

function toggleMenuToday(){
document.getElementById("linksToday").classList.toggle("show");
document.getElementById("overlay").classList.toggle("show");
}

function closeMenu(){
document.getElementById("linksToday").classList.remove("show");
document.getElementById("overlay").classList.remove("show");
}

const dots = document.querySelectorAll('.dotP');

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
    });
});

/* Load articles from JSON file and display them in the specified container */

async function loadArticles(jsonFile, containerId, category, limit = 4, page = 1) {

    const response = await fetch(jsonFile);
    const articles = await response.json();

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    // 1. filter by category
    let data = articles;

    if (category) {
        data = data.filter(article => article.category === category);
    }
    const totalPages = Math.ceil(data.length / limit);
    // 2. pagination math
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = data.slice(start, end);

    // 3. display cards
    paginated.forEach((article, index) => {

        const card = document.createElement("article");
        card.classList.add("card");

        if (index === 0) {
          card.classList.add("featured");
        }

        card.innerHTML = `
            <img src="${article.img}" alt="${article.headline}">
            <div class="cardContent">
                <h3>${article.headline}</h3>
                <p>${article.summary}</p>
            </div>
        `;

        container.appendChild(card);

    });

    return totalPages; // important for pagination buttons
}
let currentPage = 1;
let totalPages = 1;
const limit = 4;
const category = document.body.dataset.category;

/*async function renderPage(page) {

    const totalItems = await loadArticles(
        "../data/index.json",
        "articlesGrid",
        category,
        limit,
        page
    );

    renderPagination(totalItems, page);
}

renderPage(currentPage);

function renderPagination(totalItems, currentPage) {

    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(totalItems / limit);

    // Prev
    const prev = document.createElement("button");
    prev.textContent = "Prev";
    prev.disabled = currentPage === 1;

    prev.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    };

    pagination.appendChild(prev);

    // Pages
    for (let i = 1; i <= totalPages; i++) {

        const btn = document.createElement("button");
        btn.textContent = i;

        if (i === currentPage) {
            btn.classList.add("active");
        }

        btn.onclick = () => {
            currentPage = i;
            renderPage(currentPage);
        };

        pagination.appendChild(btn);
    }

    // Next
    const next = document.createElement("button");
    next.textContent = "Next";
    next.disabled = currentPage === totalPages;

    next.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
        }
    };

    pagination.appendChild(next);
}*/

//PAGINATION

const pagination = document.getElementById("pagination");

if (pagination) {

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const firstPageBtn = document.getElementById("firstPage");
    const lastPageBtn = document.getElementById("lastPage");

    function toggle(el, show) {
        el.classList.toggle("hidden", !show);
    }

    async function renderPage(page) {

        totalPages = await loadArticles(
            "../data/index.json",
            "articlesGrid",
            category,
            limit,
            page
        );

        const currentPageEl = document.getElementById("currentPage");
        const dots = document.querySelectorAll(".Dots");

        currentPageEl.textContent = page;
        firstPageBtn.textContent = 1;
        lastPageBtn.textContent = totalPages;

        const isFirst = page === 1;
        const isLast = page === totalPages;

        // Remove active state first
        firstPageBtn.classList.remove("active-page");
        lastPageBtn.classList.remove("active-page");

        // Add active state to first or last page button
        if (isFirst) {
            firstPageBtn.classList.add("active-page");
        }

        if (isLast) {
            lastPageBtn.classList.add("active-page");
        }

        // Show current page only when it is not first or last
        toggle(currentPageEl, !isFirst && !isLast);

        // Left dots
        if (dots[0]) {
            toggle(dots[0], page > 2);
        }

        // Right dots
        if (dots[1]) {
            toggle(dots[1], page < totalPages - 1);
        }

        prevBtn.disabled = isFirst;
        nextBtn.disabled = isLast;
    }

    // Previous button
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    });

    // Next button
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
        }
    });

    // First page button
    firstPageBtn.addEventListener("click", () => {
        if (currentPage !== 1) {
            currentPage = 1;
            renderPage(currentPage);
        }
    });

    // Last page button
    lastPageBtn.addEventListener("click", () => {
        if (currentPage !== totalPages) {
            currentPage = totalPages;
            renderPage(currentPage);
        }
    });

    // Initial render
    renderPage(currentPage);
}


//HOME PAGE
if (document.getElementById("newsGridEducation")) {
  loadArticles("data/index.json", "topnewsGrid", 6);
  loadArticles("data/index.json", "newsGridEducation", "Education", 4);
  loadArticles("data/index.json", "newsGridPolitics", "Politics", 4);
  loadArticles("data/index.json", "newsGridToday", "Trending", 4);
  loadArticles("data/index.json", "newsGridEditor", "Editor", 4);
}

const page = window.location.pathname;
//EDUCATION PAGE

if (page.includes("education.html")) {

    loadArticles("../data/index.json", "topNewsGrids", "Education", 4, 1);
    loadArticles("../data/index.json", "articlesGrid", "Education", 6, currentPage);

}


//ENTERTAINMENT PAGE

if (page.includes("entertainment.html")) {

    loadArticles("../data/index.json", "topNewsGrids", "Entertainment", 4, 1);
    loadArticles("../data/index.json", "articlesGrid", "Entertainment", 6, currentPage);

}
//ANNOUNCES PAGE

if (page.includes("announces.html")) {

    loadArticles("../data/index.json", "topNewsGrids", "Announces", 4, 1);
    loadArticles("../data/index.json", "articlesGrid", "Announces", 6, currentPage);

}
//ECONOMY PAGE

if (page.includes("economy.html")) {

    loadArticles("../data/index.json", "topNewsGrids", "Economy", 4, 1);
    loadArticles("../data/index.json", "articlesGrid", "Economy", 6, currentPage);

}
//POLITICS PAGE

if (page.includes("politics.html")) {

    loadArticles("../data/index.json", "topNewsGrids", "Politics", 4, 1);
    loadArticles("../data/index.json", "articlesGrid", "Politics", 6, currentPage);

}
//LAUGH PAGE

if (page.includes("laugh.html")) {

    loadArticles("../data/index.json", "topNewsGrids", "Laugh", 4, 1);
    loadArticles("../data/index.json", "articlesGrid", "Laugh", 6, currentPage);

}
//PRESS&EVENTS PAGE

if (page.includes("pressEvent.html")) {

    loadArticles("../data/index.json", "topNewsGrids", "Press&Events", 4, 1);
    loadArticles("../data/index.json", "articlesGrid", "Press&Events", 6, currentPage);

}
//TODAY PAGE

if (page.includes("today.html")) {

    loadArticles("../data/index.json", "topNewsGrids", "Trending", 4, 1);
    loadArticles("../data/index.json", "articlesGrid", "Trending", 6, currentPage);

}