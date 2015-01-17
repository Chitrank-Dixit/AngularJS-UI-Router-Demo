"use strict";angular.module("myApp",["ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/movies"),a.state("main",{url:"/","abstract":!0,views:{header:{templateUrl:"views/main/header.html"},footer:{templateUrl:"views/main/footer.html"}}}).state("main.movies",{url:"movies",views:{"content@":{templateUrl:"views/pages/movies/movies.html",controller:"MoviesCtrl"},"preview@main.movies":{templateUrl:"views/pages/movies/movie.preview.html"},"summary@main.movies":{templateUrl:"views/pages/movies/movie.summary.html"}}}).state("main.trailer",{url:"^/trailer/:name",views:{"content@":{templateUrl:"views/pages/movies/movie.trailer.html",controller:"MoviesCtrl"}}}).state("main.myMovies",{url:"my-movies",views:{"content@":{templateUrl:"views/pages/about.html"}}})}]),angular.module("myApp").controller("MoviesCtrl",["$scope","$state","$stateParams","Movies",function(a,b,c,d){a.$state=b,a.$stateParams=c,d.gettingMovies(30).then(function(b){a.movies=b})}]),angular.module("myApp").factory("Movies",["$http","$q",function(a,b){function c(c){var d=b.defer();return a({method:"GET",url:"https://itunes.apple.com/us/rss/topmovies/limit="+c+"/json"}).success(function(a){var b=[];angular.forEach(a.feed.entry,function(a){b.push(a.id.attributes["im:id"])}),d.resolve(b)}),d.promise}function d(c){if(angular.isArray(c)){var d=b.defer();return a.jsonp("https://itunes.apple.com/lookup",{params:{id:c.join(),callback:"JSON_CALLBACK"}}).success(function(a){angular.forEach(a.results,function(a){var b=a.artworkUrl100.replace("100x100","600x600"),c=a.artworkUrl100.replace("100x100","200x200");a.artworkUrl600=b,a.artworkUrl200=c}),d.resolve(a.results)}),d.promise}}return{gettingMovies:function(a){var e=b.defer();return c(a).then(function(a){d(a).then(function(a){e.resolve(a)})}),e.promise}}}]);