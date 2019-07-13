angular.module('chatApp').config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl: 'public/templates/home.html'
  })
  .when('/register',{
    templateUrl: 'public/templates/signup.html',
    controller: 'register'
  }).when('/login',{
    templateUrl: 'public/templates/login.html',
    controller: 'chat'
  })
  .when('/chat',{
    templateUrl:'public/templates/chat.html',
    controller:'chat'
  })
  .when('/login2',{
    templateUrl:'public/templates/login2.html',
    controller:'login2'
  }).when('/register2',{
    templateUrl: 'public/templates/signup.html',
    controller: 'register2'

});
})
