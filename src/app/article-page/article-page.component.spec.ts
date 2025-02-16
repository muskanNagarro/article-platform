import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlePageComponent } from './article-page.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way binding
import { RouterTestingModule } from '@angular/router/testing'; // Mock RouterModule

describe('ArticlePageComponent', () => {
  let component: ArticlePageComponent;
  let fixture: ComponentFixture<ArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlePageComponent],
      imports: [FormsModule, RouterTestingModule] // Import FormsModule for ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlePageComponent);
    component = fixture.componentInstance;

    // Set up initial data for testing
    component.article = {
      id: 1,
      title: 'Test Article Title',
      author: 'Author Name',
      publishDate: '2025-02-13',
      thumbnail: 'https://example.com/thumbnail.jpg',
      description: 'Brief description of the article',
      content: 'Full article content goes here.',
      comments: [
        { id: 1, author: 'Commenter1', text: 'Great article!', timestamp: new Date(), likes: 2, replies: [] },
        { id: 2, author: 'Commenter2', text: 'Very informative.', timestamp: new Date(), likes: 3, replies: [] }
      ]
    };
    component.relatedArticles = [
      { id: 2, title: 'Related Article 1', description: 'Description for related article' },
      { id: 3, title: 'Related Article 2', description: 'Description for related article' }
    ];

    fixture.detectChanges();
  });

  // Test case 1: Component should be created
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Verify if article title is displayed
  it('should display article title', () => {
    const title = fixture.debugElement.query(By.css('.heading h1')).nativeElement;
    expect(title.textContent).toBe('Test Article Title');
  });

  // Test case 3: Verify if article content is displayed
  it('should display article content', () => {
    const content = fixture.debugElement.query(By.css('.article-body')).nativeElement;
    expect(content.textContent).toContain('Full article content goes here.');
  });

  // Test case 4: Verify if the article author and publish date are displayed
  it('should display author and publish date', () => {
    const authorInfo = fixture.debugElement.query(By.css('.article-author .author-info')).nativeElement;
    expect(authorInfo.textContent).toContain('By: Author Name');
    expect(authorInfo.textContent).toContain('Published on: 2025-02-13');
  });

  // Test case 5: Check if the "Back to Home" button calls goBack() method
  it('should call goBack() when the back button is clicked', () => {
    spyOn(component, 'goBack'); // Spy on the goBack method
    const backButton = fixture.debugElement.query(By.css('.back-btn')).nativeElement;
    backButton.click();

    expect(component.goBack).toHaveBeenCalled();
  });

  // Test case 6: Verify that the related articles section is displayed
  it('should display related articles', () => {
    const relatedArticleTitle = fixture.debugElement.queryAll(By.css('.related-article h4'))[0].nativeElement;
    expect(relatedArticleTitle.textContent).toBe('Related Article 1');
  });

  // Test case 7: Verify that no related articles message is displayed when there are no related articles
  it('should display "No Other Related Articles" when there are no related articles', () => {
    component.relatedArticles = [];  // Clear the related articles
    fixture.detectChanges();

    const noRelatedArticlesMessage = fixture.debugElement.query(By.css('.no-other')).nativeElement;
    expect(noRelatedArticlesMessage.textContent).toBe('No Other Related Articles');
  });

  // Test case 8: Check if comment sorting dropdown exists
  it('should have a comment sorting dropdown', () => {
    const sortDropdown = fixture.debugElement.query(By.css('.comment-sort select')).nativeElement;
    expect(sortDropdown).toBeTruthy();
  });

  // Test case 9: Test sorting function is called on change
  it('should call sortComments() when the sort order changes', () => {
    spyOn(component, 'sortComments');
    const sortDropdown = fixture.debugElement.query(By.css('.comment-sort select')).nativeElement;
    sortDropdown.value = 'oldest';
    sortDropdown.dispatchEvent(new Event('change'));

    expect(component.sortComments).toHaveBeenCalled();
  });

  // Test case 10: Test if comment can be posted
  it('should post a comment when the "Post Comment" button is clicked', () => {
    spyOn(component, 'postComment');
    component.newComment = 'New comment';
    fixture.detectChanges();

    const postButton = fixture.debugElement.query(By.css('.comment-form button')).nativeElement;
    postButton.click();

    expect(component.postComment).toHaveBeenCalled();
  });

  // Test case 11: Verify if like button works for comments
  it('should increase comment likes when the like button is clicked', () => {
    const initialLikes = component.article.comments[0].likes;
    const likeButton = fixture.debugElement.query(By.css('.comment-likes button')).nativeElement;

    likeButton.click();
    fixture.detectChanges();

    expect(component.article.comments[0].likes).toBe(initialLikes + 1);
  });

  // Test case 12: Check if reply form is shown for a comment
  it('should display reply form for a comment when "Reply" button is clicked', () => {
    const replyButton = fixture.debugElement.query(By.css('.comment .comment-likes button:nth-child(2)')).nativeElement;
    replyButton.click();
    fixture.detectChanges();

    const replyForm = fixture.debugElement.query(By.css('.reply-form'));
    expect(replyForm).toBeTruthy();
  });

  // Test case 13: Verify if the reply can be posted
  it('should post a reply when the "Post Reply" button is clicked', () => {
    spyOn(component, 'postReply');
    component.newReply = 'New reply';
    fixture.detectChanges();

    const postReplyButton = fixture.debugElement.query(By.css('.reply-form button')).nativeElement;
    postReplyButton.click();

    expect(component.postReply).toHaveBeenCalled();
  });

  // Test case 14: Check if reply like button works
  it('should increase reply likes when the like button is clicked', () => {
    const initialLikes = component.article.comments[0].replies.length > 0 ? component.article.comments[0].replies[0].likes : 0;
    const likeReplyButton = fixture.debugElement.query(By.css('.reply-likes button')).nativeElement;

    likeReplyButton.click();
    fixture.detectChanges();

    expect(component.article.comments[0].replies[0].likes).toBe(initialLikes + 1);
  });
});
