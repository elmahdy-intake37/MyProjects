angular.module('chatApp').controller('register2',function($scope,User){
  $scope.login2=function(valid){
    if(valid){
      User.register2($scope.user)
    }
  }
})
