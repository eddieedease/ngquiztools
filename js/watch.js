/* global angular */

var app = angular.module('watch', ['ngFx', 'ngAnimate']);

app.controller('quizCtrl', ['$scope', '$http', '$timeout',
  function($scope, $http, $timeout) {
    // Standard counter
    $scope.counter = 30;
    $scope.score = false;
    $scope.klok = true;
    $scope.anim = false;
    $scope.confetti = false;
    $scope.jsonn = {};
    //TODO need a counter for currentitem from JSON

    $scope.aantal = 0;
    $scope.curaantal = 0;
    $scope.curteam = "";
    $scope.curpunten = "";
    $scope.curposition = "";

    $scope.lastthree = false;

    // audio files
    var queen = document.getElementById('auqueen');
    var clock = document.getElementById('auclock');
    var results = document.getElementById('auresults');
    var end = document.getElementById('auend');
    var drumroll = document.getElementById('audrumroll');



    //reading JSON
    $http.get('json/score.json')
      .then(function(res) {
        $scope.jsonn = res.data[0];
        // TODO below is he conversion of object with value
        $scope.sortable = [];
        for (var team in $scope.jsonn) {
          $scope.sortable.push([team, $scope.jsonn[team]]);
          $scope.sortable.sort(function(a, b) {
            return a[1] - b[1];
          });
        };
        $scope.aantall = $scope.sortable.length;
        $scope.aantal = $scope.aantall;

        var reversedArray = Array.prototype.slice.call($scope.sortable);
        reversedArray.reverse();
        //var str = JSON.stringify(reversedArray, null, 2);

        for (var c = 0; c < reversedArray.length; c++) {
          console.log((c + 1) + "   " + reversedArray[c][0] + "   score = " + reversedArray[c][1]);
        }



        //console.log(str);
      });

    $scope.onTimeout = function() {
      $scope.counter--;
      if ($scope.counter !== 0) {
        $scope.mytimeout = $timeout($scope.onTimeout, 1000);
      } else {
        clock.pause();
        end.play();
        results.currentTime = 0;
        $scope.message = "TIJD is OM!";
      }
    };

    $scope.startResult = function() {
      console.log($scope.curaantal);
      console.log($scope.aantal);
      if ($scope.curaantal !== $scope.aantal) {
        if ($scope.curaantal === $scope.aantal - 3) {
          $scope.anim = false;
        } else {
          $scope.anim = false;
        }
        $scope.testtime = $timeout($scope.test, 1000);
      }
    };

    $scope.test = function() {
      if ($scope.curaantal === $scope.aantal - 3 && $scope.confetti === true && $scope.lastthree === false) {
        results.pause();
        drumroll.play();
      console.log("drumroll moet inkicken");
        results.currentTime = 0;
        $scope.lastthree = true;
        $scope.anim = false;
      } else if ($scope.curaantal !== $scope.aantal) {
        $scope.curteam = $scope.sortable[$scope.curaantal][0];
        $scope.curpunten = $scope.sortable[$scope.curaantal][1] + " punten";
        $scope.curposition = $scope.aantal - $scope.curaantal;
        $scope.resulttime = $timeout($scope.startResult, 4000);
        $scope.anim = true;
        $scope.curaantal++;
      }
    }

    //var mytimeout = $timeout($scope.onTimeout, 1000);
    // NOTE catching the key presse. Notice the ng-keydown="myFunct($event)" event in body tag
    $scope.myFunct = function(ev) {
      $scope.pressed = ev.which;
      console.log($scope.pressed);
      //NOTE first of switch between the 2 views
      //P key = switch klok and result views
      if (ev.which === 80) {
        results.pause();
        clock.pause();
        results.currentTime = 0;
        clock.currentTime = 0;
        if ($scope.klok === true) {
          $timeout.cancel($scope.mytimeout);
          $scope.confetti = false;
          $scope.counter = 30;
          $scope.message = "TIJD is OM!";
          $scope.klok = false;
          $scope.score = true;
          $scope.anim = false;
        } else if ($scope.klok === false) {
          $scope.confetti = false;
          $scope.score = false;
          $scope.klok = true;
        }
        $timeout.cancel($scope.mytimeout);
      }
      // the R for real results
      if (ev.which === 82 && $scope.score === true) {
        $scope.confetti = true;
      }
      //enter key = reset
      if (ev.which === 13 && $scope.klok === true) {
        $timeout.cancel($scope.mytimeout);
        $scope.counter = 30;
        $scope.message = "";
      } else if (ev.which === 13 && $scope.klok === false) {
        $timeout.cancel($scope.testtime);
        $timeout.cancel($scope.startResult);
        $scope.aantal = $scope.aantall;
        $scope.curaantal = 0;
      }
      // space is reset
      else if (ev.which === 32 && $scope.klok === true) {
        if ($scope.counter === 30 || $scope.counter === 60 || $scope.counter === 10) {
          $scope.mytimeout = $timeout($scope.onTimeout, 1000);
          $scope.anim = false;
          clock.play();
          console.log("clock should play");
          $scope.message = "";
        }
      } else if (ev.which === 32 && $scope.klok === false) {
        if ($scope.lastthree === false) {
          results.play();
          console.log("lastthree = false");
          $scope.resulttime = $timeout($scope.startResult, 500);
        } else if ($scope.lastthree === true) {
          $scope.curteam = "";
          $scope.curpunten = "";
          $scope.curposition = "";
          drumroll.pause();
          queen.play();
          console.log("lastthree = true");
          $scope.anim = true;
          $scope.resulttime = $timeout($scope.startResult, 500);
        }
      }
      //other keys z,x,y
      else if (ev.which === 90 && $scope.klok === true) {
        $timeout.cancel($scope.mytimeout);
        $scope.counter = 30;
        $scope.message = "";
      } else if (ev.which === 88 && $scope.klok === true) {
        $timeout.cancel($scope.mytimeout);
        $scope.counter = 60;
        $scope.message = "";
      } else if (ev.which === 67 && $scope.klok === true) {
        $timeout.cancel($scope.mytimeout);
        $scope.counter = 10;
        $scope.message = "";
      }
    };
  }
]);
