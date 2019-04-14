export class MoviesService {
  constructor($http) {
    this.$http = $http;
  }

  findMovieById(id) {
    return Promise.resolve(this.$http.get('https://reactjs-cdp.herokuapp.com/movies'))
      .then(result => result.data.data)
      .then(result => result.find(element => Number(element.id) === Number(id)));
  }

  findMovieByTitle(title) {
    return Promise.resolve(this.$http.get('https://reactjs-cdp.herokuapp.com/movies'))
      .then(result => result.data.data)
      .then(result => result.find(elements => String(elements.title) === String(title)));
  }

  getAllMovies() {
    return Promise.resolve(this.$http.get('https://reactjs-cdp.herokuapp.com/movies'))
      .then(result => result.data.data);
  }
}

MoviesService.serviceName = 'moviesService';
MoviesService.$inject = ['$http'];
