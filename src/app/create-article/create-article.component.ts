import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Quill from 'quill'; // Import Quill

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  standalone: false,
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit, AfterViewInit {
  editor: any;
  title: string = '';
  author: string = '';
  publishDate: string = '';
  draftContent: string = '';
  isDraft: boolean = true;
  scheduledDate: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // Initialize Quill editor
    this.editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['image', 'video']
        ]
      }
    });

    // Load draft content from localStorage if exists
    const savedDraft = JSON.parse(localStorage.getItem('draft') || '{}');
    if (savedDraft.title) {
      this.title = savedDraft.title;
      this.author = savedDraft.author;
      this.editor.root.innerHTML = savedDraft.content;
      this.scheduledDate = savedDraft.scheduledDate;
    }
  }

  saveDraft(): void {
    const articleContent = this.editor.root.innerHTML;
    const draft = {
      title: this.title,
      author: this.author,
      content: articleContent,
      scheduledDate: this.scheduledDate
    };
    localStorage.setItem('draft', JSON.stringify(draft)); // Save draft to localStorage
    alert('Draft saved!');
  }

  publishArticle(): void {
    const articleContent = this.editor.root.innerHTML;
    const article = {
      title: this.title,
      author: this.author,
      content: articleContent,
      publishDate: this.publishDate
    };

    // Optionally save the article to a server or local storage
    console.log('Article Published: ', article);
    alert('Article Published!');
    this.clearEditor();
  }

  scheduleArticle(): void {
    if (this.scheduledDate) {
      alert(`Article scheduled for ${this.scheduledDate}`);
    } else {
      alert('Please set a scheduled date.');
    }
  }

  clearEditor(): void {
    this.title = '';
    this.author = '';
    this.scheduledDate = '';
    this.editor.root.innerHTML = ''; // Clear the editor content
  }

  // Navigate back to the previous page
  goBack(): void {
    this.router.navigate(['/']); // Or any other route you prefer
  }
}
