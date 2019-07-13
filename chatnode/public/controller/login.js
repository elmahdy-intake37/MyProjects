angular.module('chatApp').controller('login2',function(User,$scope){
  $scope.login2=function(valid){
    if(valid){
      User.login($scope.user);
    }
  }
})
