// alert("connected");

$(document).ready(function () {

// Creates list/array of topics
var topics = ["dogs", "games", "cartoons"];
var userInput = $("#giphy-input").val();

genButtons();

    //funtion to create buttons
    function genButtons (params) {
                // (this is necessary otherwise we will have repeat buttons)
            $("#giphyBtn").empty();

            // Looping through the array of movies
            for (var i = 0; i < topics.length; i++) {
                // create buttons each giphy in the array.
                // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
                var genButton = $("<button>");
                // Adding a class
                genButton.addClass("giphyButton");
                // Adding a data-attribute with a value of the giphy at index i
                genButton.attr("data-name", topics[i]);
                // Providing the button's text with a value of the giphy at index i
                genButton.text(topics[i]);
                // Adding the button to the HTML
                $("#giphyBtn").append(genButton);
                //generate images for each button
                
            }
    }

    //Generate image for buttons

   // This function handles events where the add giphy button is clicked
    $('#find-giphy').on("click", function (event) {
        //stop bubbling
        // event.stopPropagation();
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();
        //get user input
        userInput = $("#giphy-input").val();
        //pushes input to giphy list
        topics.push(userInput);
        //generates buttons
        genButtons();
  
       
    
        $("button").on("click", function (event) {
            //stop bubbling
            // event.stopPropagation();
            // event.preventDefault() prevents submit button from trying to send a form.
            // Using a submit button instead of a regular button allows the user to hit
            // "Enter" instead of clicking the button if desired
            event.preventDefault();
        //getting data-name from button
            var userInput = $(this).attr("data-name");   
        
            //api key
            var APIkey = "UXl9FNp2rHeOY8b1STlKb8DjvH1PvOcz";

            // Example queryURL for Giphy API
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=" + APIkey + "&limit=10";

        // Performing an AJAX request with the queryURL 
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(queryURL);
                    console.log(response);
                    console.log(response.data[0].images.fixed_height.url);
                    // (this is necessary otherwise we will have repeat buttons)
                    $("#giphyPix").empty();
                    var results = response.data;

                    for (var j = 0; j < results.length; j++) {
                        
                        //naming a new div giphyDiv
                        var giphyDiv = $("<div>");

                        //variable for rating and title
                        var title = results[j].title;
                            console.log(results[j].title);

                        var rating = results[j].rating;
                            console.log(results[j].rating);

                        // creating p tag for rating and title
                        var pTitle = $("<p>").text("Title: " + title);
                        var pRating = $("<p>").text("Rating: " + rating);

                        var giphyImage = $("<img>");
                        giphyImage.attr("src", results[j].images.fixed_height.url);
                            console.log(results[j].images.fixed_height);

                        giphyDiv.append(pTitle);
                        giphyDiv.append(pRating);
                        giphyDiv.append(giphyImage);

                        $("#giphyPix").prepend(giphyDiv);
                            //catch errors 
                    // }).catch(function (error) {
                    // console.log('ERROR', error); 
                    
                    }
                });
        });
            
    });
});