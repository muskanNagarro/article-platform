import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: any[];
  featuredArticles: any[];
  pagedArticles: any[];
  currentPage = 1;
  totalPages = 1; 
  searchQuery = '';
  sortOption = 'latest';

  constructor(private router: Router) {}

  loadDefaultData(): void {
    // Default articles data
    this.articles = [
      {
        id: '1',
        title: 'Understanding Angular',
        thumbnail: 'https://via.placeholder.com/150',
        description: 'A comprehensive guide to Angular framework.',
        author: 'John Doe',
        publishDate: '2025-02-05',
        comments: [
          { 
            text: 'Nice Explaination',
            author: 'Abhay Jindal', 
            timestamp: '2025-02-15T09:31:20.346Z',
            likes: 1,
            replies: []
          },
          { 
            text: 'Good',
            author: 'Charu Lata', 
            timestamp: '2025-04-14T09:31:20.346Z',
            likes: 5,
            replies: []
          }
        ]
      },
      {
        id: '2',
        title: 'Learning TypeScript',
        thumbnail: 'https://via.placeholder.com/150',
        description: 'A beginner\'s guide to TypeScript.',
        author: 'Jane Smith',
        publishDate: '2025-02-10',
        comments: [
          { 
            text: 'Nice Job',
            author: 'Jatin', 
            timestamp: '2025-02-24T09:31:20.346Z',
            likes: 1,
            replies: []
          },
          { 
            text: 'Good work',
            author: 'Charu Goel', 
            timestamp: '2025-06-14T09:31:20.346Z',
            likes: 5,
            replies: []
          }
        ]
      },
      {
        id: '3',
        title: 'Advanced Angular Techniques',
        description: 'Take your Angular skills to the next level',
        thumbnail: 'https://via.placeholder.com/150',
        author: 'Jane Smith',
        publishDate: '2025-02-03',
        comments: [
          { 
            text: 'Nice Job',
            author: 'Ajay Sharma', 
            timestamp: '2025-08-14T09:31:20.346Z',
            likes: 1,
            replies: []
          },
          { 
            text: 'Good one',
            author: 'Raman Jain', 
            timestamp: '2025-09-14T09:31:20.346Z',
            likes: 5,
            replies: []
          }
        ]
      },
      {
        id: '4',
        title: 'Understanding RxJS',
        description: 'Master Reactive Programming with RxJS',
        thumbnail: 'https://via.placeholder.com/150',
        author: 'Alice Johnson',
        publishDate: '2025-02-05',
        comments: [
          { 
            text: 'Explaination is very nice',
            author: 'Vijay Sharma', 
            timestamp: '2025-02-20T09:31:20.346Z',
            likes: 1,
            replies: []
          },
          { 
            text: 'Good, keep it up',
            author: 'Kamal Verma', 
            timestamp: '2025-02-10T09:31:20.346Z',
            likes: 5,
            replies: []
          }
        ]
      },
      {
        id: '5',
        title: 'Angular Basics',
        description: 'Learn the basics of Angular',
        thumbnail: 'https://via.placeholder.com/150',
        author: 'John Doe',
        publishDate: '2025-02-01',
        comments: [
          { 
            text: 'Nice Job',
            author: 'Ray Goel', 
            timestamp: '2025-10-14T09:31:20.346Z',
            likes: 1,
            replies: []
          },
          { 
            text: 'Good work',
            author: 'Raj Singh', 
            timestamp: '2025-12-14T09:31:20.346Z',
            likes: 5,
            replies: []
          }
        ]
      }
    ];

    // Default authors data
    const authors = [
      {
        name: 'John Doe',
        photo: 'https://via.placeholder.com/50',
        bio: 'Angular enthusiast and web developer.'
      },
      {
        name: 'Jane Smith',
        photo: 'https://via.placeholder.com/50',
        bio: 'TypeScript advocate and software engineer.'
      },
      {
        name: 'Alice Johnson',
        photo: 'https://via.placeholder.com/50',
        bio: 'JavaScript advocate and software developer.'
      }
    ];

    // Store the default data in localStorage
    localStorage.setItem('articles', JSON.stringify(this.articles));
    localStorage.setItem('authors', JSON.stringify(authors));
  }

  ngOnInit(): void {
    // Check if articles and authors are in localStorage
    const storedArticles = localStorage.getItem('articles');
    const storedAuthors = localStorage.getItem('authors');

    if (storedArticles && storedAuthors) {
      // If data exists in localStorage, parse and load them
      this.articles = JSON.parse(storedArticles);
    } else {
      // If no data in localStorage, load the default data
      this.loadDefaultData();
    }
    this.featuredArticles = this.articles.slice(0, 3); // Simulating featured articles (first 3)
    this.pagedArticles = this.articles.slice(0, 3);; // For now, all articles will be displayed
    this.totalPages = Math.ceil(this.articles.length / 3); // Assume 3 articles per page
    this.onSort();
  }

  // Method to handle search functionality
  onSearch() {
    if (this.searchQuery) {
      this.pagedArticles = this.articles.filter(article =>
        article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.pagedArticles = this.articles;
    }
  }

  // Method to handle sorting functionality
  onSort() {
    switch (this.sortOption) {
      case 'latest':
        this.pagedArticles.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        break;
      case 'popular':
        // Placeholder logic for most popular articles (e.g., based on views or comments)
        break;
      case 'editor':
        // Placeholder logic for editor's picks
        break;
    }
  }

  // Pagination Methods
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedArticles();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedArticles();
    }
  }

  // Update articles shown on the current page
  updatePagedArticles() {
    const startIndex = (this.currentPage - 1) * 3;
    const endIndex = startIndex + 3;
    this.pagedArticles = this.articles.slice(startIndex, endIndex);
  }

  onArticleClick(article: any): void {
    this.router.navigate(['/article', article.id]);  // Navigate to ArticlePage with article ID
  }
}
