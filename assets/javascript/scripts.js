// Giphy API Key: kNq2UBVUymcEGIOrh9rNIQi5NulwsnPO


    var foods = ["Pizza", "Burger", "Ice Cream", "Burritos", "Tacos", "Salad", "Avocado Toast", "Candy", "Chocolate"];
    var favs = [];

    var addingFavs = false;

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
  
              var p = $("<p>").text("Rating: " + results[i].rating);

              var foodImage = $("<img>");

              foodImage.attr("class", "gif");
              foodImage.attr("data-state", "still");
              foodImage.attr("src", results[i].images.fixed_height_still.url);
              foodImage.attr("data-animated", results[i].images.fixed_height.url);
              foodImage.attr("data-still", results[i].images.fixed_height_still.url);
  

              foodDiv.append(p);
              foodDiv.append(foodImage);

              $("#gif-dump").prepend(foodDiv);
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

    }

    $(document).on("click", ".food", displayFoodInfo);
    $(document).on("click", ".gif", foodAnimate);
    $(document).on("click", ".gif", addFavs);

    renderButtons();