import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  form = new FormGroup({
    title: new FormControl(''),
  });
  constructor(
    private categoryService: CategoryService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.categoryService.findAll().subscribe((cat) => (this.categories = cat));
  }

  handleDelete(id) {
    const categoriesCopy = { ...this.categories };
    this.categories.splice(
      this.categories.findIndex((cat) => cat.id === id),
      1
    );

    this.categoryService.delete(id).subscribe(
      () => '',
      () => (this.categories = categoriesCopy)
    );
  }
  handleSubmit() {
    const catCopy = { ...this.categories };
    this.categoryService.create(this.form.value).subscribe(
      (category) => {
        this.categories.push(category);
      },
      (e) => {
        this.categories = catCopy;
      }
    );
  }
}
