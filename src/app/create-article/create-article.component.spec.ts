import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateArticleComponent } from './create-article.component';
import { FormsModule } from '@angular/forms';  // Import FormsModule for two-way binding with ngModel
import { By } from '@angular/platform-browser';

describe('CreateArticleComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateArticleComponent],
      imports: [FormsModule],  // To allow ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(CreateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial rendering
  });

  // Test case 1: Component should be created
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Check if the "Create New Article" heading is present
  it('should display the correct heading', () => {
    const heading = fixture.debugElement.query(By.css('.heading h1')).nativeElement;
    expect(heading.textContent).toBe('Create New Article');
  });

  // Test case 3: Check if input fields for title, author, and scheduled date are present
  it('should have input fields for title, author, and scheduled date', () => {
    const titleInput = fixture.debugElement.query(By.css('#title')).nativeElement;
    const authorInput = fixture.debugElement.query(By.css('#author')).nativeElement;
    const scheduleDateInput = fixture.debugElement.query(By.css('#scheduleDate')).nativeElement;

    expect(titleInput).toBeTruthy();
    expect(authorInput).toBeTruthy();
    expect(scheduleDateInput).toBeTruthy();
  });

  // Test case 4: Test the ngModel binding for the title input field
  it('should update title when input changes', () => {
    const titleInput = fixture.debugElement.query(By.css('#title')).nativeElement;
    titleInput.value = 'New Article Title';
    titleInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.title).toBe('New Article Title');
  });

  // Test case 5: Test the ngModel binding for the author input field
  it('should update author when input changes', () => {
    const authorInput = fixture.debugElement.query(By.css('#author')).nativeElement;
    authorInput.value = 'John Doe';
    authorInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.author).toBe('John Doe');
  });

  // Test case 6: Check if the "Back to Home" button triggers the goBack method
  it('should call goBack() when the back button is clicked', () => {
    spyOn(component, 'goBack'); // Spy on the goBack method
    const backButton = fixture.debugElement.query(By.css('.back-btn')).nativeElement;
    backButton.click();

    expect(component.goBack).toHaveBeenCalled();
  });

  // Test case 7: Check if the Save Draft button calls the saveDraft method
  it('should call saveDraft() when the Save Draft button is clicked', () => {
    spyOn(component, 'saveDraft'); // Spy on the saveDraft method
    const saveDraftButton = fixture.debugElement.query(By.css('.action-buttons button:nth-child(1)')).nativeElement;
    saveDraftButton.click();

    expect(component.saveDraft).toHaveBeenCalled();
  });

  // Test case 8: Check if the Publish button calls the publishArticle method
  it('should call publishArticle() when the Publish button is clicked', () => {
    spyOn(component, 'publishArticle'); // Spy on the publishArticle method
    const publishButton = fixture.debugElement.query(By.css('.action-buttons button:nth-child(2)')).nativeElement;
    publishButton.click();

    expect(component.publishArticle).toHaveBeenCalled();
  });

  // Test case 9: Check if the Schedule button calls the scheduleArticle method
  it('should call scheduleArticle() when the Schedule button is clicked', () => {
    spyOn(component, 'scheduleArticle'); // Spy on the scheduleArticle method
    const scheduleButton = fixture.debugElement.query(By.css('.action-buttons button:nth-child(3)')).nativeElement;
    scheduleButton.click();

    expect(component.scheduleArticle).toHaveBeenCalled();
  });

  // Test case 10: Check if the editor div is present (Quill Editor)
  it('should have an editor for the article content', () => {
    const editorDiv = fixture.debugElement.query(By.css('#editor')).nativeElement;
    expect(editorDiv).toBeTruthy();
  });
});
