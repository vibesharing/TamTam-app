// mainController

function mainController($http, $scope, mainService) {
  $scope.movies=[];
  $scope.popularmovies = function(){
    mainService.get().then(function(res){
      $scope.popular = res.data;
      console.log($scope.popular.results);
    });
  };
  $scope.popularmovies();

    $scope.bool = true;


  $scope.search = function(movieToSearch) {
    $http({
      method: 'jsonp',
      url: 'http://www.omdbapi.com/',
      params: {
        t: movieToSearch,
        plot: 'full',
        callback: 'JSON_CALLBACK'
      }
    }).success(function(data, status, headers, config) {

      $scope.movie = data;
      //check if the movie has been already searched
      var check = 0;
      var checkindex = 0;
      for(var i = 0; i < $scope.movies.length ; i++ ){
        if($scope.movie.Title == $scope.movies[i].Title){
          console.log($scope.movie.Title);
          check = 1;
          checkindex = i;
        }
      }
      if(check < 1){
        $scope.movies.push($scope.movie);
      }
      else{
        $scope.movies.splice(checkindex,1);
        $scope.movies.push($scope.movie);
      }
    }).error(function(data, status, headers, config) {

      alert(status);
    });


  };
  $scope.searchAgain = function(movie){
    $scope.movie = movie;
  };

  $scope.click = function(){
    var request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      q: encodeURIComponent($scope.movieToSearch+'trailer').replace(/%20/g, "+"),
      maxResults: 1
      // order: "viewCount"
      // publishedAfter: "2015-01-01T00:00:00Z"
    });
    request.execute(function(response) {
      $scope.result = response;

      $('#videoFrame').attr('src', 'https://www.youtube.com/embed/' + $scope.result.items[0].id.videoId);

    });
  }
  $scope.clickpoupular = function(u){
    var request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      q: encodeURIComponent(u+'trailer').replace(/%20/g, "+"),
      maxResults: 1
      // order: "viewCount"
      // publishedAfter: "2015-01-01T00:00:00Z"
    });
    request.execute(function(response) {
      $scope.result = response;

      $('#videoFrame').attr('src', 'https://www.youtube.com/embed/' + $scope.result.items[0].id.videoId);

    });
  }
  $scope.searchtrailer= function(){

  }
}
