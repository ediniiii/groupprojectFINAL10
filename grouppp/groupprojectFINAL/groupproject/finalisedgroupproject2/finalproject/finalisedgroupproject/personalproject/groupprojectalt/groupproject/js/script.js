$(function () {
  const games = [
    {
      title: "Cyber Legend",
      image: "https://th.bing.com/th/id/OIP.fZOSo3Z_GvghuvVA3f-rjQHaHa?r=0&rs=1&pid=ImgDetMain",
      price: 49.99,
      priceText: "$49.99",
      category: "Fighting",
      popularity: 95
    },
    {
      title: "Space Raiders",
      image: "https://cdn.akamai.steamstatic.com/steam/apps/1278210/header.jpg?t=1616952088",
      price: 39.99,
      priceText: "$39.99",
      category: "Horror",
      popularity: 85
    },
    {
      title: "Pixel Dungeon",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/365900/capsule_616x353.jpg?t=1447373246",
      price: 0,
      priceText: "Free",
      category: "Idle",
      popularity: 70
    },
    {
      title: "Zombie Frenzy",
      image: "https://th.bing.com/th/id/OIP.U3uWaP-zdkn9-zcF2y-qigAAAA?r=0&rs=1&pid=ImgDetMain",
      price: 19.99,
      priceText: "$19.99",
      category: "Horror",
      popularity: 90
    },
    {
      title: "Battle Arena",
      image: "https://img.freepik.com/premium-photo/2d-hero-battle-pvp-arena-background-casual-game-art-design-ai-generative_740533-7045.jpg",
      price: 59.99,
      priceText: "$59.99",
      category: "Fighting",
      popularity: 80
    },
    {
      title: "Idle Tycoon",
      image: "https://venturebeat.com/wp-content/uploads/2020/02/idle-miner-tycoon.jpg?fit=1920%2C1080&strip=all",
      price: 4.99,
      priceText: "$4.99",
      category: "Idle",
      popularity: 60
    }
  ];

  const upcomingGames = [
    {
      title: "Shadow Realm",
      image: "https://as01.epimg.net/meristation/imagenes/2014/08/13/album/1407941520_941520_000001_album_normal.jpg",
      releaseDate: "2025-09-10"
    },
    {
      title: "Galactic Frontier",
      image: "https://static.wixstatic.com/media/0ac54a_955e9788dab449ad9631a3b9eb6bda3a~mv2.png",
      releaseDate: "2025-11-25"
    },
    {
      title: "Dungeon Quest",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/697810/capsule_616x353.jpg?t=1669089653",
      releaseDate: "2025-10-15"
    },
    {
      title: "Cybernetic Wars",
      image: "https://w0.peakpx.com/wallpaper/47/581/HD-wallpaper-anthem-cyber-warriors-poster-2019-games-rpg-e3-2019-art-2019-anthem.jpg",
      releaseDate: "2025-12-01"
    },
    {
      title: "Mystic Quest",
      image: "https://th.bing.com/th/id/R.a3959880e559ecae50b82edd9f49b0ef?rik=RCezr0VU%2fQD5nw&pid=ImgRaw&r=0",
      releaseDate: "2026-01-20"
    },
    {
      title: "Star Pirates",
      image: "https://www.starpirates.net/landing_page/img/slideshow/2.jpg",
      releaseDate: "2026-03-15"
    }
  ];

  const $gameList = $("#game-list");
  const $searchBar = $("#searchBar");
  const $sortOptions = $("#sortOptions");
  const $wishlistContainer = $("#wishlist-container");
  const $emptyWishlistMsg = $("#empty-wishlist-msg");
  let currentCategory = "All";
  const wishlist = [];
  let userInfo = null;

  function renderGames(list) {
    if (!list.length) {
      $gameList.html('<p style="color:white;">No games found.</p>');
      return;
    }

    const html = list.map(game => `
      <div class="col-md-4 mb-4">
        <div class="card text-white bg-dark">
          <img src="${game.image}" class="card-img-top" alt="${game.title}">
          <div class="card-body">
            <h5 class="card-title">${game.title}</h5>
            <p class="card-text">Price: ${game.priceText}</p>
            <button class="btn btn-success btn-sm me-2 get-btn" data-title="${game.title}">Get</button>
            <button class="btn btn-outline-light btn-sm wishlist-btn" data-title="${game.title}" data-image="${game.image}">Add to Wishlist</button>
          </div>
        </div>
      </div>
    `).join("");

    $gameList.html(html);
  }

  function filterGames() {
    const query = $searchBar.val().toLowerCase();
    let filtered = games.filter(game => {
      const matchesCategory = currentCategory === "All" || game.category === currentCategory;
      const matchesSearch = game.title.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    const sortBy = $sortOptions.val();
    if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "popularity-desc") filtered.sort((a, b) => b.popularity - a.popularity);

    renderGames(filtered);
  }

  function renderUpcoming() {
    const $container = $("#upcoming-carousel-inner");
    $container.empty();

    const chunkSize = 3;
    for (let i = 0; i < upcomingGames.length; i += chunkSize) {
      const chunk = upcomingGames.slice(i, i + chunkSize);
      const activeClass = i === 0 ? "active" : "";

      const cardsHtml = chunk.map(game => `
        <div class="col-md-4">
          <div class="card text-white bg-dark mb-3">
            <img src="${game.image}" class="card-img-top" alt="${game.title}" style="height: 180px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">${game.title}</h5>
              <p class="card-text">Release Date: ${game.releaseDate}</p>
              <button class="btn btn-outline-light btn-sm wishlist-btn" data-title="${game.title}" data-image="${game.image}">Add to Wishlist</button>
            </div>
          </div>
        </div>
      `).join("");

      const carouselItem = `
        <div class="carousel-item ${activeClass}">
          <div class="row">
            ${cardsHtml}
          </div>
        </div>
      `;

      $container.append(carouselItem);
    }
  }

  function renderWishlist() {
    if (!wishlist.length) {
      $emptyWishlistMsg.show();
      $wishlistContainer.hide();
      return;
    }

    $emptyWishlistMsg.hide();
    $wishlistContainer.show().empty();

    wishlist.forEach(game => {
      const $card = $(`
        <div class="card mb-2 text-white bg-dark" style="display: none;">
          <div class="row g-0 align-items-center">
            <div class="col-4">
              <img src="${game.image}" class="img-fluid rounded-start" alt="${game.title}">
            </div>
            <div class="col-8">
              <div class="card-body py-2">
                <h5 class="card-title">${game.title}</h5>
                <button class="btn btn-danger btn-sm remove-wishlist-btn" data-title="${game.title}">Remove</button>
              </div>
            </div>
          
        </div>
      `);
      $wishlistContainer.append($card);
      $card.fadeIn(500);
    });
  }

  function addToWishlist(game) {
    if (!userInfo) {
      alert("Please fill out the form before adding to wishlist.");
      return;
    }
    if (!wishlist.some(g => g.title === game.title)) {
      wishlist.push(game);
      renderWishlist();
    }
  }

  $searchBar.on("input", filterGames);
  $sortOptions.on("change", filterGames);

  $(".category-btn").on("click", function () {
    $(".category-btn").removeClass("active");
    $(this).addClass("active");
    currentCategory = $(this).data("category");
    filterGames();
  });

  $(document).on("click", ".wishlist-btn", function () {
    const title = $(this).data("title");
    const image = $(this).data("image");
    addToWishlist({ title, image });
  });

  $(document).on("click", ".remove-wishlist-btn", function () {
    const title = $(this).data("title");
    const index = wishlist.findIndex(g => g.title === title);
    if (index !== -1) {
      wishlist.splice(index, 1);
      renderWishlist();
    }
  });

  $(document).on("click", ".get-btn", function () {
    const title = $(this).data("title");
    alert(`Thank you for getting "${title}"!`);
  });

  $("#wishlist-form").on("submit", function (e) {
    e.preventDefault();

    const name = $("#userName").val().trim();
    const email = $("#userEmail").val().trim();
    const feedback = $("#formFeedback");

    if (!name || !email) {
      feedback.text("Please fill out all fields.").css("color", "orange");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      feedback.text("Please enter a valid email address.").css("color", "orange");
      return;
    }

    userInfo = { name, email };
    feedback.text("Form submitted! You can now add games to your wishlist.").css("color", "lightgreen");
    $("#wishlist-form")[0].reset();
  });

  // Initialize everything
  renderGames(games);
  renderUpcoming();
  renderWishlist();
});
