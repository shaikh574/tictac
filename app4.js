var app = angular.module('ticTacToeApp', ['ngAnimate']);

app.controller('TicTacToeController', ['$scope', function($scope) {
  var emptyBoard = ['', '', '', '', '', '', '', '', ''];

  $scope.board = angular.copy(emptyBoard);
  $scope.currentPlayer = 'X';
  $scope.statusMessage = "Player X's turn";

  $scope.makeMove = function(index) {
    if ($scope.board[index] === '' && !$scope.isGameOver()) {
      $scope.board[index] = $scope.currentPlayer;
      if ($scope.checkWin($scope.currentPlayer)) {
        $scope.statusMessage = 'Player ' + $scope.currentPlayer + ' wins!';
      } else if ($scope.board.indexOf('') === -1) {
        $scope.statusMessage = 'It\'s a draw!';
      } else {
        $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
        $scope.statusMessage = "Player " + $scope.currentPlayer + "'s turn";
      }
    }
  };

  $scope.checkWin = function(player) {
    var winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winningCombinations.some(function(combination) {
      return combination.every(function(index) {
        return $scope.board[index] === player;
      });
    });
  };

  $scope.isGameOver = function() {
    return $scope.statusMessage.includes('wins') || $scope.statusMessage === 'It\'s a draw!';
  };

  $scope.resetGame = function() {
    $scope.board = angular.copy(emptyBoard);
    $scope.currentPlayer = 'X';
    $scope.statusMessage = "Player X's turn";
  };
}]);
