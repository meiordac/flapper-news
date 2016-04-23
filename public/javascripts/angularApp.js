var app = angular.module('flapperNews', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider)
	{
		$stateProvider
		.state('home',{
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		});

		$stateProvider
		.state('posts',{
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});

		$urlRouterProvider.otherwise('home');
	}]);

app.factory('posts', ['$http', function($http){

	var o = {
    posts: []
  };

  o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };

    return o;

}]);

app.controller('PostsCtrl'[
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){

		$scope.post=posts.posts[$stateParams.id];

		$scope.addComment = function(){
			if($scope.body === '') { return; }
			$scope.post.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = '';
}; 

	}]);

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){

	$scope.posts = posts.posts;

	$scope.addPost= function()
	{
		if(!$scope.title || $scope.title === ''){ return; }
		$scope.posts.push({title: $scope.title, link: $scope.link, upvotes: 0});
		$scope.title='';
		$scope.link='';
	};

	$scope.incrementUpvotes= function(post)
	{
		post.upvotes += 1;
	};
}

]); 
