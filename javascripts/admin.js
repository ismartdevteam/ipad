
var app = angular.module("MyAdmin", ['ngRoute','angularFileUpload','ngSanitize','ui.bootstrap','ngDialog','ui.highlight','ngCookies','ngTable']);
app.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.
                when('/home', {
                    templateUrl: 'admin.html',
                    controller: 'AdminCtrl',
                
                })

                .when('/login', {
                  templateUrl: 'login.html',
                   controller: 'loginCtrl'}
                   )
     
                // when('/SECTION/:id', {
                //     templateUrl: 'section_edit.html',
                //     controller: 'SectionCtrl',
                         
                // }).
           
                .when('/ADD', {
                    templateUrl: 'add_object.html',
                    controller: 'AddCtrl',
                         
                })
          
                .otherwise({
                    redirectTo: '/home'
                });
    }]);
app.run(function($rootScope, $location, loginService){
  var routespermission=['/home'];  //route that require login
  $rootScope.$on('$routeChangeStart', function(){
    if( routespermission.indexOf($location.path()) !=-1)
    {
      var connected=loginService.islogged();

      connected.then(function(msg){
        console.log(msg);
        if(msg.data=='authentified') $location.path('/home');
        else
          $location.path('/login');
      });
    }
  });
});

app.controller('loginCtrl', ['$scope','loginService', function ($scope,loginService) {
  $scope.msgtxt='';
  $scope.login=function(data){
    loginService.login(data,$scope); //call login service
  };
}]);

app.controller("AddCtrl",function($http,$scope,$route, $routeParams,ngDialog,$rootScope,FileUploader){
    $scope.object='';

    
    $scope.openPlain = function (text) {
            $rootScope.theme = 'ngdialog-theme-plain';
                ngDialog.open({
                    template: text,
                    className: 'ngdialog-theme-plain',
                    plain:true,
                });
            };
    
    var uploader = $scope.uploader = new FileUploader({
            url: '../upload.php'
        });
         uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
    
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.uploader.progress=0;

            $scope.object.path=response.path;
            $scope.object.type=response.type;
            console.log($scope.object);
          $http.post("../add.php",$scope.object).success(function(data){
                        console.log(data);
                              if(data==1)
              $scope.openPlain('Амжилттай нэмэгдлээ');
          else
               $scope.openPlain('Хүсэлт амжилтгүй боллоо');
                        $route.reload();
        }).error(function(data) {
            console.log(data);
        });
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
});

app.controller("AdminCtrl", function($route,$location,$http,$filter,loginService, $scope,$rootScope,ngDialog,ngTableParams,$sce) {
    $scope.delete=function(id){
       ngDialog.openConfirm({
          template: 'modalDialogId',
          className: 'ngdialog-theme-default'
        }).then(function (value) {
          $http.get("../delete.php?id="+id).success(function(data){
                      console.log(data);
                      if(data==1)
              $scope.openPlain('Амжилттай устгалаа');
          else
               $scope.openPlain('Хүсэлт амжилтгүй боллоо');
            $route.reload();
        }).error(function(data) {
            console.log(data);
      
});
        }, function (reason) {
          console.log('Modal promise rejected. Reason: ', reason);
        });
    };

  $scope.logout=function(){
    loginService.logout();
  }
        $scope.openPlain = function (text) {
            $rootScope.theme = 'ngdialog-theme-plain';
                ngDialog.open({
                    template: text,
                    className: 'ngdialog-theme-plain',
                    plain:true,
                });
            };
          
$scope.getDoc=function(){
$http.get("../web_doc.php").success(function(data){
  console.log(data);
                $scope.document = data.document;
            $scope.tableParams = new ngTableParams({
                page: 1,            
                count: 10           
            }, {
                total:$scope.document.length, 
                  getData: function($defer, params) {
                     var orderedData = params.filter() ?
                   $filter('filter')($scope.document, params.filter()) :
                   $scope.document;
                  
            $scope.doc = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

            params.total(orderedData.length); 
            $defer.resolve($scope.doc);
                }
            });

        }).error(function(data) {
            console.log(data);
      
});
            };
              $scope.getDoc();

});
