app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home')

  $stateProvider

    .state('home', {
    url: '/home',
    templateUrl: '../partials/home.html'
  })

  .state('public', {
    url: '/public',
    templateUrl: '../partials/public.html'
  })

  .state('private', {
    url: '/private',
    templateUrl: '../partials/private.html'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: '../partials/auth/signup.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: '../partials/auth/login.html'
  })


})
