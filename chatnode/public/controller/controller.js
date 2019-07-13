angular.module('chatApp').controller('register',function($location,$rootScope,$scope,User){
  $scope.register = function(valid){
User.register($scope.user);

    // $scope.send = function(){
    //   socket.emit('message',$scope.message);
    // }
    //
    // socket.on('message',function(msgs){
    //   console.log(msgs);
    //   $setTimeout(function () {
    //     $scope.message=msgs;
    //   });
    // });


          $rootScope.user=$scope.user
          $scope.user.mobile=$scope.user.mobile
          $scope.user.password=$scope.user.password
          $scope.user.confirmpassword=$scope.user.confirmpassword
          // console.log($scope.user);
          // var names=localStorage.getItem('savedname')
          // names=JSON.parse(names).name;
          // $scope.names=names;
          localStorage.setItem('savedname', JSON.stringify($scope.user));
          $location.url('/login')

          // console.log('savedname: ', JSON.parse('savedname'));

          if($scope.user.password.length <= 4)
          {
            alert("Invalid password; must more than 4 numbers ")
            // number.focus()
            console.log("pass");
            return false
          }
          else if($scope.user.password != $scope.user.confirmpassword)
          {
            alert("Invalid password; doesn't match  ")
            console.log("match");
            return false
          }else {
            return true;
          }

          if( ! /^\d{10}$/.test($scope.user.mobile)) {
            console.log("mobile");
            return true;
          } else {
            alert("Invalid number; must be ten digits")
            number.focus()
            return false;
          }
      $location.url('/login')
        }






  // }


    // $scope.message.push(msg);
  })
// })

angular.module("chatApp").controller('login',function($scope,$location,$rootScope,User){
      // $scope.show=false;
$rootScope.user=$scope.user
  $scope.login = function(valid){
    User.login($scope.user);
$scope.send();
    $location.url('/chat')



}

});
angular.module('chatApp').controller('chat',function($scope,$location,$rootScope,User,$timeout){
socket.emit('getUsers')
  socket.on('login',function(users){
    console.log(users);
  })
    $scope.send = function(){
        $location.url('/chat')
    $rootScope.user=$scope.user
    console.log($rootScope.user.name);

    // var name=localStorage.getItem('savedname');
    // console.log($scope.name);
    // socket.emit('names',$scope.names);

    // $scope.names='';
    console.log($scope.message);
    // console.log(User);

    socket.emit('message',$scope.message);
    $scope.message ='';


    // console.log($scope.names);
    // var name=localStorage.getItem('savedname');
    // console.log($scope.names);
    socket.emit('name',$rootScope.user.name);

    $rootScope.name='';
  }
  
  socket.on('name',function(names){
    $timeout(function(){

        // $scope.messages=msgs;
        $rootScope.name=names;
    })

  })

  socket.on('message',function(msgs){
    $timeout(function(){

        $scope.messages=msgs;
    })
    // client.on('getUsers',function(){
    //
    // })

  })
})
// $scope.send = function(){
//   console.log($scope.message);
//   socket.emit('message',$scope.message);
//   $scope.message ='';
// }
// socket.on('message',function(msgs){
//   $timeout(function(){
//
//       $scope.messages=msgs;
//   })
//
// })
// })

// $scope.send=function(){

  // console.log($scope.names);
  // var names=localStorage.getItem('savedname')
  // names=JSON.parse(names).name;
  // $rootScope.names=names;
  // console.log($scope.name);
  // socket.emit('names',$scope.names);

  // console.log($rootScope.names);
  // $scope.names='';
// }
// socket.on('names',function(name){
//   $timeout(function(){
//
//       $scope.names=name;
//   })
// })
