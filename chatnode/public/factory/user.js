// angular.module('chatApp').factory('User',function($http){
//   return{
//     register:function(user){
//       $http({
//         url:'http://localhost:3000/register',
//         method:'POST',
//         data:user
//       }).then(function(res){
//         console.log(res);
//       },function(err){
//         console.log(err);
//
//       })
//
//     },login:function(user){
//       console.log(user);
//       $http({
//         url:'http://localhost:3000/login',
//         method:'POST',
//         data:user
//
//       }).then(function(res){
//         console.log(res);
//       },function(err){
//         console.log(err);
//
//       })
//
//   }
// }
// })
//public/js/factories/user.js
angular.module('chatApp').factory('User',function($http,$location) {
  return{
        register:function(user){
          $http({
            url:'http://localhost:3000/register',
            method:'POST',
            data:user
          }).then(function(res){
            $location.url('/login');
            console.log(res);
          },function(err){
            // console.log("here");
            console.log(err);

          })

        },
        chat:function(user){
          console.log(User);
          $http({
            url:"http://localhost:3000/chat",
            method:"POST",
            data:user
          }).then(function(res){
            console.log(res);
          },function(err){
            console.log(err);
          })
        },login2:function(user){
          $http({
            url:'http://localhost:3000/login',
            method:'POST',
            data:user
          }).then(function(res){
            if(res.status){
            $location.url('/chat');
            }
            console.log(res);
          },function(err){
            console.log(err);

          })

      }
    }
    })
