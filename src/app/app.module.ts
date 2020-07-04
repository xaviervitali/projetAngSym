import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleModule } from './article/article.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CategoryModule } from './category/categrory.module';
import { UserModule } from './user/user.module';
import { UploadsComponent } from './upload/uploads/uploads.component';
import { ContactComponent } from './contact/contact/contact.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, UploadsComponent, ContactComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ArticleModule,
    EditorModule,
    CategoryModule,
    UserModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
