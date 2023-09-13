$(document).ready(function() {
    $('#genre-btn').click(function() {
      $.ajax({
        dataType: "json",
        url: "https://binaryjazz.us/wp-json/genrenator/v1/genre/",
        success: function(results) {
          console.log(results);
          $('#genre').text(results)
        },
        error: function(xhr,status,error) {
          console.log(error);
        }
      });
    });
  });

$('#mix-btn').click(function() {
// Check for present genre
if ($('#genre').text() == "") {
    console.log('Genre has not been generated');
    $('#songs').text("Please generate a genre first!!!");
} 
else {
    // put genre into a proper search term (https://stackoverflow.com/a/1983661)
    var str = $('#genre').text();

    // replace spaces, forward slashes and dashes
    str = str.replace(/\s+/g, '+');
    str = str.replace(/\//g, '+'); 
    str = str.replace(/-/g, '+'); 

    // Get search contents (https://publicapis.io/i-tunes-search-api)
    const url = "https://justcors.com/l_anq6dsiw2hi/itunes.apple.com/search?key=mix&term=" + str + "&limit=15";
    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(data => {
    // Handle the response data here
    console.log(data);
    // check if there are generated results
    if (data["resultCount"] == 0) {
        $('#songs').text("Your genre is a bit too niche. Try generating something else!");
    } else {
        $('#songs').text("");
        for (var i = 0; i < data["resultCount"]; i++) {
            var song_anchor = $("<a>").attr("href", data["results"][i]["trackViewUrl"])
            .text(data["results"][i]["artistName"] + " - " + data["results"][i]["trackCensoredName"]);
            $('#songs').append(song_anchor);
            $('#songs').append("<br>");
        }
        $('#genre-cover').attr("src", data["results"][0]["artworkUrl100"]);
        $('#genre-credit').text("© Apple");
    }
    })
    .catch(error => {
    // Handle the error here
    console.error(error);
    });
}})