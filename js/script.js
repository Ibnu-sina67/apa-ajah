// toggle class active untuk h-menu
const navbarNav = document.querySelector(".navbar-nav");
// menu
document.querySelector("#h-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// toggle active untuk search
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');


document.querySelector('#search-button').onclick = (e) => {
searchForm.classList.toggle('active');
searchBox.focus();
e.preventDefault();
};

// toggle class aktif shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
}

// hilang nav
const hm = document.querySelector("#h-menu");
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
document.addEventListener("click", function(e) {
  if(e.target.closest(".item-detail-button")) {
    e.preventDefault();
    itemDetailModal.style.display = "flex";
  }
});


// Klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
}

// klik diluar modal
itemDetailModal.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};

// tombol add to cart dari modal
const modalAddCart = document.querySelector('#modal-add-cart');

modalAddCart.addEventListener('click', function(e){
  e.preventDefault();

  // contoh ambil produk pertama (sementara)
  const product = {
    id: 1,
    name: "Mie Ayam",
    img: "1.jpg",
    price: 10000
  };

  // tambahkan ke cart
  Alpine.store('cart').add(product);

  // tutup modal
  itemDetailModal.style.display = "none";

  // buka shopping cart
  shoppingCart.classList.add('active');
});