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
        renderButtons();
    });

    $("#add-fav").on("click", function() {
        addingFavs = !addingFavs;
        console.log(addingFavs);
        
    })

    function addFavs() {
        if (addingFavs === true) {
            favCount++;
            var itemRating = $(this).siblings(".rating").text();
            var itemTitle = $(this).siblings(".title").text();
            console.log("The item rating is: " + itemRating);
            var itemClass = $(this).attr("class");
            var itemSrc = $(this).attr("src");
            var itemAnimate = $(this).attr("data-animated");
            var itemStill = $(this).attr("data-still");
            localStorage.setItem("itemTitle" + favCount, itemTitle);
            localStorage.setItem("itemRating" + favCount, itemRating);
            localStorage.setItem("itemClass" + favCount, itemClass);
            localStorage.setItem("itemSrc" + favCount, itemSrc);
            localStorage.setItem("itemAnimate" + favCount, itemAnimate);
            localStorage.setItem("itemStill" + favCount, itemStill);
        }
    }

    $("#favorite-gifs-btn").on("click", function() {
        $("#favorites-dump").toggleClass("hidden");
    })

    $(document).on("click", ".food", displayFoodInfo);
    $(document).on("click", ".gif", foodAnimate);
    $(document).on("click", ".gif", addFavs);

    renderButtons();