"use strict";angular.module("myApp",["ui.router","ngAnimate","config","angular-loading-bar"]).config(["$stateProvider","$urlRouterProvider",function(a,b){var c=["$state","selectedMovie",function(a,b){angular.isDefined(b)||a.go("main.movies")}],d=["movies","$stateParams","$filter",function(a,b,c){var d=c("filter")(a,{urlAlias:b.name});return d[0]}];b.otherwise("/movies"),a.state("main",{url:"/","abstract":!0,views:{header:{templateUrl:"views/main/header.html"},footer:{templateUrl:"views/main/footer.html"}}}).state("main.movies",{url:"movies",views:{"content@":{templateUrl:"views/pages/movies/movies.html",controller:"MoviesCtrl"},"preview@main.movies":{templateUrl:"views/pages/movies/movie.preview.html"},"summary@main.movies":{templateUrl:"views/pages/movies/movie.summary.html"}},resolve:{movies:["Movies",function(a){return a.gettingMovies(30)}]}}).state("main.movies.full",{url:"^/movie-info/{name}",views:{"content@":{templateUrl:"views/pages/movies/movie.full.html",controller:"MovieCtrl"}},resolve:{selectedMovie:d},onEnter:c}).state("main.movies.trailer",{url:"^/trailer/{name}",views:{"content@":{templateUrl:"views/pages/movies/movie.trailer.html",controller:"MovieCtrl"}},resolve:{selectedMovie:d},onEnter:c,data:{movie:{basePath:"http://www.youtube.com/embed/?listType=search&list=",params:{controls:2,modestbranding:1,rel:0,showinfo:0,autoplay:1,hd:1}}}})}]).run(["$rootScope","$state","$stateParams","$log","Config",function(a,b,c){a.$state=b,a.$stateParams=c}]),angular.module("config",[]).constant("Config",{debugUiRouter:!0}).value("debug",!0),angular.module("myApp").controller("MoviesCtrl",["$scope","$stateParams","movies",function(a,b,c){a.movies=c}]),angular.module("myApp").controller("MovieCtrl",["$scope","$stateParams","$state","Movies","selectedMovie",function(a,b,c,d,e){a.selectedMovie=e,angular.isDefined(c.current.data)&&(a.movieTrailerUrl=d.gettingMovieTrailerUrl(e.trackName,c.current.data.movie))}]),angular.module("myApp").factory("Movies",["$http","$q","$sce",function(a,b,c){function d(c){var d=b.defer();return a({method:"GET",url:"https://itunes.apple.com/us/rss/topmovies/limit="+c+"/json"}).success(function(a){var b=[];angular.forEach(a.feed.entry,function(a){b.push(a.id.attributes["im:id"])}),d.resolve(b)}),d.promise}function e(c){if(angular.isArray(c)){var d=b.defer();return a.jsonp("https://itunes.apple.com/lookup",{params:{id:c.join(),callback:"JSON_CALLBACK"}}).success(function(a){angular.forEach(a.results,function(a,b){a.index=b+1,a.artworkUrl600=a.artworkUrl100.replace("100x100","600x600"),a.urlAlias=a.trackName.replace(/ /g,"-").toLowerCase()}),d.resolve(a.results)}),d.promise}}return{gettingMovies:function(a){var c=b.defer();return d(a).then(function(a){e(a).then(function(a){c.resolve(a)})}),c.promise},gettingMovieTrailerUrl:function(a,b){var d=[];return angular.forEach(b.params,function(a,b){this.push(b+"="+a)},d),d="&"+d.join("&"),c.trustAsResourceUrl(encodeURI(b.basePath+a+" trailer"+d))}}}]),angular.module("myApp").directive("scrollbar",function(){return{restrict:"EA",scope:{maxHeight:"@"},link:function(a,b){b.mCustomScrollbar({setHeight:a.maxHeight})}}}),angular.module("myApp").directive("nextPreviousMovie",function(){return{template:'<button ng-click="changeSelectedMovie()" class="btn btn-default {{ class }}"></button>',replace:!0,scope:{operator:"@",selectedMovieIndex:"="},link:function(a){a["class"]=">"==a.operator?"fa fa-chevron-circle-right":"fa fa-chevron-circle-left";var b=30;a.changeSelectedMovie=function(){var c=a.selectedMovieIndex;c!=b&&">"==a.operator?console.log(c+1):c&&"<"==a.operator&&console.log(c-1),console.log(a.selectedMovie)}}}});