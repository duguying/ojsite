var tpApp = angular.module('tpApp',[]);

tpApp.factory('Data', function () {
	return {};
})


tpApp.directive("delete",function($document,$http){
  return{
    restrict:'A',
    require: 'ngModel',
    link:function(scope, element, attrs,ngModel){
      element.bind("click",function(){
        var id = ngModel.$modelValue.id;
        
        scope.$apply(function(){
          for(var i=0; i<scope.data.list.length; i++){
            if(scope.data.list[i].id==id){

            	if (!window.confirm("Sure to Delete?")) {
            		return;
            	}

            	scope.data.list.splice(i,1);

                $http.get("/api/problem/delete/"+id, {
					params: {"id":id}
				}).success(function(data){
					if (data.result) {
						console.log("delete success.");
					} else{
						console.log("delete failed.", data.debug)
					};
				});
            }
          }
        })
      })
    }
  }
});

tpApp.directive("deny",function($document,$http){
	return{
		restrict:'A',
		require: 'ngModel',
		link:function(scope, element, attrs,ngModel){
			element.bind("click",function(){
				var id = ngModel.$modelValue.id;

				scope.$apply(function(){
					for(var i=0; i<scope.data.list.length; i++){
						if(scope.data.list[i].id==id){

							if (!window.confirm("Sure to Deny?")) {
								return;
							}

							scope.data.list.splice(i,1);

							$http.get("/api/problem_bank/deny/"+id, {
								params: {"id":id}
							}).success(function(data){
								if (data.result) {
									console.log("deny success.");
								} else{
									console.log("deny failed.", data.debug)
								};
							});
						}
					}
				})
			})	
		}
	}
});

tpApp.directive("accept",function($document,$http){
	return{
		restrict:'A',
		require: 'ngModel',
		link:function(scope, element, attrs,ngModel){
			element.bind("click",function(){
				var id = ngModel.$modelValue.id;

				scope.$apply(function(){
					for(var i=0; i<scope.data.list.length; i++){
						if(scope.data.list[i].id==id){

							if (!window.confirm("Sure to Accept?")) {
								return;
							}

							scope.data.list.splice(i,1);

							$http.get("/api/problem_bank/accept/"+id, {
								params: {"id":id}
							}).success(function(data){
								if (data.result) {
									console.log("accept success.");
								} else{
									console.log("accept failed.", data.debug)
								};
							});
						}
					}
				})
			})	
		}
	}
});

tpApp.controller("ProblemListCtrl", function($scope,$http,Data) {
	var current_page = 1;
	$scope.data = Data;
	$scope.data.has_next = false;

	this.get_page = function (page) {
		$http.get("/api/problem/list/"+page, {
			params: {"page":page}
		}).success(function(data){
			$scope.data = data;
		});
	}

	this.get_page(current_page);

    $scope.prevPage = function() { 
		get_page(current_page--)
		console.log("ng clicked prevPage:",current_page)
	};

	$scope.nextPage = function() {
		get_page(current_page++)
		console.log("ng clicked nextPage:",current_page)
	};

	$scope.prevPageDisabled = function() {
		return current_page === 1 ? "disabled" : "";
	};

	$scope.nextPageDisabled = function() {
		return !$scope.data.has_next ? "disabled" : "";
	}

});

tpApp.controller("AuditCtrl", function($scope,$http,Data) {
	var current_page = 1;
	$scope.data = Data;
	$scope.data.has_next = false;

	this.get_page = function (page) {
		$http.get("/api/problem/list/"+page, {
			params: {"page":page,"status":"audit"}
		}).success(function(data){
			$scope.data = data;
		});
	}

	this.get_page(current_page);

    $scope.prevPage = function() { 
		get_page(current_page--)
		console.log("ng clicked prevPage:",current_page)
	};

	$scope.nextPage = function() {
		get_page(current_page++)
		console.log("ng clicked nextPage:",current_page)
	};

	$scope.prevPageDisabled = function() {
		return current_page === 1 ? "disabled" : "";
	};

	$scope.nextPageDisabled = function() {
		return !$scope.data.has_next ? "disabled" : "";
	}
});
