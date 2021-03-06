/**
 * An Angular service to fetch data from the Tarchive API
 */

var APIService = angular.module('APIService', []) // eslint-disable-line no-unused-vars
  .service('API', function ($http, $filter) {
    console.log('APIService loaded')

    this.recent = function (key, amount, callback) {
      $http.post('/api/recent', {'key': key, 'amount': amount})
        .then(
          function (response) {
            // success
            for (var i = 0; i < response.data.length; i++) {
              response.data[i].dateformatted = $filter('date')(response.data[i].timestamp * 1000, 'HH:mm:ss - dd/MM/yy')
            }
            callback(response.data)
          },
          function (response) {
            // fail
            console.log(response)
          })
    }

    this.search = function (key, amount, str, callback) {
      $http.post('/api/search', {'key': key, 'amount': amount, 'str': str})
        .then(
          function (response) {
            // success
            for (var i = 0; i < response.data.length; i++) {
              response.data[i].dateformatted = $filter('date')(response.data[i].timestamp * 1000, 'HH:mm:ss - dd/MM/yy')
            }
            callback(response.data)
          },
          function (response) {
            // fail
            console.log(response)
          })
    }

    this.validateKey = function (key, callback) {
      $http.post('/api/validatekey', {'key': key})
        .then(
          function (response) {
            // success
            callback(response.data)
          },
          function (response) {
            console.log(response)
          })
    }
  })
