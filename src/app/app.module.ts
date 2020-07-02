import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleModule } from './article/article.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CategoryModule } from './category/categrory.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ArticleModule,
    EditorModule,
    CategoryModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
