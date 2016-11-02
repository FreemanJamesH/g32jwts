app.service('userService', function($http){
  return {
    signup: function(userObj){
      $http.post('http://localhost:3000/api/signup', userObj).then(function(results){
        console.log(results);
      }, function(error){})
    },
    login: function(userObj){
      $http.post('http://localhost:3000/api/login', userObj).then(function(results){
        console.log(results);
      }, function(error){})
    }
  }
})
