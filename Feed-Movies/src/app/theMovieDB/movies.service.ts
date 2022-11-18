import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private chave= "9cf987fb69309ca0d35ce60332888ea472f";
  private caminhoPadrao = "https://api.themoviedb.org/3";

  constructor(public http:HttpClient) { }

  public getPopularMovies (page=1, language="en-US"){

    let filmes = `${this.caminhoPadrao}/movie/popular?api_key=${this.chave}&language=${language}&page=${page}`;
    return this.http.get(filmes);

  }
}
