const params = new URLSearchParams(window.location.search);
const articleId = Number(params.get("id"));

async function loadRelatedArticles(articleId) {
    
    const response = await fetch("../data/index.json");
    const articles = await response.json(); 

    const currentArticle = articles.find(a => a.id === articleId);
    if (!currentArticle) return;

    let related = articles.filter(article =>
        article.category === currentArticle.category &&
        article.id !== articleId
    );

    if (related.length < 4) {
        const extra = articles.filter(article =>
            article.id !== articleId &&
            !related.includes(article)
        );

        related = [...related, ...extra];
    }

    related = related.slice(0, 4);

    const container = document.getElementById("relatedGrid");
    container.innerHTML = "";

    related.forEach(article => {

        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${article.headline}</h3>
        `;

        card.addEventListener("click", () => {
            window.location.href = `article.html?id=${article.id}`;
        });

        container.appendChild(card);
    });


if (related.length < 4) {

    const extra = articles.filter(article =>
        article.id !== articleId &&
        !related.includes(article)
    );

    related = [...related, ...extra];
}

related = related.slice(0, 4);
}

function getReadingTime(text) {
    const words = text.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

async function loadArticle() {

    const response = await fetch("../data/index.json");
    const articles = await response.json();

    const article = articles.find(a => a.id === articleId);

    if (!article) {
        document.body.innerHTML = "<h1>Article not found</h1>";
        return;
    }

    document.getElementById("headline").textContent =
        article.headline;

    let authorText = article.author.trim() === "" ? "by Today Newspaper Staff" : `By ${article.author}`;
    document.getElementById("author").textContent = authorText;

    document.getElementById("date").textContent =
        formatPublicationDate(article.date);

    document.getElementById("readingTime").textContent =
        getReadingTime(article.fullStory);

    document.getElementById("articleImg").src =
        article.img;

    document.getElementById("story").textContent =
        article.fullStory;

    loadRelatedArticles(articleId);

}


loadArticle();