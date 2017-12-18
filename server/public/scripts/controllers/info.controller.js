myApp.controller('InfoController', function($http) {
  console.log('InfoController created');
  var vm = this;
  var steam_id = '';
  var api_key = '502CF7AD2FE8F1911591043E913B519D';
  var testResult = [];
  var game_count;

 
  vm.firstTest = function () {
      // YOUR CODE HERE
      $http.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=502CF7AD2FE8F1911591043E913B519D&steamid=76561198096885956&include_appinfo=1&format=json').then(function (response) {
          console.log('this is the response', response.data.response.games);
          vm.testResult = response.data.response.games;
          console.log('testResult', vm.testResult);
      });
  }

  vm.firstTest();
});
