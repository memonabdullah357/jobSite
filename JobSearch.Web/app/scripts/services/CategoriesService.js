/**
 * Created by Van on 17.01.2016.
 */
// Service for working with categories
angular.module('Jobsite').factory('CategoriesService', ['$http', '$q', 'RESOURCES',function ($http, $q, RESOURCES) {
    var serviceBase = RESOURCES.API_BASE_PATH;

    var jobsServiceFactory = {};

    var _getCategories = function () {

        return $http.get(serviceBase + 'categories',{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (results) {
            return results;
        });
    };

    // Get categories
    jobsServiceFactory.getCategories = _getCategories;

    return jobsServiceFactory;
}]);