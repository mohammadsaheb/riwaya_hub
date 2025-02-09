document.addEventListener("DOMContentLoaded", () => {
  loadFavorites();

  document.querySelectorAll(".heart").forEach((heart) => {
    heart.addEventListener("click", () => {
      const bookId = heart.closest(".card").dataset.id;
      toggleFavorite(bookId, heart);
    });
  });
});

function toggleFavorite(bookId, heart) {
  let readers_log = JSON.parse(localStorage.getItem("readers_log")) || [];
  let currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    alert("Please log in to add favorites.");
    return;
  }

  let userIndex = readers_log.findIndex((user) => user.email === currentUser);

  if (userIndex === -1) {
    alert("User not found!");
    return;
  }

  if (!Array.isArray(readers_log[userIndex].fav_books)) {
    readers_log[userIndex].fav_books = [];
  }
  const bookCard = document.querySelector(`.card[data-id="${bookId}"]`);
  const bookData = {
    id: bookId,
    imgSrc: bookCard.querySelector("img").src,
    more: bookCard.querySelector("a").outerHTML,
    love: bookCard.querySelector("button").outerHTML,
  };

  const bookIndex = readers_log[userIndex].fav_books.findIndex(
    (book) => book.id === bookId
  );

  if (bookIndex === -1) {
    readers_log[userIndex].fav_books.push(bookData);
    heart.classList.add("liked");
  } else {
    readers_log[userIndex].fav_books.splice(bookIndex, 1);
    heart.classList.remove("liked");
  }

  // تحديث localStorage
  localStorage.setItem("readers_log", JSON.stringify(readers_log));
}

function loadFavorites() {
  let readers_log = JSON.parse(localStorage.getItem("readers_log")) || [];
  let currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    alert("Please log in to view favorites.");
    return;
  }

  let userIndex = readers_log.findIndex((user) => user.email === currentUser);

  if (userIndex !== -1 && Array.isArray(readers_log[userIndex].fav_books)) {
    readers_log[userIndex].fav_books.forEach((favorite) => {
      const bookCard = document.querySelector(
        `.card[data-id="${favorite.id}"]`
      );
      if (bookCard) {
        const heart = bookCard.querySelector(".heart");
        heart.classList.add("liked");
      }
    });
  }
}
