myApp.controller('InfoController', function($http) {
  console.log('InfoController created');
  var vm = this;
  var steam_id = '';
  var api_key = '502CF7AD2FE8F1911591043E913B519D';
  var testResult = [];
  var testResult_other = [];
  var user_result = [];
  var user_result_other = [];

    

  vm.findGames = function (steamid, otherid) {
      console.log('steamid', steamid);
      console.log('theirid', otherid);
     

      $http.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + api_key + '&steamid=' + steamid + '&include_appinfo=1&format=json').then(function (response) {

          vm.testResult = response.data.response.games;


          $http.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + api_key + '&steamids=' + steamid).then(function (response) {

              vm.user_result = response.data.response.players;
              vm.steam_id = '';
          });

      });

      $http.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + api_key + '&steamid=' + otherid + '&include_appinfo=1&format=json').then(function (response) {

          vm.testResult_other = response.data.response.games;


          $http.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + api_key + '&steamids=' + otherid).then(function (response) {

              vm.user_result_other = response.data.response.players;
              vm.their_steam_id = '';
          });

      });
  }
});
