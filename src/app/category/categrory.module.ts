import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ViewArticlesComponent } from './view-articles/view-articles.component';
import { CategoryAddComponent } from './category-add/category-add.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryEditComponent,
    ViewArticlesComponent,
    CategoryAddComponent,
  ],
  imports: [SharedModule],
})
export class CategoryModule {}
