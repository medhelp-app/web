app.controller("HomeCtrl", function ($scope, $http, $sessionStorage, $location, $crypthmac) {
	if ($sessionStorage.login) 
		$location.path("inicio");

	$(".button-collapse").sideNav();

	$scope.user = {
		password: "",
		email: ""
	};

	$scope.errostatus = false;

	$scope.goSignin = function () {
		$location.path('cadastro');
	}

	$scope.login = function(user) {
		if (user.email == "" || user.password == "") {
			$scope.errostatus = true;
			$scope.erro = "O campo e-mail e senha são obrigatórios";
		} else {
			$http({
			    method: "post",
			    url: API_URL + "users/login",
			    data: {
			    	email: user.email,
			    	password: $crypthmac.encrypt(user.password, "")
			    }
			}).success(function(data) {
				$scope.user = { 
					password: "",
					email: ""
				};

				TOKEN = data.token;

				$scope.errostatus = false;
				
				$sessionStorage.login = true;
				$sessionStorage.user = data.user;
			  	
			  	$location.path("inicio");
			}).error(function(data) {
				$scope.errostatus = true;
				$scope.erro = data.error;
				$scope.user.password = "";
			});
		}
	}
});