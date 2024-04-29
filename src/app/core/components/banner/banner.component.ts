import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnChanges {

  @Input({required: true}) bannerTitle = '';
  @Input() bannerOverview = '';
  @Input() key ='r_pUE7OcN8w';
  videoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,private router: Router){
    this.updateVideoUrl();
    

    

  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']){
      
      this.updateVideoUrl();

      
    }




    
  }


  private updateVideoUrl(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);

    console.log(this.videoUrl)
  }



  play(){
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
  }



  // moreInfo() {
  //   this.router.navigate([
  //     "\movie-details",
  //       {id:this.key},
  //   ]);
    
  // }





}
