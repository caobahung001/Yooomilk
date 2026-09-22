// ===============================
// PRODUCT DETAIL DATA
// ===============================

let quantity = 1;

let currentProduct = JSON.parse(localStorage.getItem("currentProduct")) || {
  name: "YoooMILK nguyên chất",

  price: 35000,

  image: "images/nguyenchat.png",
};

// ===============================
// LOAD PRODUCT
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  let name = document.getElementById("product-name");

  let price = document.getElementById("product-price");

  let image = document.getElementById("product-image");

  if (name) {
    name.innerHTML = currentProduct.name;
  }

  if (price) {
    price.innerHTML = Number(currentProduct.price).toLocaleString() + "đ";
  }

  if (image) {
    image.src = currentProduct.image;
  }

  let desc = document.getElementById("product-desc");

  if (desc) {
    desc.innerHTML =
      currentProduct.name +
      " mang đến nguồn dinh dưỡng chất lượng, " +
      "được sản xuất từ nguồn sữa tươi sạch YoooMILK.";
  }
});

// ===============================
// CHANGE IMAGE THUMBNAIL
// ===============================

function changeImage(src) {
  let main = document.getElementById("product-image");

  if (main) {
    main.src = src;
  }
}

// ===============================
// QUANTITY
// ===============================

function changeQty(value) {
  quantity += value;

  if (quantity < 1) {
    quantity = 1;
  }

  let box = document.getElementById("quantity");

  if (box) {
    box.innerHTML = quantity;
  }
}

// ===============================
// ADD TO CART
// ===============================

function addDetailCart() {
  let cartData = JSON.parse(localStorage.getItem("cart")) || [];

  let product = cartData.find((item) => item.name === currentProduct.name);

  if (product) {
    product.quantity += quantity;
  } else {
    cartData.push({
      name: currentProduct.name,

      price: Number(currentProduct.price),

      image: currentProduct.image,

      quantity: quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cartData));

  // cập nhật biến cart của script.js
  cart = cartData;

  updateCart();

  flyDetailToCart();

  showToast("Đã thêm " + currentProduct.name + " vào giỏ hàng");
}
// ===============================
// BUY NOW
// ===============================

function buyNow() {
  addDetailCart();

  setTimeout(() => {
    openCart();
  }, 700);
}

// ===============================
// FLY IMAGE
// ===============================

function flyDetailToCart() {
  let img = document.getElementById("product-image");

  let cartIcon = document.querySelector(".cart-icon");

  if (!img || !cartIcon) return;

  let fly = document.createElement("img");

  fly.src = img.src;

  fly.className = "fly-image";

  document.body.appendChild(fly);

  let start = img.getBoundingClientRect();

  let end = cartIcon.getBoundingClientRect();

  fly.style.left = start.left + "px";

  fly.style.top = start.top + "px";

  fly.style.width = "120px";

  fly.style.height = "120px";

  setTimeout(() => {
    fly.style.left = end.left + 10 + "px";

    fly.style.top = end.top + 10 + "px";

    fly.style.width = "35px";

    fly.style.height = "35px";
  }, 100);

  setTimeout(() => {
    fly.remove();
  }, 900);
}

// ===============================
// TOAST
// ===============================

function showToast(message) {
  let toast = document.createElement("div");

  toast.className = "toast-message";

  toast.innerHTML = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}
