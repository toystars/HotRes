/*
  api-call service that makes the api call using the 
  andgular in-built $http service for AJAX calls
*/

app.factory('apiCall',['$http', function($http) {
    var info = {
      manager: []
    };

    info.hotelSearch = function(url) {
      return  $http.get(url);
    };

    info.saveReview = function(url, reqObject) {
      return $http.post(url, reqObject);
    };

    info.managerSignUp = function(reqObject) {
      return $http.post('/api/managers', reqObject);
    };

    info.managerLogin = function(reqObject) {
      return $http.post('/api/managers/login', reqObject);
    };

    info.getSingleManager = function(managerId) {
      return $http.get('api/managers/' + managerId).success(function(data) {
        console.log(data)
        angular.copy(data, info.manager)
      });
    };
    info.getManagerHotel = function(managerId, managerToken) {
      var req = {
        method: 'GET',
        url: '/api/hotels/manager/' + managerId,
        headers: {
          'x-access-token': managerToken
        }
      }
      return $http(req);
    };
    info.saveHotel = function(hotelId, managerToken, reqObject) {
      var req = {
        method: 'PUT',
        url: '/api/hotels/' + hotelId,
        headers: {
          'x-access-token': managerToken
        },
        data: reqObject
      }
      return $http(req);
    };
    info.saveManager = function(managerId, managerToken, reqObject) {
      var req = {
        method: 'PUT',
        url: '/api/managers/' + managerId,
        headers: {
          'x-access-token': managerToken
        },
        data: reqObject
      }
      return $http(req);
    };

  return  info;

}]);