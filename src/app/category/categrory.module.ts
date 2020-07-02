import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ViewArticlesComponent } from './view-articles/view-articles.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryEditComponent,
    ViewArticlesComponent,
  ],
  imports: [SharedModule],
})
export class CategoryModule {}
