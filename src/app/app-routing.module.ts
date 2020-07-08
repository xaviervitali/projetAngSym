import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ArticlesComponent } from './article/articles/articles.component';
import { ArticleCreateComponent } from './article/create/article-create.component';
import { ArticlesResolverService } from './article/articles-resolver.service';
import { ArticleViewComponent } from './article/view/view.component';
import { ViewArticlesComponent } from './category/view-articles/view-articles.component';
import { CategoriesComponent } from './category/categories/categories.component';
import { ArticleEditComponent } from './article/edit/edit.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { UserShowComponent } from './user/user-show/user-show.component';
import { UploadsComponent } from './upload/uploads/uploads.component';
import { ContactComponent } from './contact/contact/contact.component';
import { CommentsComponent } from './comment/comments/comments.component';

const routes: Routes = [
  {
    path: 'articles',
    component: ArticlesComponent,
    resolve: { article: ArticlesResolverService },
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'article/create', component: ArticleCreateComponent },
  { path: 'article/:id', component: ArticleViewComponent },
  { path: 'article/edit/:id', component: ArticleEditComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categorie/:id', component: ViewArticlesComponent },
  { path: 'categorie/edition/:id', component: CategoryEditComponent },
  { path: 'profil', component: UserShowComponent },
  { path: 'uploads', component: UploadsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: CommentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
