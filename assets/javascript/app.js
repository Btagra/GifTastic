var movies = ["The Notebook", "The Dark Knight", "The Lion King", "The Matrix"];

function displayMovieInfo() {
    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=Xb2k5BoQLrA136kq2yoQWLQNIFzoaBgt&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var movieDiv = $("<div>");
            movieDiv.addClass('gif')
            var p = $("<p>").text("Rating: " + results[i].rating);

            var movieImage = $("<img>");
            movieImage.addClass('anImg')
            movieImage.attr("src", results[i].images.fixed_height_still.url);
            movieImage.attr('data-still', results[i].images.fixed_height_still.url);
            movieImage.attr('data-animate', results[i].images.fixed_height.url);
            movieImage.attr("data-state", "still");

            movieDiv.append(p);
            movieDiv.append(movieImage);
            $("#movie-view").prepend(movieDiv);
        }

        $(".anImg").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                var animate = $(this).attr("data-animate");
                $(this).attr("src", $(this).data('animate'));
                $(this).attr("data-state", "animate");
            }
            else {
                var still = $(this).attr("data-still");
                $(this).attr("src", $(this).data('still'));
                $(this).attr("data-state", "still");
            }
        });
    });
}

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < movies.length; i++) {
        var a = $("<button>");
        a.addClass("movie-btn");
        a.attr("data-name", movies[i]);
        a.text(movies[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-movie").on("click", function (event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    movies.push(movie);
    renderButtons();
});

$(document).on("click", ".movie-btn", displayMovieInfo);

renderButtons();
