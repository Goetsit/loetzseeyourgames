myApp.controller('InfoController', function($http) {
  console.log('InfoController created');
  var vm = this;
  var steam_id = '';
  var api_key = '502CF7AD2FE8F1911591043E913B519D';
  var testResult = [];
  var user_result = [];


 /*
  vm.firstTest = function () {

      $http.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=502CF7AD2FE8F1911591043E913B519D&steamid=76561198096885956&include_appinfo=1&format=json').then(function (response) {

          vm.testResult = response.data.response.games;

      });
  }

  vm.firstTest();

 */



  vm.userTest = function () {

      $http.get(' http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=502CF7AD2FE8F1911591043E913B519D&steamids=76561198096885956').then(function (response) {

          vm.user_result = response.data.response.players;

      });
  }

  vm.userTest();


  vm.findGames = function (steamid) {
      console.log('steamid', steamid);
     

      $http.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + api_key + '&steamid=' + steamid + '&include_appinfo=1&format=json').then(function (response) {

          vm.testResult = response.data.response.games;

      });
  }
});
