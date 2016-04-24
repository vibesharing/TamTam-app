function mainService($http){
  return{
      get:function() {
            return $http.get('http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bef31feb8100e4796868cfe44a27fbb9');

    }
  };
}
