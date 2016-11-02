app.service('userService', function($http){
  return {
    signup: function(userObj){
      $http.post('http://localhost:3000/api/signup', userObj).then(function(results){
      }, function(error){})
    },
    login: function(userObj){
      $http.post('http://localhost:3000/api/login', userObj).then(function(results){
      }, function(error){})
    }
  }
})

app.service('authService', ['$window', function($window) {
  return {
    giveToken: function(token) {
      $window.localStorage['g32-token'] = token.jwt;
    },
    getToken: function() {
      return $window.localStorage['g32-token']
    },
    logout: function() {
      $window.localStorage.removeItem('g32-token')
    },
    parseJwt: function(token){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/')
      return JSON.parse($window.atob(base64))
    },
    isAuthed: function(){
      var returnedToken = this.getToken();
      console.log('returned token:', returnedToken);
      if (returnedToken) {
        // var params = this.parseJwt(token);
        return true
      } else {
        return false
      }
    }
  }
}])

app.factory('authInterceptor', ['authService', function(auth) {
  return {
    request: function(config) {
      console.log('intercepting request (config): ', config);
      var token = auth.getToken();
      if (config.url.indexOf('http://localhost:3000/api') === 0) {
        console.log('req indexOf true!');
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    response: function(res) {
      console.log('intercepting response: ', res);
      if (res.config.url.indexOf('http://localhost:3000/api') === 0 && res.data.jwt) {
        console.log('res indexOf true!');
        auth.giveToken(res.data)
      }
      return res
    }
  }
}])

app.config(function($httpProvider){
  $httpProvider.interceptors.push('authInterceptor')
})
