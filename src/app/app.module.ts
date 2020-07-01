import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleModule } from './article/article.module';
import { ViewArticlesComponent } from './category/view-articles/view-articles.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ViewArticlesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ArticleModule,
    EditorModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
