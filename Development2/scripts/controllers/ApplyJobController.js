angular
    .module('Jobsite').directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

angular
    .module('Jobsite')
    .controller('ApplyJobController', ApplyJobController);

function ApplyJobController($scope, Login, ValiDatedTokenObject, $http, $location, $modalInstance, ResumesService, RESOURCES) {
    var serviceBase = RESOURCES.API_BASE_PATH;
    $scope.includeCoverLetter = false;
    $scope.selectedResume = '';
    $scope.resumeFileUrl = '';
    $scope.resumeOriginalFilename = '';
    $scope.loading =false;
    if ( ValiDatedTokenObject.getValiDatedTokenObject()==null)
    {
        $location.path("/login");
    }

    ResumesService.getMyResumes().then(function (results) {
        $scope.resumes = results.data;
     }, function (error) {
        console.log(error.data.message);
    });

    var req = {
        method: 'GET',
        url: serviceBase + 'account/userinfo',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
        }
    }
    $scope.role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
    $http(req).then(function(data) {
        if (data.status == "200") {
            $scope.accountFirstName = data.data.firstName;
            $scope.accountLastName = data.data.lastName;
            $scope.accountEmail = data.data.email;
        }
    });


    // Initial step
    $scope.step = 1;

    // Wizard functions
    $scope.wizard = {
        show: function(number) {
            $scope.step = number;
        },
        next: function() {
            $scope.step++;
        },
        prev: function() {
            $scope.step--;
        }
    };

    $scope.uploadFile = function(event) {
        $scope.loading = true;
        var file = event.target.files[0];
        console.dir(file);
        var uploadUrl = serviceBase + 'resumes/upload';
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            })
            .success(function(response) {
                $scope.resumeFileUrl = response.storageLocationNative;
                $scope.resumeOriginalFilename = response.originalFilename;
                $scope.wizard.next();
                $scope.loading = false;
            })
            .error(function(response) {
                $scope.loading = false;
                alert('Resume upload failed');
            });

    };

    $scope.onSubmit = function() {
        $scope.loading = true;
        var parts = $location.absUrl().split("?id=");
        var viewJobId = parts[1];
        var postresumedata = {
            "note": $scope.coverLetterNote,
            "storageLocationNative": $scope.resumeFileUrl,
            "resumeId": $scope.selectedResume,
            "originalFilename": $scope.resumeOriginalFilename,
            "firstName": $scope.accountFirstName,
            "lastName": $scope.accountLastName,
            "email": $scope.accountEmail
        };

        if ($scope.resumeFileUrl){
            ResumesService.applyToJob(viewJobId,postresumedata).then(function (results) {
                var response = results.data;
                $scope.jobAppliedDate = response.applyDate;
                $scope.step = 3;
                $scope.$parent.isApplied = true;
                $scope.loading = false;
            }, function (error) {
                console.log(error.data.message);
                $scope.loading = false;
            });
        }else{
            ResumesService.applyToJobByExistResume(viewJobId,postresumedata).then(function (results) {
                var response = results.data;
                $scope.jobAppliedDate = response.applyDate;
                $scope.step = 3;
                $scope.$parent.isApplied = true;
                $scope.loading = false;
            }, function (error) {
                console.log(error.data.message);
                $scope.loading = false;
            });
        }
    };

    $scope.onClose = function() {
        $modalInstance.close();
    }

}
