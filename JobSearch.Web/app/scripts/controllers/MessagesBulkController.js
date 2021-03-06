/**
 * Created by Van on 23.02.2016.
 */
//Controller for sending bulk-messages
angular.module('Jobsite').controller('MessagesBulkController', function ($scope, JobsService, $state, InterviewsService, MessagesService, JobsService, $sce, $timeout, $document, $state) {

    $scope.selectedJobId = '';

    $scope.successMessage = false;
    $scope.errorMessage = '';
    $scope.newMessage = {
        subject: '',
        body: ''
    };
    $scope.selectedMessageTemplate = {};
    $scope.isSaveTemplate = false;
    $scope.nameTemplate = '';

    JobsService.getMyJobs().then(function (results) {
        $scope.jobs = results.data;
    }, function (error) {
        console.log(error.data.message);
    });


    MessagesService.getMessageTemplates().then(function (results) {
        $scope.messageTemplates = results.data;
    }, function (error) {
        console.log(error.data.message);
    });


    var _sendMessage = function () {

        var request = {
            jobId: $scope.selectedJobId,
            subject: $scope.newMessage.subject,
            body: $scope.newMessage.body
        };

        MessagesService.sendBulkMessage(request).then(function (results) {

            $scope.successMessage = true;
            $scope.newMessage.subject = '';
            $scope.newMessage.body = '';

            $timeout(function () {
                $scope.successMessage = false;
                $state.go('dashboard');
            }, 1000);

        }, function (error) {
            $scope.errorMessage = "Try again";
            console.log(error.data.message);
        });

    };

    $scope.send = function (isValid) {
        $scope.successMessage = false;
        $scope.errorMessage = '';
        if (!isValid) {
            $scope.errorMessage = "You don't fill mandatory fields";
            return;
        }

        if ($scope.isSaveTemplate && !$scope.nameTemplate) {
            $scope.errorMessage = "You don't fill Name Template";
            return;
        }

        if ($scope.isSaveTemplate) {
            var requestTemp = {
                name: $scope.nameTemplate,
                subject: $scope.newMessage.subject,
                body: $scope.newMessage.body
            };
            MessagesService.postMessageTemplate(requestTemp).then(function (results) {
                var messageTemplate = results.data;
                $scope.messageTemplates.push(messageTemplate);
                _sendMessage();

            }, function (error) {
                $scope.errorMessage = "Can not save template";
                console.log(error.data.message);
            });
        }
        else {
            _sendMessage();
        }
    };

    $scope.cancel = function () {
        $state.go('dashboard');
    };

    $scope.messageTemplateChanged = function (messageTemplate) {
        if ($scope.selectedMessageTemplate) {
            $scope.newMessage.subject = $scope.selectedMessageTemplate.subject;
            $scope.newMessage.body = $scope.selectedMessageTemplate.body;
        } else {
            $scope.newMessage.subject = '';
            $scope.newMessage.body = '';
        }
    };
});