// Giphy API Key: kNq2UBVUymcEGIOrh9rNIQi5NulwsnPO

      // Initial array of food categories.

      var foods = ["Pizza", "Burgers", "Ice Cream", "Burritos", "Tacos", "Salad", "Avocado Toast", "Candy", "Chocolate"];


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
              // Setting the src attribute of the image to a property pulled off the result item
              foodImage.attr("class", "gif");
              foodImage.attr("data-state", "still");
              foodImage.attr("src", results[i].images.fixed_height_still.url);
              foodImage.attr("data-animated", results[i].images.fixed_height.url);
              foodImage.attr("data-still", results[i].images.fixed_height_still.url);
  
              // Appending the paragraph and image tag to the animalDiv
              foodDiv.append(p);
              foodDiv.append(foodImage);
  
              // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
              $("#gif-dump").prepend(foodDiv);
            }
          });
      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-area").empty();

        // Looping through the array of movies
        for (var i = 0; i < foods.length; i++) {

          // Then dynamically generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("food");
          // Adding a data-attribute
          a.attr("data-name", foods[i]);
          // Providing the initial button text
          a.text(foods[i]);
          // Adding the button to the buttons-view div
          $("#button-area").append(a);
        }
      }

    function foodAnimate() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
        var toAnimate = $(this).attr("data-animated");
          $(this).attr("src", toAnimate);
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      };

      // This function handles events where one button is clicked
    //   $("#add-movie").on("click", function(event) {
    //     event.preventDefault();

    //     // This line grabs the input from the textbox
    //     var movie = $("#movie-input").val().trim();

    //     // Adding the movie from the textbox to our array
    //     movies.push(movie);
    //     console.log(movies);

    //     // Calling renderButtons which handles the processing of our movie array
    //     renderButtons();
    //   });

      // Function for displaying the movie info
      // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
      $(document).on("click", ".food", displayFoodInfo);
      $(document).on("click", ".gif", foodAnimate);

      // Calling the renderButtons function to display the initial buttons
      renderButtons();