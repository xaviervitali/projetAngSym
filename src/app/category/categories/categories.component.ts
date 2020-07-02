import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  constructor(
    private categoryService: CategoryService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.categoryService.findAll().subscribe((cat) => (this.categories = cat));
  }

  handleDelete(id) {
    const categoriesCopy = { ...this.categories };
    this.categoryService.delete(id).subscribe(
      () => '',
      () => (this.categories = categoriesCopy)
    );
  }
}
