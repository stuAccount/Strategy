// const data = [
//   {
//     name: "Math",
//     courses: [
//       {
//         name: "Algebra Basics",
//         episodes: [
//           {
//             name: "Intro to Algebra",
//             url: "https://www.youtube.com/embed/5ANcspdYh_U",
//           },
//           {
//             name: "Solving Equations",
//             url: "https://www.youtube.com/embed/3XnF2QkB1pE",
//           },
//         ],
//       },
//       {
//         name: "Geometry",
//         episodes: [
//           {
//             name: "Triangles",
//             url: "https://www.youtube.com/embed/3bIqF1Y5p8k",
//           },
//         ],
//       },
//       {
//         name: "Calculus I",
//         episodes: [
//           { name: "Limits", url: "https://www.youtube.com/embed/example" },
//         ],
//       },
//       {
//         name: "Statistics",
//         episodes: [
//           {
//             name: "Mean & Median",
//             url: "https://www.youtube.com/embed/example",
//           },
//         ],
//       },
//       {
//         name: "Linear Algebra",
//         episodes: [
//           { name: "Vectors", url: "https://www.youtube.com/embed/example" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Science",
//     courses: [
//       {
//         name: "Physics 101",
//         episodes: [
//           {
//             name: "Newton's Laws",
//             url: "https://www.youtube.com/embed/kKKM8Y-u7ds",
//           },
//         ],
//       },
//       {
//         name: "Chemistry Basics",
//         episodes: [
//           { name: "Atoms", url: "https://www.youtube.com/embed/example" },
//         ],
//       },
//       {
//         name: "Biology 101",
//         episodes: [
//           { name: "Cells", url: "https://www.youtube.com/embed/example" },
//         ],
//       },
//     ],
//   },
// ];

let data = [];

fetch("http://localhost:8080/api/categories")
  .then((res) => res.json())
  .then((fetchedData) => {
    data = fetchedData;
    renderAll();
  });

let selectedCategory = 0,
  selectedCourse = 0,
  selectedEpisode = 0;

// Carousel state
let courseCarouselPosition = 0;
let episodeCarouselPosition = 0;
let itemsPerView = 3; // Adjust based on screen size
let isSliding = false; // Add this at the top with other state

function renderCategories() {
  const bar = document.getElementById("categoryTabs");
  // Remove all except the search icon
  bar.innerHTML = bar.querySelector(".search-icon")?.outerHTML || "";
  data.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (i === selectedCategory ? " active" : "");
    btn.textContent = cat.name;
    btn.onclick = () => {
      selectedCategory = i;
      selectedCourse = 0;
      selectedEpisode = 0;
      courseCarouselPosition = 0;
      episodeCarouselPosition = 0;
      renderAll();
    };
    bar.appendChild(btn);
  });
}

function createCarousel(
  containerId,
  items,
  selectedIndex,
  carouselPosition,
  onItemClick,
  type
) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carousel-container";

  const track = document.createElement("div");
  track.className = "carousel-track";
  track.id = `${type}-track`;

  // Create cards
  items.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "card" + (i === selectedIndex ? " active" : "");
    div.textContent = item.name;
    div.onclick = () => onItemClick(i);
    track.appendChild(div);
  });
  track.style.width = `${items.length * 220}px`; // 220px is max card width + gap, adjust as needed

  // Create navigation arrows
  const prevBtn = document.createElement("button");
  prevBtn.className = "carousel-nav prev";
  prevBtn.innerHTML = "❮";
  prevBtn.onclick = () => moveCarousel(type, -1);

  const nextBtn = document.createElement("button");
  nextBtn.className = "carousel-nav next";
  nextBtn.innerHTML = "❯";
  nextBtn.onclick = () => moveCarousel(type, 1);

  carouselContainer.appendChild(prevBtn);
  carouselContainer.appendChild(track);
  carouselContainer.appendChild(nextBtn);
  container.appendChild(carouselContainer);

  // Update carousel position
  updateCarouselPosition(type, carouselPosition, items.length);
  updateNavigationState(type, carouselPosition, items.length);
}

