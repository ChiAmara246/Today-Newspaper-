/* =========================
   GLOBAL DATA
========================= */

function getImagePath(filename) {
    const isNavPage = window.location.pathname.includes("/navpages/");
    return isNavPage
        ? `../images/${filename}`
        : `images/${filename}`;
}

function formatPublicationDate(dateString) {

    const published = new Date(dateString);
    const now = new Date();

    const diff = now - published;

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Future dates
    if (diff < 0) {
        return published.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }

    // Less than a minute
    if (diff < minute) {
        return "Just now";
    }

    // Minutes
    if (diff < hour) {
        const mins = Math.floor(diff / minute);
        return `${mins} min${mins === 1 ? "" : "s"} ago`;
    }

    // Hours
    if (diff < day) {
        const hours = Math.floor(diff / hour);
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    // Days (up to 3)
    if (diff < day * 4) {
        const days = Math.floor(diff / day);
        return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    // Older than 3 days
    return published.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

}
/*topnews home page*/
function renderTopNews(articles) {

    // Newest first
    const sorted = [...articles].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Pick a random hero from the newest 8
    const latestEight = sorted.slice(0, 8);
    const hero = latestEight[Math.floor(Math.random() * latestEight.length)];

    // Categories to display in the side cards
    const categories = [
        "Education",
        "Politics",
        "Trending",
        "Entertainment"
    ];

    // Get the newest article from each category, excluding the hero
    const others = categories
        .map(category =>
            sorted.find(article =>
                article.category === category &&
                article.id !== hero.id
            )
        )
        .filter(Boolean)
        .slice(0, 3);

    const grid = document.getElementById("topnewsGrid");
    if (!grid) return;

    grid.innerHTML = `
        <div class="hero-card" data-id="${hero.id}">
            <img src="${hero.img}" alt="${hero.headline}">
            <div class="content">
                <span class="categoryTag">${hero.category}</span>
                <h3>${hero.headline}</h3>
                <p>${hero.summary}</p>
                <span class="date">${formatPublicationDate(hero.date)}</span>
            </div>
        </div>

        <div class="side-news">
            ${others.map(article => `
                <div class="side-card" data-id="${article.id}">
                    <img src="${getImagePath(article.img)}" alt="${article.headline}">
                    <div>
                        <span class="categoryTag">${article.category}</span>
                        <h4>${article.headline}</h4>
                        <span class="date">${formatPublicationDate(article.date)}</span>
                    </div>
                </div>
            `).join("")}
        </div>
    `;

    grid.addEventListener("click", (e) => {
        const card = e.target.closest("[data-id]");
        if (!card) return;

        window.location.href = `../article.html?id=${card.dataset.id}`;
    });

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

/* =========================
  MENU SYSTEM
=========================  */

function toggleMenu() {
    document.getElementById("links").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
}

function closeMenu() {
    document.getElementById("links").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

function toggleMenuAbout() {
    document.getElementById("linksAbout").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
}

function closeMenu() {
    document.getElementById("linksAbout").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

function toggleMenuAnnounces() {
    document.getElementById("linksAnnounces").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
}

function closeMenu() {
    document.getElementById("linksAnnounces").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

function toggleMenuEconomy() {
    document.getElementById("linksEconomy").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
}

function closeMenu() {
    document.getElementById("linksEconomy").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

function toggleMenuEducation() {
    document.getElementById("linksEducation").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
}
function closeMenu() {
    document.getElementById("linksEducation").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

function toggleMenuEntertainment() {
    document.getElementById("linksEntertainment").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
}

function closeMenu() {
    document.getElementById("linksEntertainment").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

function toggleMenuLaugh() {
    document.getElementById("linksLaugh").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
}

function closeMenu() {
    document.getElementById("linksLaugh").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

function toggleMenuPolitics() {
    document.getElementById("linksPolitics").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
}

function closeMenu() {
    document.getElementById("linksPolitics").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

function toggleMenuToday() {
    document.getElementById("linksToday").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
}

function closeMenu() {
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

function renderTopNewsCategory(articles) {

    const grid = document.getElementById("topNewsGrids");

    if (!grid) {
        console.log("Grid not found");
        return [];
    }
    const now = new Date();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    
    // Only articles from the last 7 days
    const recent = articles.filter(article => {
        const diff = now - new Date(article.date);
        return diff >= 0 && diff <= sevenDays;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    if (recent.length < 3) {
        grid.innerHTML = "";
        return [];
    }
    
    // Group articles by day (ignore time)
    const grouped = {};

    recent.forEach(article => {
        const day = article.date.split("T")[0];

        if (!grouped[day]) {
            grouped[day] = [];
        }

        grouped[day].push(article);
    });

    const dates = Object.keys(grouped);
    
    if (dates.length < 3) {
        grid.innerHTML = "";
        return [];
    }

    const category = recent[0].category;
    const storageKey = `topNews_${category}`;

    let selected = [];

    // Check saved selection
    const saved = JSON.parse(localStorage.getItem(storageKey));

    if (saved && saved.expires > Date.now()) {

        selected = saved.ids
            .map(id => recent.find(article => article.id === id))
            .filter(Boolean);

    }

    // Create a new selection if necessary
    if (selected.length !== 3) {

        // Shuffle the available dates
        const shuffledDates = [...dates].sort(() => Math.random() - 0.5);

        // Pick three unique dates
        const chosenDates = shuffledDates.slice(0, 3);

        selected = chosenDates.map(date => {

            const group = grouped[date];

            return group[Math.floor(Math.random() * group.length)];

        });

        // Shuffle selected articles so the hero is random
        selected.sort(() => Math.random() - 0.5);

        // Save for 2 days
        localStorage.setItem(storageKey, JSON.stringify({

            ids: selected.map(article => article.id),

            expires: Date.now() + (2 * 24 * 60 * 60 * 1000)

        }));

    }

    const hero = selected[0];
    const others = selected.slice(1);

    grid.innerHTML = `
        <div class="featured" data-id="${hero.id}">
            <img src="${getImagePath(hero.img)}" alt="${hero.headline}">
            <div class="cardContent">
                <h3>${hero.headline}</h3>
                <p>${hero.summary}</p>
                <span class="date">${formatPublicationDate(hero.date)}</span>
            </div>
        </div>

        <div class="s-card">
            ${others.map(article => `
                <div class="card" data-id="${article.id}">
                    <img src="${getImagePath(article.img)}" alt="${article.headline}">
                    <div>
                        <h4>${article.headline}</h4>
                        <p>${article.summary}</p>
                        <span class="date">${formatPublicationDate(article.date)}</span>
                    </div>
                </div>
            `).join("")}
        </div>
    `;

    grid.onclick = (e) => {

        const card = e.target.closest("[data-id]");

        if (!card) return;

        window.location.href = `../article.html?id=${card.dataset.id}`;

    };

    // Return IDs so Latest News can exclude them
    return selected.map(article => article.id);

}
/* Load articles from JSON file and display them in the specified container */

async function loadArticles(jsonFile, containerId, category, limit = 6, page = 1) {

    const response = await fetch(jsonFile);
    const articles = await response.json();

    // Sort newest to oldest
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    let data = [...articles];

    // Filter by category
    if (category) {
        data = data.filter(article => article.category === category);
    }

    // Home page Top News
    if (document.getElementById("newsGridEducation")) {
        renderTopNews(articles);
    }

    // Category page Top News
    let usedIds = [];

    if (document.getElementById("topNewsGrids")) {
        usedIds = renderTopNewsCategory(data);
    }
    // Remove Top News articles from pagination
    data = data.filter(article => !usedIds.includes(article.id));

    allArticles = data;

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    // Calculate total pages
    let totalPages;

    if (data.length <= 4) {
        totalPages = 1;
    } else {
        totalPages = 1 + Math.ceil((data.length - 4) / 8);
    }

    // Determine which articles to display
    let start, end;

    if (page === 1) {
        // First page: 4 articles
        start = 0;
        end = 4;
    } else {
        // Remaining pages: 8 articles each
        start = 4 + (page - 2) * 8;
        end = start + 8;
    }

    const paginated = data.slice(start, end);

    // Show Top News only on page 1
    const topNewsSection = document.getElementById("topNewsGrid");

    if (topNewsSection) {
        topNewsSection.style.display = page === 1 ? "" : "none";
    }
    //hide top news section from second pagination page
    if (page > 1) {
        const topNewsSection = document.getElementById("topNewsGrid");
        if (topNewsSection) {
            topNewsSection.style.display = "none";
        }
    }
    paginated.forEach((article, index) => {

        const card = document.createElement("article");
        card.classList.add("card");

        if (index === 0) {
            card.classList.add("featured");
        }

        card.innerHTML = `
            <img src="${getImagePath(article.img)}" alt="${article.headline}">
            <div class="cardContent">
                <h3>${article.headline}</h3>
                <p>${article.summary}</p>
                <span class="date">${formatPublicationDate(article.date)}</span>
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `../article.html?id=${article.id}`;
        });

        container.appendChild(card);

    });

    return totalPages;

}

/* =========================
   SEARCH SYSTEM (SAFE)
========================= */

let allArticles = null;

async function searchFunction() {

    const input = document.getElementById("searchInput");
    if (!input) return;

    const query = input.value.toLowerCase().trim();

    const home = document.querySelector("div.container");
    const results = document.getElementById("searchResults");

    if (!results) return;

    // 🔥 ALWAYS LOAD ARTICLES FIRST (once)
    if (!allArticles) {
        try {
            const res = await fetch("../data/index.json");
            allArticles = await res.json();
        } catch (err) {
            console.error("Failed to load articles:", err);
            return;
        }
    }

    // 🔥 ALWAYS FORCE HIDE CONTAINER WHEN SEARCH RUNS
    if (home) home.style.display = "none";

    // RESET STATE (empty search = show home again)
    if (query === "") {

        if (home) home.style.display = "block";

        results.classList.add("hidden");
        results.innerHTML = "";
        return;
    }

    // FILTER
    const matches = allArticles.filter(a =>
        (a.headline || "").toLowerCase().includes(query) ||
        (a.summary || "").toLowerCase().includes(query) ||
        (a.category || "").toLowerCase().includes(query)
    );

    // SHOW RESULTS
    results.classList.remove("hidden");

    results.innerHTML = `
        <h2>Search Results (${matches.length})</h2>
        <div class="grid"></div>
    `;

    const grid = results.querySelector(".grid");

    if (matches.length === 0) {
        grid.innerHTML = "<p>No articles found</p>";
        return;
    }

    matches.forEach(article => {

        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${getImagePath(article.img)}" alt="${article.headline}">
            <div class="cardContent">
                <span class="categoryTag">${article.category}</span>
                <h3>${article.headline}</h3>
                <p>${article.summary}</p>
                <span class="date">${formatPublicationDate(article.date)}</span>
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `../article.html?id=${article.id}`;
        });

        grid.appendChild(card);
    });
}

let currentPage = 1;
let totalPages = 1;
const limit = 4;
const category = document.body.dataset.category;


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

    loadArticles("../data/index.json", "articlesGrid", "Education", 6, currentPage);

}


//ENTERTAINMENT PAGE

if (page.includes("entertainment.html")) {

    loadArticles("../data/index.json", "articlesGrid", "Entertainment", 6, currentPage);

}
//ANNOUNCES PAGE

if (page.includes("announces.html")) {

    loadArticles("../data/index.json", "articlesGrid", "Announces", 6, currentPage);

}
//ECONOMY PAGE

if (page.includes("economy.html")) {

    loadArticles("../data/index.json", "articlesGrid", "Economy", 6, currentPage);

}
//POLITICS PAGE

if (page.includes("politics.html")) {

    loadArticles("../data/index.json", "articlesGrid", "Politics", 6, currentPage);

}
//LAUGH PAGE

if (page.includes("laugh.html")) {

    loadArticles("../data/index.json", "articlesGrid", "Laugh", 6, currentPage);

}
//PRESS&EVENTS PAGE

if (page.includes("pressEvent.html")) {

    loadArticles("../data/index.json", "articlesGrid", "Press&Events", 6, currentPage);

}
//TODAY PAGE

if (page.includes("today.html")) {

    loadArticles("../data/index.json", "articlesGrid", "Trending", 6, currentPage);

}

function sidebarCarousel() {

    const track = document.querySelector(".track");

    if (!track) return;

    const slides = [...track.children];

    // Clone the first slide
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);

    let index = 0;

    function moveSlide() {

        index++;

        track.style.transition = "transform .6s ease";
        track.style.transform = `translateX(-${index * 100}%)`;

    }

    const timer = setInterval(moveSlide, 3000);

    track.addEventListener("transitionend", () => {

        // Reached the clone
        if (index === slides.length) {

            track.style.transition = "none";

            index = 0;

            track.style.transform = "translateX(0)";

            // Force browser reflow
            track.offsetHeight;

            track.style.transition = "transform .6s ease";
        }

    });

}

sidebarCarousel();