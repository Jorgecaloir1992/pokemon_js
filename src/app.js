angular.module('myApp', [])
	.service('PokemonService', ['$http', function ($http) {
		this.list = function () {
			return $http.get('https://pokeapi.co/api/v2/pokemon');
		};

		this.getPokemonDetails = function (url) {
			return $http.get(url);
		};
	}])

	.controller('ListController', ['$scope', 'PokemonService', function ($scope, PokemonService) {
		$scope.pokemonList = [];
		$scope.filteredPokemon = [];
		$scope.selectedPokemon = null;
		$scope.searchText = '';
		$scope.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

		$scope.getPokemonList = function () {
			PokemonService.list().then(function (response) {
				$scope.pokemonList = response.data.results;
				$scope.filteredPokemon = $scope.pokemonList;
			});
		};

		$scope.filterPokemon = function () {
			if ($scope.searchText.trim() !== '') {
				$scope.filteredPokemon = $scope.pokemonList.filter(function (pokemon) {
					return pokemon.name.toLowerCase().includes($scope.searchText.toLowerCase());
				});
			} else {
				$scope.filteredPokemon = $scope.pokemonList;
			}
		};

		$scope.selectPokemon = function (pokemon) {
			$scope.selectedPokemon = null;
			PokemonService.getPokemonDetails(pokemon.url).then(function (response) {
				$scope.selectedPokemon = response.data;
			});
		};

		$scope.getPokemonCountByLetter = function (letter) {
			var filteredByLetter = $scope.pokemonList.filter(function (pokemon) {
				return pokemon.name.toLowerCase().startsWith(letter.toLowerCase());
			});
			return filteredByLetter.length;
		};
		$scope.getPokemonList();
	}]);