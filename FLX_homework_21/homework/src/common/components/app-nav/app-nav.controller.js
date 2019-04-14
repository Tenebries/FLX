import { MoviesService } from "../../services/movies.service";
import { MovieInfoController } from "../movie-info/movie-info.controller";

export class AppNavController {
  constructor(EventEmitter) {
    this.EventEmitter = EventEmitter;
  }

  $onInit() {
    console.log('>>> One way data flow', this.user);
    this.user = Object.assign({}, this.user);
  }

  logoutUser() {
    this.onLogout(
      this.EventEmitter({
        userEmail: this.user.email,
      })
    );
  }
}

AppNavController.$inject = ['EventEmitter'];
