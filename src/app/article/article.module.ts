import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleCreateComponent } from './create/article-create.component';
import { ArticleViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleCreateComponent,
    ArticleViewComponent,
    EditComponent,
  ],
  imports: [SharedModule],
})
export class ArticleModule {}
