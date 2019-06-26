// Giphy API Key: kNq2UBVUymcEGIOrh9rNIQi5NulwsnPO


    var foods = ["Pizza", "Burger", "Ice Cream", "Burritos", "Tacos", "Salad", "Avocado Toast", "Candy", "Chocolate"];


    var addingFavs = false;
    var favCount = 0;


    function displayFoodInfo() {

        var food = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=kNq2UBVUymcEGIOrh9rNIQi5NulwsnPO&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {
            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {

              var foodDiv = $("<div>");
              var rating = $("<p>").text("Rating: " + results[i].rating).attr("class", "rating");
              var title = $("<p>").text("Title: " + results[i].title).attr("class", "title");
              var foodImage = $("<img>");

              foodImage.attr("class", "gif");
              foodImage.attr("data-state", "still");
              foodImage.attr("src", results[i].images.fixed_height_still.url);
              foodImage.attr("data-animated", results[i].images.fixed_height.url);
              foodImage.attr("data-still", results[i].images.fixed_height_still.url);
  
              foodDiv.append(foodImage);
              foodDiv.append(title);
              foodDiv.append(rating);

              $("#gifs-here").prepend(foodDiv);
            }
        });
    }


    function renderButtons() {

        $("#button-area").empty();

        for (var i = 0; i < foods.length; i++) {
            var a = $("<button>");
            a.addClass("food");
            a.attr("data-name", foods[i]);
            a.text(foods[i]);
            $("#button-area").append(a);
        }
    }

    function foodAnimate() {

        var state = $(this).attr("data-state");

        if (state === "still") {
        var toAnimate = $(this).attr("data-animated");
            $(this).attr("src", toAnimate);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };


    $("#add-food").on("click", function(event) {
        event.preventDefault();
        var food = $("#food-input").val().trim();
        foods.push(food);
        if ($("#customize-alert").text() != "") {
            $("#customize-alert").append("<br />" + food +" has been added to buttons. Click on it to see the gifs!"); 
        } else {
            $("#customize-alert").toggleClass("hidden");
            $("#customize-alert").html(food +" has been added to buttons. Click on it to see the gifs!");
            setTimeout(function() {
                $("#customize-alert").html("");
                $("#customize-alert").toggleClass("hidden");
            }, 5000);
            renderButtons();
        }
    });

    $("#add-fav").on("click", function() {
        addingFavs = !addingFavs;
        if ($("#customize-alert").text() != "") {
            $("#customize-alert").append("<br />" + "Click on a gif below to add it to your favourites!"); 
        } else {
            $("#customize-alert").toggleClass("hidden");
            $("#customize-alert").html("Click on a gif below to add it to your favourites!");
            setTimeout(function() {
                $("#customize-alert").html("");
                $("#customize-alert").toggleClass("hidden");
            }, 5000);
        }
    })

    function addFavs() {
        if (addingFavs === true) {
            var checkCount = localStorage.getItem("currentFavCount");
            console.log("The CheckCount is: " + checkCount);
            if (checkCount != null) {
                favCount = checkCount;
                favCount++;
            } else {
            favCount++;
            }
            localStorage.setItem("currentFavCount", favCount);
            var favsArray = [ ];
            var itemRating = $(this).siblings(".rating").text();
            var itemTitle = $(this).siblings(".title").text();
            var itemSrc = $(this).attr("src");
            var itemAnimate = $(this).attr("data-animated");
            var itemStill = $(this).attr("data-still");
            console.log("The values I want are" + itemTitle, itemRating, itemSrc, itemAnimate, itemStill);
            favsArray.push(itemTitle, itemRating, itemSrc, itemAnimate, itemStill);
            console.log(JSON.stringify(favsArray));
            localStorage.setItem("item" + favCount, JSON.stringify(favsArray));
            var retrievedItem = localStorage.getItem("item1");
            var newFav = JSON.parse(retrievedItem);
            addingFavs = false;
        }
    }

    $("#favorite-gifs-btn").on("click", function() {
        $("#favorites-dump").toggleClass("hidden");
        $("#fav-gifs-here").empty();

        for (i = 1 ; i < localStorage.length ; i++) {
            var item = localStorage.getItem("item" + i);
            var newFav = JSON.parse(item);
            console.log("This is the contents of item: " + newFav);
            favItemTitle = $("<p>").text(newFav[0]).attr("class", "title");
            favItemRating = $("<p>").text(newFav[1]).attr("class", "rating");
            var favFoodImage = $("<img>");
            favFoodImage.attr("src", newFav[2]);
            favFoodImage.attr("class", "gif");
            favFoodImage.attr("data-animated", newFav[3]);
            favFoodImage.attr("data-still", newFav[4]);

            var favFoodDiv = $("<div>");

            favFoodDiv.append(favFoodImage);
            favFoodDiv.append(favItemTitle);
            favFoodDiv.append(favItemRating);
            $("#fav-gifs-here").prepend(favFoodDiv);
        }
    })

    $(document).on("click", ".food", displayFoodInfo);
    $(document).on("click", ".gif", foodAnimate);
    $(document).on("click", ".gif", addFavs);

    renderButtons();