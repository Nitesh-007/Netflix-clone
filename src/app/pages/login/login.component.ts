declare var google: any;
import { Component, OnInit, inject,NgZone, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  

  constructor(private router: Router, private ngZone: NgZone) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '478719977918-agnojbvp4f52ijcgh5hlnf3nnlobs80j.apps.googleusercontent.com',
      callback: (resp: any)=> this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 200
    })
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any){
    if(response) {
      //decode the token
      const payLoad = this.decodeToken(response.credential);
      //store in session
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
     

    this.navigateToBrowsePage();

    
    }
  }


  navigateToBrowsePage() {
    this.ngZone.run(() => {
      setTimeout(() => {
        this.router.navigate(['browse']);
      }, 1000);
      
    });
  }
}
