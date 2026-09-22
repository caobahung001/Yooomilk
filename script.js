// ===============================
// CART DATA
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// SAVE CART
// ===============================

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// ADD CART
// ===============================

function addCart(name, price, image, btn, quantity = 1) {
  let product = cart.find((item) => item.name === name);

  if (product) {
    product.quantity += quantity;
  } else {
    cart.push({
      name: name,

      price: Number(price),

      image: image,

      quantity: quantity,
    });
  }

  saveCart();

  updateCart();

  if (btn) {
    flyToCart(btn, image);
  }
}
// ===============================
// FLY TO CART
// ===============================

function flyToCart(btn, image) {
  let fly = document.createElement("img");

  fly.src = image;

  fly.className = "fly-image";

  document.body.appendChild(fly);

  let start = btn
    .closest(".product-card")
    .querySelector("img")
    .getBoundingClientRect();

  let end = document.querySelector(".cart-icon").getBoundingClientRect();

  fly.style.left = start.left + "px";

  fly.style.top = start.top + "px";

  setTimeout(() => {
    fly.style.left = end.left + "px";

    fly.style.top = end.top + "px";

    fly.style.width = "35px";

    fly.style.height = "35px";
  }, 100);

  setTimeout(() => {
    fly.remove();
  }, 900);
}

// ===============================
// UPDATE CART
// ===============================

function updateCart() {
  let count = 0;

  let total = 0;

  cart.forEach((item) => {
    count += item.quantity;

    total += item.price * item.quantity;
  });

  let shippingBox = document.querySelector(".shipping-box");

  if (shippingBox) {
    let remain = 300000 - total;

    if (remain > 0) {
      shippingBox.innerHTML = `
        🚚 Còn ${remain.toLocaleString()}đ
        <br>
        để được miễn phí giao hàng
        `;
    } else {
      shippingBox.innerHTML = `
        🎉 Bạn đã được miễn phí giao hàng
        `;
    }
  }

  let badge = document.getElementById("cart-count");

  if (badge) {
    badge.innerHTML = count;
  }

  let list = document.getElementById("cart-list");

  if (list) {
    if (cart.length === 0) {
      list.innerHTML = `
<p>
Chưa có sản phẩm
</p>
`;
    } else {
      list.innerHTML = "";

      cart.forEach((item, index) => {
        list.innerHTML += `

<div class="cart-item">


<img src="${item.image}">


<div>


<b>

${item.name}

</b>


<br>


<span>

${item.price.toLocaleString()}đ

</span>



<br><br>



<button onclick="minus(${index})">

−

</button>



<span style="padding:0 10px">

${item.quantity}

</span>



<button onclick="plus(${index})">

+

</button>



<button onclick="removeCart(${index})">

X

</button>



</div>



</div>


`;
      });
    }
  }

  let totalBox = document.getElementById("total");

  if (totalBox) {
    totalBox.innerHTML = total.toLocaleString();
  }

  saveCart();
}

// ===============================
// PLUS
// ===============================

function plus(index) {
  cart[index].quantity++;

  updateCart();
}

// ===============================
// MINUS
// ===============================

function minus(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}

// ===============================
// REMOVE
// ===============================

function removeCart(index) {
  cart.splice(index, 1);

  updateCart();
}

// ===============================
// OPEN CLOSE CART
// ===============================

function openCart() {
  let cartBox = document.getElementById("cart-box");

  if (cartBox) {
    cartBox.classList.add("show");
  }
}

function closeCart() {
  document.getElementById("cart-box").classList.remove("show");
}

// ===============================
// SIDE MENU
// ===============================

function openMenu() {
  let menu = document.querySelector(".side-menu");

  let overlay = document.querySelector(".overlay");

  if (menu) {
    menu.classList.add("active");
  }

  if (overlay) {
    overlay.classList.add("active");
  }
}

function closeMenu() {
  let menu = document.querySelector(".side-menu");

  let overlay = document.querySelector(".overlay");

  if (menu) {
    menu.classList.remove("active");
  }

  if (overlay) {
    overlay.classList.remove("active");
  }
}

// ===============================
// CHECKOUT
// ===============================

function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống");

    return;
  }

  document.getElementById("cart-box").innerHTML = `


<div class="checkout-success">


<div class="success-logo">

YoooMILK

</div>



<div class="success-icon">

✓

</div>



<h2>

Thanh toán thành công

</h2>



<p>

Cảm ơn quý khách đã mua hàng tại

<br>

<b>YoooMILK</b>

</p>



<div class="order-code">

Mã đơn hàng: TH${Date.now()}

</div>




<div class="success-buttons">


<button onclick="location.href='index.html'">

Về trang chủ

</button>



<button onclick="location.href='products.html'">

Tiếp tục mua hàng

</button>


</div>



</div>


`;

  cart = [];

  localStorage.removeItem("cart");
}

// ===============================
// SCROLL SHOP
// ===============================

function scrollProducts() {
  let shop = document.getElementById("products");

  if (shop) {
    shop.scrollIntoView({
      behavior: "smooth",
    });
  } else {
    location.href = "products.html";
  }
}

// ===============================
// INIT
// ===============================

document.addEventListener(
  "DOMContentLoaded",

  () => {
    updateCart();
  },
);
function toggleChat() {
  let box = document.getElementById("chatBox");

  if (box.style.display === "block") {
    box.style.display = "none";
  } else {
    box.style.display = "block";
  }
}

function sendMessage() {
  let input = document.getElementById("userMessage");

  let message = input.value;

  if (message.trim() == "") return;

  let chat = document.getElementById("chatContent");

  chat.innerHTML += `
        <p>👤 Bạn: ${message}</p>
    `;

  setTimeout(() => {
    chat.innerHTML += `
        <p>
        🐐 Yooomilk AI:
        Tôi có thể hỗ trợ bạn về sản phẩm sữa dê, giá bán, khuyến mãi và đặt hàng.
        </p>
        `;

    chat.scrollTop = chat.scrollHeight;
  }, 700);

  input.value = "";
}
