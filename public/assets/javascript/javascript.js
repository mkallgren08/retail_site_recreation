let productlist = ""

$(document).ready(function () {
  console.log("ready!");
  $.get("/catalogList", function (req, res) {
    let catalog = req;
    //console.log(catalog);

    productlist = catalog.productList
    console.log(productlist);
    renderProducts(productlist);
    renderHero(productlist, 0);
    console.log("productlist: " + productlist);
    applyClick();

    $(".thbnailDiv").mouseenter(function () {
      console.log("Value: " + $(this).attr('value'));
      renderHero(productlist, $(this).attr('value'));
      applyClick();
    })
  });
});


function applyClick() {
  $("#addToCart").on("click", function () {
    console.log("click heard! Value is " +
      $(this).attr('value'));
    alert("This costs $" + $(this).attr('value'));
  });
}

// $(window).on("load", function(){

// })

function renderProducts(products) {

  for (let i = 0; i < products.length; i++) {
    let price = products[i].pricing.price.retail

    // generate a new div to go into the hero wrapper
    let productWrapper = $("<div>");
    let prodInnerWrapper = $("<div>");
    let prodName = $("<p>");
    let prodPrice = $("<p>");
    let prodView = $("<button>");

    // thumbnail wrapper
    let prodThbWrapper = $("<div>");

    // add necessary classes for styling
    productWrapper.attr("class", "productWrapper inline");
    productWrapper.attr("value", i);
    prodInnerWrapper.attr("class", "prodInnerWrapper");
    prodName.attr("class", "productName");
    prodPrice.attr("class", "prodPrice");
    prodView.attr("class", "productLink btn");
    prodThbWrapper.attr("class", "thbnailDiv");
    prodThbWrapper.attr("value", i);


    // add content to each element
    prodName.append(products[i].brand + " " + products[i].description);
    prodPrice.append("$" + price);
    prodView.append("<p class = 'prodViewMore'> View More </p>");
    prodThbWrapper.append("<img src= '" + products[i].imageUrls.sm + "'alt='" + products[i].description + "'/>")

    // assemble each component in the Inner Wrapper
    prodInnerWrapper.append(prodThbWrapper);
    prodInnerWrapper.append(prodName);
    prodInnerWrapper.append(prodPrice);
    prodInnerWrapper.append(prodView);

    // append the Inner Wrapper to the Outer Wrapper
    productWrapper.append(prodInnerWrapper);

    $(".productlist").append(productWrapper);

  }
}

function renderHero(products, x) {
  $(".hero").empty();

  console.log("products: " + products);
  console.log("Hero variable: " + x);
  let price = products[x].pricing.price.retail

  // generate a new div to go into the hero wrapper
  let heroWrapper = $("<div>");
  let heroInnerWrapper = $("<div>");
  let heroNameAndList = $("<div>");
  let heroPriceAndAddtoCart = $("<div>")
  let heroInfoWrapper = $("<div>")
  let prodName = $("<p>");
  let prodPrice = $("<p>");
  let addCart = $("<button>");


  // thumbnail wrapper
  let heroThbWrapper = $("<div>");

  // bullet-point list wrapper 
  let bulletWrapper = $("<div>");
  let bulletList = $("<ul>");

  // add necessary classes for styling
  // top-level divs
  heroWrapper.attr("id", "heroWrapper");
  heroInnerWrapper.attr("id", "heroInnerWrapper");
  heroInfoWrapper.attr("id", "heroInfoWrapper");
  heroNameAndList.attr("id", "heroNameAndList");
  heroPriceAndAddtoCart.attr("id", "heroPriceAndAddToCart");
  // thumbnail
  heroThbWrapper.attr("id", "heroThbWrapper");

  // product name and bullet lists
  prodName.attr("class", "heroName");
  bulletWrapper.attr("class", "bulletWrapper");
  bulletList.attr("class", "bulletList")

  // product price and the "Add to Cart" button
  prodPrice.attr("class", "heroPrice");
  addCart.attr("id", "addToCart");
  // addCart.attr("class", "btn");
  addCart.attr("value", price)

  // classes to let the three grouping  sub-divs be easily styled
  heroThbWrapper.attr("class", "inline");
  heroNameAndList.attr("class", "inline");
  heroPriceAndAddtoCart.attr("class", "inline");
  heroInfoWrapper.attr("class", "inline");



  // assemble the three sub-divs that make up the hero div:
  // 1) prodThbWrapper, 2) heroNameAndList, 3) heroPriceAndAddToCart

  // 1) Thumbnail
  heroThbWrapper.append("<img src= '" + products[x].imageUrls.md + "'alt='" + products[x].description + "'/>")

  // 2) Name and Bullet Points
  prodName.append(products[x].brand + " " + products[x].description);
  // assmeble the bullet list put the <ul> inside the list div
  for (let j = 0; j < products[x].marketingBullets.length; j++) {
    bulletList.append("<li>" + products[x].marketingBullets[j] + "</li>")
  };

  bulletWrapper.append(bulletList);

  heroNameAndList.append(prodName);
  heroNameAndList.append(bulletWrapper);

  // 3) Price and Add-to-Cart Button
  prodPrice.append("$" + price);
  addCart.append("<p class = 'addToCartText'> Add to Cart </p>");

  heroPriceAndAddtoCart.append(prodPrice);
  heroPriceAndAddtoCart.append(addCart);

  // Assemble the Hero Inner Wrapper with the above three components
  heroInnerWrapper.append(heroThbWrapper);
  heroInfoWrapper.append(heroNameAndList);
  heroInfoWrapper.append(heroPriceAndAddtoCart);
  heroInnerWrapper.append(heroInfoWrapper);
  heroWrapper.append(heroInnerWrapper);



  $(".hero").append(heroWrapper);
}

console.log("Hello World!")
