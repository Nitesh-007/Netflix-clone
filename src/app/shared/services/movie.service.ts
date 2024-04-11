import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor (private http: HttpClient) { }


  private baseURL = "https://api.themoviedb.org/3";
  private apikey = "06cc335abc6769f2ba982c824990faeb";



  

  







  getMovies() {
    return this.http.get<any>(`${this.baseURL}/discover/movie?api_key=${this.apikey}`)
  }

  

  getTvShows() {
    return this.http.get(`${this.baseURL}/discover/tv?api_key=${this.apikey}&include_adult=false&include_video=true&page=1&`)
  }
 

  getRatedMovies() {
    return this.http.get(`${this.baseURL}/movie/now_playing?api_key=${this.apikey}`)
  }

  getBannerImage(id: number) {
    return this.http.get(`${this.baseURL}/movie/${id}/images?api_key=${this.apikey}`)
  }

  getBannerVideo(id: number) {
    return this.http.get(`${this.baseURL}/movie/${id}/videos?api_key=${this.apikey}`);
  }

  getBannerDetail(id: number) {
    return this.http.get(`${this.baseURL}/movie/${id}?api_key=${this.apikey}`);
  }

  getNowPlayingMovies() {
    return this.http.get(`${this.baseURL}/movie/now_playing?api_key=${this.apikey}&with_genres=12`)
  }

  getPopularMovies() {
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=16`)
  }

  getTopRated() {
    return this.http.get(`${this.baseURL}/movie/top_rated?api_key=${this.apikey}&with_genres=53`)
  }

  getUpcomingMovies() {
    return this.http.get(`${this.baseURL}/movie/upcoming?api_key=${this.apikey}&with_genres=28`)
  }


  getMovieDetails (id: any) {
    return this.http.get(`${this.baseURL}/movie/${id}?api_key=${this.apikey}`)
  }

  getMovieVideo (id: any) {
    return this.http.get(`${this.baseURL}/movie/${id}/videos?api_key=${this.apikey}`)
  }

  getMovieCast (id: any){
    return this.http.get(`${this.baseURL}/movie/${id}/credits?api_key=${this.apikey}`)
  }
}
