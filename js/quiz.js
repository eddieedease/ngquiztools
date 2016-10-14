/* global angular */

var app = angular.module('quiz', []);

app.controller('quizCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.debug = "Debugging on";


        $http.get('json/questions.json')
                .then(function (res) {
                    $scope.quest = res.data;
                    //catch questions
                    //$scope.debug = res.data[0]["vraag"];
                    //catch
                    //$scope.debug = res.data[0]["img"];

                });

    }
]);
