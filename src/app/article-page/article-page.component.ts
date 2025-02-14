import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // To get the article ID from the URL

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  standalone: false,
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {
  article: any = {};
  author: any = {};
  relatedArticles: any[] = [];
  newComment: string = '';
  newReply: string = ''; // Reply input for a specific comment
  showReplyForm: boolean = false; // Toggle for showing the reply form
  replyToCommentId: string = ''; // To identify which comment is being replied to
  sortOrder: string = 'newest'; // Default sorting order

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id') || '';
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');

    // Find the article by ID
    this.article = articles.find((article: any) => article.id === articleId);

    // If article is found, retrieve the author and related articles
    if (this.article) {
      this.author = this.getAuthorByName(this.article.author);
      this.relatedArticles = this.getRelatedArticles(this.article.author);
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;  // Assumes a logged-in user is stored in 'currentUser' in localStorage
  }

  getAuthorByName(authorName: string): any {
    const authors = JSON.parse(localStorage.getItem('authors') || '[]');
    return authors.find((author: any) => author.name === authorName);
  }

  getRelatedArticles(authorName: string): any[] {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    return articles.filter((article: any) => article.author === authorName && article.id !== this.article.id);
  }

  // Method to post a comment
  postComment(): void {
    if (this.newComment.trim()) {
      const comment = {
        text: this.newComment,
        author: 'Anonymous', // Replace this with the logged-in user's name if needed
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: [] // Initialize replies array for this comment
      };

      // Add the new comment to the article's comments array
      if (!this.article.comments) {
        this.article.comments = [];
      }
      this.article.comments.push(comment);

      // Save the updated article data back to localStorage
      const articles = JSON.parse(localStorage.getItem('articles') || '[]');
      const updatedArticles = articles.map((article: any) => 
        article.id === this.article.id ? this.article : article
      );
      localStorage.setItem('articles', JSON.stringify(updatedArticles));

      // Clear the new comment field after posting
      this.newComment = '';
    }
  }

  // Sorting the comments
  sortComments(): void {
    if (this.article.comments) {
      if (this.sortOrder === 'newest') {
        this.article.comments.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      } else if (this.sortOrder === 'oldest') {
        this.article.comments.sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      } else if (this.sortOrder === 'mostLiked') {
        this.article.comments.sort((a: any, b: any) => b.likes - a.likes);
      }
    }
  }

  // Toggle the reply form visibility
  showReplyFormForComment(commentId: string): void {
    this.showReplyForm = !this.showReplyForm;
    this.replyToCommentId = commentId;
  }

  // Post a reply to a comment
  postReply(): void {
    if (this.newReply.trim()) {
      const reply = {
        text: this.newReply,
        author: 'Anonymous', // Replace with logged-in user's name if needed
        timestamp: new Date().toISOString(),
        likes: 0
      };

      // Find the comment to which we are replying
      const comment = this.article.comments.find((comment: any) => comment.id === this.replyToCommentId);
      if (comment) {
        comment.replies = comment.replies || [];
        comment.replies.push(reply);

        // Save the updated article data back to localStorage
        const articles = JSON.parse(localStorage.getItem('articles') || '[]');
        const updatedArticles = articles.map((article: any) => 
          article.id === this.article.id ? this.article : article
        );
        localStorage.setItem('articles', JSON.stringify(updatedArticles));

        // Clear the reply input field after posting
        this.newReply = '';
        this.showReplyForm = false; // Hide the reply form after posting
      }
    }
  }
  // Navigate back to the previous page
  goBack(): void {
    this.router.navigate(['/']); // Or any other route you prefer
  }
}
