myApp.controller('InfoController', function (UserService, $http) {
    console.log('InfoController created');
    var vm = this;
    var steam_id = '';
    var api_key = '502CF7AD2FE8F1911591043E913B519D';
    vm.firstGames = [];
    vm.secondGames = [];
    vm.thirdGames = [];
    vm.fourthGames = [];
    vm.firstUser = [];
    vm.secondUser = [];
    vm.thirdUser = [];
    vm.fourthUser = [];
    vm.stage = 0;
    vm.message = '';

    vm.finalResult = [];





    vm.findGames = function (firstId, otherId, thirdId, fourthId) {

        if (firstId != '') {
            $http.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + api_key + '&steamid=' + firstId + '&include_appinfo=1&format=json').then(function (response) {

                vm.firstGames = response.data.response.games;
                vm.stage += 1;

                $http.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + api_key + '&steamids=' + firstId).then(function (response) {

                    vm.firstUser = response.data.response.players;
                    vm.steam_id = '';
                });

            }).catch(function () { console.log('empty steam id') });
        } else (console.log('steamid is empty'));

        if (otherId != '') {
            $http.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + api_key + '&steamid=' + otherId + '&include_appinfo=1&format=json').then(function (response) {

                vm.secondGames = response.data.response.games;
                vm.stage += 1;

                console.log(vm.secondGames);

                $http.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + api_key + '&steamids=' + otherId).then(function (response) {

                    vm.secondUser = response.data.response.players;
                    vm.second_steam_id = '';
                });



            }).catch(function () { console.log('empty steam id') });
        } else (console.log('secondId is empty'));


        if (thirdId != '') {
            $http.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + api_key + '&steamid=' + thirdId + '&include_appinfo=1&format=json').then(function (response) {

                vm.thirdGames = response.data.response.games;
                vm.stage +=1;

                $http.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + api_key + '&steamids=' + thirdId).then(function (response) {

                    vm.thirdUser = response.data.response.players;
                    vm.third_steam_id = '';
                });

            }).catch(function () { console.log('empty steam id') });
        } else (console.log('thirdId is empty'));

        if (fourthId != '') {
            $http.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + api_key + '&steamid=' + fourthId + '&include_appinfo=1&format=json').then(function (response) {

                vm.fourthGames = response.data.response.games;
                vm.stage +=1;
     
                $http.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + api_key + '&steamids=' + fourthId).then(function (response) {

                    vm.fourthUser = response.data.response.players;
                    vm.fourth_steam_id = '';
                });

            }).catch(function () { console.log('empty steam id') });
        } else (console.log('frourthID is empty'));
    }
    
   
    vm.compareGames = function () {
        console.log(vm.stage);

        switch (vm.stage) {
            case 0:
                vm.message = "This is for comparing games, try finding more users";
                break;
            case 1:
                vm.message = "This is for comparing games, try finding more users";
                break;
            case 2:
                var final = [];
                for (var i = 0; i < vm.firstGames.length - 1; i += 1) {
                    for (var ii = 0; ii < vm.secondGames.length - 1; ii += 1) {
                        if (vm.firstGames[i].name == vm.secondGames[ii].name) {
                            final.push(vm.firstGames[i]);
                            vm.finalResult = final;
                        }
                    }
                } 
                vm.stage = 0;
                break;
            case 3:
                var compare = [];
                var final = [];
                for (var i = 0; i < vm.firstGames.length - 1; i += 1) {
                    for (var ii = 0; ii < vm.secondGames.length - 1; ii += 1) {
                        if (vm.firstGames[i].name == vm.secondGames[ii].name) {
                            compare.push(vm.firstGames[i]);                          
                        }
                    }
                } 
                for (var iii = 0; iii < vm.thirdGames.length - 1; iii += 1) {
                    for (var vi = 0; vi < compare.length - 1; vi += 1) {
                        if (vm.thirdGames[iii].name == compare[vi].name) {
                            final.push(vm.thirdGames[iii]);
                            vm.finalResult = final;
                        }
                    }
                }
                vm.stage = 0;

                break;
            case 4:
                var compare = [];
                var compareTwo = [];
                var final = [];
                for (var i = 0; i < vm.firstGames.length - 1; i += 1) {
                    for (var ii = 0; ii < vm.secondGames.length - 1; ii += 1) {
                        if (vm.firstGames[i].name == vm.secondGames[ii].name) {
                            compare.push(vm.firstGames[i]);

                        }
                    }
                }
                for (var iii = 0; iii < vm.thirdGames.length - 1; iii += 1) {
                    for (var iv = 0; iv < compare.length - 1; iv += 1) {
                        if (vm.thirdGames[iii].name == compare[iv].name) {
                            compareTwo.push(vm.thirdGames[iii]);
                        }
                    }
                }
                for (var v = 0; v < vm.fourthGames.length - 1; v += 1) {
                    for (var vi = 0; vi < compareTwo.length - 1; vi += 1) {
                        if (vm.fourthGames[v].name == compareTwo[vi].name) {
                            final.push(vm.fourthGames[v]);
                            vm.finalResult = final;
                        }
                    }
                }
                vm.stage = 0;
                break;
            default:
                vm.message = "You broke it, tell Laura so she can fix it. In the mean time. Refresh the page and try again.";
        }

    }
    

});