function moveCarousel(type, direction) {
  if (isSliding) return; // Prevent rapid clicks
  isSliding = true;
  setTimeout(() => {
    isSliding = false;
  }, 400); // Match transition duration

  const items =
    type === "course"
      ? data[selectedCategory].courses
      : data[selectedCategory].courses[selectedCourse].episodes;

  if (type === "course") {
    const newPosition = courseCarouselPosition + direction;
    const maxPosition = Math.max(0, items.length - itemsPerView);
    courseCarouselPosition = Math.max(0, Math.min(newPosition, maxPosition));
    updateCarouselPosition("course", courseCarouselPosition, items.length);
    updateNavigationState("course", courseCarouselPosition, items.length);
  } else {
    const newPosition = episodeCarouselPosition + direction;
    const maxPosition = Math.max(0, items.length - itemsPerView);
    episodeCarouselPosition = Math.max(0, Math.min(newPosition, maxPosition));
    updateCarouselPosition("episode", episodeCarouselPosition, items.length);
    updateNavigationState("episode", episodeCarouselPosition, items.length);
  }
}

function updateCarouselPosition(type, position, totalItems) {
  const track = document.getElementById(`${type}-track`);
  if (track) {
    // Get the first card to measure its width (including margin)
    const card = track.querySelector(".card");
    if (card) {
      const style = window.getComputedStyle(card);
      const cardWidth =
        card.offsetWidth +
        parseFloat(style.marginRight || 0) +
        parseFloat(style.marginLeft || 0);
      const offset = -position * cardWidth;
      track.style.transition =
        "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      track.style.transform = `translateX(${offset}px)`;
    }
  }
}

function updateNavigationState(type, position, totalItems) {
  const container = document.getElementById(
    type === "course" ? "courseList" : "episodeList"
  );
  const prevBtn = container.querySelector(".carousel-nav.prev");
  const nextBtn = container.querySelector(".carousel-nav.next");

  if (prevBtn) prevBtn.disabled = position <= 0;
  if (nextBtn)
    nextBtn.disabled = position >= Math.max(0, totalItems - itemsPerView);
}

function renderCourses() {
  const courses = data[selectedCategory].courses;
  createCarousel(
    "courseList",
    courses,
    selectedCourse,
    courseCarouselPosition,
    (i) => {
      selectedCourse = i;
      selectedEpisode = 0;
      episodeCarouselPosition = 0;
      renderAll();
    },
    "course"
  );
}

function renderEpisodes() {
  const episodes = data[selectedCategory].courses[selectedCourse].episodes;
  createCarousel(
    "episodeList",
    episodes,
    selectedEpisode,
    episodeCarouselPosition,
    (i) => {
      selectedEpisode = i;
      renderAll();
    },
    "episode"
  );
}

function renderVideo() {
  const player = document.getElementById("videoPlayer");
  const url =
    data[selectedCategory].courses[selectedCourse].episodes[selectedEpisode]
      .url;
  player.innerHTML = `<iframe src="${url}" allowfullscreen></iframe>`;
}

function renderAll() {
  renderCategories();
  renderCourses();
  renderEpisodes();
  renderVideo();
}

function openSearch() {
  alert("Search clicked!");
}

// Responsive itemsPerView adjustment
function updateItemsPerView() {
  const width = window.innerWidth;
  if (width < 500) {
    itemsPerView = 2;
  } else if (width < 700) {
    itemsPerView = 3;
  } else {
    itemsPerView = 4;
  }
}

// Initialize and handle window resize
window.addEventListener("resize", () => {
  updateItemsPerView();
  // Reset carousel positions on resize
  courseCarouselPosition = 0;
  episodeCarouselPosition = 0;
  renderAll();
});

// Initial setup
updateItemsPerView();
// renderAll();
