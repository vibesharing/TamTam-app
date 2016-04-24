
  $("form").on("submit", function(e) {
    e.preventDefault();
    var request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
      maxResults: 3,
      order: "viewCount",
      publishedAfter: "2015-01-01T00:00:00Z"
    });
   request.execute(function(response) {
      var results = response.result;
      $("#results").html("");
      $.each(results.items, function(index, item) {
        $.get("tpl/item.html", function(data) {
          $("#results").append(tplawesome(data, [{
            "title": item.snippet.title,
            "videoid": item.id.videoId
          }]));
        });
      });
      resetVideoHeight();
  });
  });

  $(window).on("resize", resetVideoHeight);


function resetVideoHeight() {
  $(".video").css("height", $("#results").width() * 9 / 16);
}

function init() {
  gapi.client.setApiKey("AIzaSyADz6sKXG5eQHeco8rnGsIxbtZ5U2Rh0VY");
  gapi.client.load("youtube", "v3", function() {
  });
}
