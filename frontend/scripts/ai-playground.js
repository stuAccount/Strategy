// Article data with added categories
const articles = [
  {
    title: "AI Development: A Practical Guide for Beginners",
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*0knps1iS2D9SoNbzeNbWYA.png",
    link: "../pages/ai-playground-pages/ai-development.html",
    category: "ai",
  },
  {
    title:
      '"I was 18 when I said I need to stop - I\'m now 42 sitting alone at a table having destroyed my life."',
    image: "../pages/ai-playground-pages/resources/00.png",
    link: "https://old.reddit.com/r/NoFap/comments/o9dzk2/i_was_18_when_i_said_i_need_to_stop_im_now_42/",
    category: "for-young-man",
  },
  {
    title: "How I Quit Video Games After 20 YEARS Of Addiction",
    image: "../pages/ai-playground-pages/resources/01.webp",
    link: "https://www.reddit.com/r/StopGaming/comments/y6wy40/how_i_quit_video_games_after_20_years_of_addiction/",
    category: "for-young-man",
  },
  // {
  //   title: "Web Performance Optimization Techniques for 2025",
  //   image:
  //     "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  //   link: "./web-performance.html",
  //   category: "engineering",
  // },
  // {
  //   title: "The Future of Quantum Computing: Practical Applications",
  //   image:
  //     "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
  //   link: "./quantum-computing.html",
  //   category: "technology",
  // },
  // {
  //   title: "Building Accessible Web Applications: A Complete Guide",
  //   image:
  //     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  //   link: "./accessible-web.html",
  //   category: "engineering",
  // },
];

// DOM elements
const articlesGrid = document.getElementById("articlesGrid");
const searchInput = document.getElementById("searchInput");
const loadingIndicator = document.getElementById("loading-indicator");
const noResults = document.getElementById("no-results");
const categoryButtons = document.querySelectorAll(".category-btn");
const themeToggle = document.getElementById("theme-toggle");
const searchInputField = document.getElementById("search-input");

// State
let currentCategory = "all";
let currentSearch = "";
let filteredArticles = [...articles];

// Theme handling
function initTheme() {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (prefersDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// Create article card HTML
function createArticleCard(article) {
  return `
    <a class="article-card" href="${
      article.link
    }" aria-labelledby="title-${generateId(article.title)}">
      <img class="article-image" src="${article.image}" alt="" loading="lazy" />
      <div class="article-content">
        <h2 class="article-title" id="title-${generateId(article.title)}">${
    article.title
  }</h2>
        <span class="article-category">${article.category}</span>
      </div>
    </a>
  `;
}

// Helper to generate ID-friendly string from article title
function generateId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

// Filter articles based on search and category
function filterArticles() {
  const searchTerm = currentSearch.toLowerCase();

  filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm);
    const matchesCategory =
      currentCategory === "all" || article.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  renderArticles();
}

// Render articles to the page
function renderArticles() {
  if (filteredArticles.length === 0) {
    articlesGrid.innerHTML = "";
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
    articlesGrid.innerHTML = filteredArticles.map(createArticleCard).join("");
  }
}

// Simulate loading articles
function loadArticles() {
  // Show loading indicator
  loadingIndicator.classList.remove("hidden");
  articlesGrid.innerHTML = "";

  // Simulate network request
  setTimeout(() => {
    loadingIndicator.classList.add("hidden");
    filterArticles();
  }, 800);
}

// Event listeners
searchInputField.addEventListener("input", (e) => {
  currentSearch = e.target.value;
  filterArticles();
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active category
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Update filter and render
    currentCategory = button.dataset.category;
    filterArticles();
  });
});

themeToggle.addEventListener("click", toggleTheme);

// Initialize
initTheme();
loadArticles();

// Add keyboard navigation for article cards
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Enter" &&
    document.activeElement.classList.contains("article-card")
  ) {
    document.activeElement.click();
  }
});
