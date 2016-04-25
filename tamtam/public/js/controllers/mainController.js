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

  $scope.booll = function() {
    $scope.bool = false;
  };

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
      // console.log(data);
      $scope.movie = data;
      $scope.movies.push($scope.movie);
      console.log($scope.movies);
    }).error(function(data, status, headers, config) {

      alert(status);
    });


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

  $scope.searchtrailer= function(){

  }
}
