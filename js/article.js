const params = new URLSearchParams(window.location.search);
const articleId = Number(params.get("id"));

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

    document.getElementById("author").textContent =
        article.author;

    document.getElementById("date").textContent =
        article.date;

    document.getElementById("articleImg").src =
        article.img;

    document.getElementById("story").textContent =
        article.fullStory;
}

loadArticle();