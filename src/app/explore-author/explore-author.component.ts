import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-author',
  templateUrl: './explore-author.component.html',
  standalone: false,
  styleUrls: ['./explore-author.component.css']
})
export class ExploreAuthorComponent implements OnInit {
  authors: any[] = [];
  searchQuery: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadAuthors();
  }

  // Load authors data from local storage or mock data
  loadAuthors(): void {
    // Assuming you have authors data stored in localStorage
    this.authors = JSON.parse(localStorage.getItem('authors') || '[]');
  }

  // Search functionality to filter authors by name
  searchAuthors(): void {
    if (this.searchQuery) {
      this.authors = this.authors.filter(author =>
        author.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadAuthors(); // Reset if search query is cleared
    }
  }

  // Navigate back to the previous page
  goBack(): void {
    this.router.navigate(['/']); // Or any other route you prefer
  }
}
