import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { FormsModule } from '@angular/forms'; 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ExploreAuthorComponent } from './explore-author/explore-author.component';
import { CreateArticleComponent } from './create-article/create-article.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ArticlePageComponent,
    ExploreAuthorComponent,
    CreateArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
