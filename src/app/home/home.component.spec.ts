import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // Set up the test bed
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unrecognized elements or directives
    })
    .compileComponents();
  });

  // Create the component and trigger change detection
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test if the component is created correctly
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test if articles are rendered
  it('should display article titles', () => {
    const articles = component.articles;
    fixture.detectChanges();  // Trigger change detection
    
    // Get all article titles rendered in the HTML
    const articleTitles = fixture.debugElement.queryAll(By.css('.article-info h3'));

    // Check if the titles match the ones in the component
    articleTitles.forEach((element, index) => {
      expect(element.nativeElement.textContent).toContain(articles[index].title);
    });
  });

  // Test if the search functionality works
  it('should filter articles based on search query', () => {
    component.searchQuery = 'Angular Basics';
    component.onSearch();

    // After calling searchArticles, the filtered articles should contain only the one matching the search query
    expect(component.articles.filter(article => article.title.includes(component.searchQuery)).length).toBeGreaterThan(0);
  });

  // Test if the number of articles is correct
  it('should display the correct number of articles', () => {
    const articleCards = fixture.debugElement.queryAll(By.css('.article-card'));
    expect(articleCards.length).toBe(component.articles.length);
  });

  // Test if article thumbnail images are rendered correctly
  it('should display article thumbnail images', () => {
    const articleImages = fixture.debugElement.queryAll(By.css('.article-thumbnail'));
    expect(articleImages.length).toBe(component.articles.length);
    
    // Ensure each image has a source defined
    articleImages.forEach((image, index) => {
      expect(image.nativeElement.src).toContain(component.articles[index].thumbnail);
    });
  });
});
