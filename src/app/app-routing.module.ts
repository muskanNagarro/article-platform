import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Assuming you have a HomeComponent
// import { AuthorListComponent } from './author-list/author-list.component'; // Assuming you have an Author List Component
import { ArticlePageComponent } from './article-page/article-page.component'; // Assuming you have an Article Page Component
// import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ExploreAuthorComponent } from './explore-author/explore-author.component';
import { CreateArticleComponent } from './create-article/create-article.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'explore-author', component: ExploreAuthorComponent },
  { path: 'article/:id', component: ArticlePageComponent },
  { path: 'create-article', component: CreateArticleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
