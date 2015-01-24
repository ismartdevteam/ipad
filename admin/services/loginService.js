'use strict';
app.factory('loginService',function($http, $location, sessionService){
	return{
		login:function(data,scope){
			$http.post('../user.php',data).success(function(data){
          
     				console.log(data);
				if(data!=0){
					//scope.msgtxt='Correct information';
					sessionService.set('uid',data);
					$location.path('/home');
				}	       
				else  {
					scope.msgtxt='Нэвтрэх нэр эсхүл Нууц үг буруу байна';
					$location.path('/login');
				}				   
        }).error(function(data) {
            console.log(data);
            });
		},
		logout:function(){
			sessionService.destroy('uid');
			$location.path('/login');
		},
		islogged:function(){
			var $checkSessionServer=$http.post('../check_session.php');

			return $checkSessionServer;
			/*
			if(sessionService.get('user')) return true;
			else return false;
			*/
		}
	}

});