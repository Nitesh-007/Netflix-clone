import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {


  getMovieDetailResult?: any;
  getMovieVideoResult?: any;
  getMovieCastResult?: any;
  getParamId?:any



  constructor (private moviesService:MovieService, private route: ActivatedRoute, private title: Title, private meta: Meta) { }

  ngOnInit (): void {
    // let getParamId = this.router.snapshot.paramMap.get('id');
    this.route.params.subscribe((params) => {
    this.getParamId=params});
    console.log(this.getParamId, 'getparamid#');

    this.getMovie(this.getParamId.id);
    this.getVideo(this.getParamId.id);
    this.getMovieCast(this.getParamId.id);
  }

  getMovie (id: any) {
    this.moviesService.getMovieDetails(id).subscribe(async (result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = await result;

      // updatetags
      this.title.setTitle(`${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`);
      this.meta.updateTag({ name: 'title', content: this.getMovieDetailResult.original_title });
      this.meta.updateTag({ name: 'description', content: this.getMovieDetailResult.overview });

      // facebook
      this.meta.updateTag({ property: 'og:type', content: "website" });
      this.meta.updateTag({ property: 'og:url', content: `` });
      this.meta.updateTag({ property: 'og:title', content: this.getMovieDetailResult.original_title });
      this.meta.updateTag({ property: 'og:description', content: this.getMovieDetailResult.overview });
      this.meta.updateTag({ property: 'og:image', content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}` });

    });
  }

  getVideo (id: any) {
    this.moviesService.getMovieVideo(id).subscribe((result:any) => {
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type == "Trailer") {
          this.getMovieVideoResult = element.key;
        }
      });

    });
  }

  getMovieCast (id: any) {
    this.moviesService.getMovieCast(id).subscribe((result:any) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
    });
  }

}
