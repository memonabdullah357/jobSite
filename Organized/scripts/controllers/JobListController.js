/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" /> 

angular
    .module('Jobsite').controller("JobListController", function($scope, Login, $http, $timeout, $location, ValiDatedTokenObject) {
        ValiDatedTokenObject.ValiDatedTokenObject = JSON.parse(sessionStorage.getItem("ValiDatedTokenObject"));
        if (ValiDatedTokenObject.ValiDatedTokenObject == null || ValiDatedTokenObject.ValiDatedTokenObject.access_token == "") {
            //$location.path("/login");
        }
        var req = {
            method: 'GET',
            url: ServicesURL + 'api/v1/jobs/my',
            headers: {
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6Iml2YW4zNDQ1IiwibmFtZWlkIjoiZDFkYzRhYjAtNmFmOS00NTNiLWEwNzMtMDEwZTgwZWQ3OTRkIiwic3ViIjoiaXZhbjM0NDUiLCJyb2xlIjoiQWRtaW4iLCJpc3MiOiJodHRwOi8vbmF2aWdhdG9ybGl0aWdhdGlvbi5jb20vSWRlbnRpdHlTZXJ2ZXIvdHJ1c3QiLCJhdWQiOiJ1cm46bmF2aWdhdG9ybGl0aWdhdGlvbmFwaSIsImV4cCI6MTQ1Mjg4NDgwMCwibmJmIjoxNDUwMjkyODAwfQ.YSKqQ87fVgmvGdrL7v-_V2ZNpLleZKoWCWScp47RSWA'
            }
        }
        $http(req).then(function(data) {
            if (data.status == "200") {
                $scope.list = data.data;
                console.log($scope.list);
                $scope.currentPage = 1; //current page
                $scope.entryLimit = 10; //max no of items to display in a page
                $scope.filteredItems = $scope.list.length; //Initially for no filter  
                $scope.totalItems = $scope.list.length;
            }
        });
        $scope.deleterecords = function(id) {
            console.log(id);
            $http({
                method: 'DELETE',
                url: ServicesURL + 'api/v1/jobs/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6Iml2YW4zNDQ1IiwibmFtZWlkIjoiZDFkYzRhYjAtNmFmOS00NTNiLWEwNzMtMDEwZTgwZWQ3OTRkIiwic3ViIjoiaXZhbjM0NDUiLCJyb2xlIjoiQWRtaW4iLCJpc3MiOiJodHRwOi8vbmF2aWdhdG9ybGl0aWdhdGlvbi5jb20vSWRlbnRpdHlTZXJ2ZXIvdHJ1c3QiLCJhdWQiOiJ1cm46bmF2aWdhdG9ybGl0aWdhdGlvbmFwaSIsImV4cCI6MTQ1Mjg4NDgwMCwibmJmIjoxNDUwMjkyODAwfQ.YSKqQ87fVgmvGdrL7v-_V2ZNpLleZKoWCWScp47RSWA'
                }
            }).
            success(function(response) {
                $http(req).then(function(data) {
                    if (data.status == "200") {
                        $scope.list = data.data;
                        console.log($scope.list);
                        $scope.currentPage = 1; //current page
                        $scope.entryLimit = 10; //max no of items to display in a page
                        $scope.filteredItems = $scope.list.length; //Initially for no filter  
                        $scope.totalItems = $scope.list.length;
                    }
                });
                console.log(response);
            });

        };
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.filter = function() {
            $timeout(function() {
                $scope.filteredItems = $scope.filtered.length;
            }, 10);
        };
        $scope.sort_by = function(predicate) {
            $scope.predicate = predicate;
            $scope.reverse = !$scope.reverse;
        };

    })
