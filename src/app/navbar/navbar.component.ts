import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ArticleService } from '../article/article.service';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    public articleService: ArticleService,
    public user: UserService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.isAuthenticated ? '' : this.router.navigateByUrl('/login');
    this.auth.authChanged.subscribe((value) => {
      if (!value && this.isAuthenticated) {
        this.router.navigateByUrl('/login');
      }
      this.isAuthenticated = value;
    });
  }
}
