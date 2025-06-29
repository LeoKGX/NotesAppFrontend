import { Component, OnInit } from '@angular/core';
import { loginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  imports: [
    CommonModule
  ],
  templateUrl: './logout.html',
  styleUrl: './logout.scss'
})
export class Logout implements OnInit{
  constructor(private loginService: loginService, private router:Router) { }


  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };
  }

  onClicCerrar(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
