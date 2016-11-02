app.controller('main', function($scope) {
  
})

app.controller('userAuth', function($scope, userService) {

  $scope.signup = function() {
    let userObj = {
      user_name: $scope.user_name,
      email: $scope.email,
      password: $scope.password
    }
    userService.signup(userObj)
  }

  $scope.login = function() {
    let userObj = {
      user_name: $scope.user_name,
      password: $scope.password
    }
    userService.login(userObj)
  }
})
