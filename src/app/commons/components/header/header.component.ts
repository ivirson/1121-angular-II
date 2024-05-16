import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  // menuItems: MenuItem[] = [
  //   {
  //     title: 'Cadastrar',
  //     link: '/products/create',
  //     requireAuth: true,
  //   },
  //   {
  //     title: 'Produtos',
  //     link: '/products',
  //     requireAuth: true,
  //   },
  //   {
  //     title: 'Login',
  //     link: '/auth/login',
  //     requireAuth: false,
  //   },
  //   {
  //     title: 'Logout',
  //     action: this.authService.logout,
  //     requireAuth: true,
  //   },
  // ];

  // filteredMenu: MenuItem[] = [];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // this.authService
    //   .checkAuthStatus()
    //   .pipe()
    //   .subscribe((res) => {
    //     this.filteredMenu = this.menuItems.filter((i) =>
    //       !i.requireAuth || res ? true : false
    //     );
    //   });
  }
}
