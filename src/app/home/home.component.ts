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
        thumbnail: '/assets/images/article1.jpg',
        description: 'A comprehensive guide to Angular framework.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
        thumbnail: '/assets/images/article2.jpg',
        description: "A beginner\'s guide to TypeScript.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
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
        description: "Take your Angular skills to the next level.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
        thumbnail: '/assets/images/article3.jpg',
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
        description: "Master Reactive Programming with RxJS. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains",
        thumbnail: '/assets/images/article4.jpg',
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
        description: 'Learn the basics of Angular.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains',
        thumbnail: '/assets/images/article5.jpg',
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
      },
      {
        id: '6',
        title: 'Angular RXJS',
        description: "Understanding Angular RXJS.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat",
        thumbnail: '/assets/images/article6.jpg',
        author: 'John Doe',
        publishDate: '2025-02-01',
        comments: [
          { 
            text: 'Nice Job',
            author: 'Karan Goel', 
            timestamp: '2025-10-14T09:31:20.346Z',
            likes: 1,
            replies: []
          },
          { 
            text: 'Good work',
            author: 'Sham Singh', 
            timestamp: '2025-12-14T09:31:20.346Z',
            likes: 6,
            replies: []
          }
        ]
      }
    ];

    // Default authors data
    const authors = [
      {
        name: 'John Doe',
        photo: '/assets/images/author1.jpg',
        bio: 'Angular enthusiast and web developer.He has over 3 years of experience in SEO. She has helped multiple clients in different industries grow their online presence through SEO, content creation and other technical strategies.His work across multiple disciplines broadly addresses narratives of human experience. As a playwright, Jonathan has had his pieces performed at the Yale School of Drama, and in Toronto at Hart House Theatre and Factory Theatre. As an artist and illustrator, he has had his art exhibited at MIT, Yale, New Haven ArtSpace, and the University of Toronto.'
      },
      {
        name: 'Jane Smith',
        photo: '/assets/images/author2.jpg',
        bio: 'TypeScript advocate and software engineer. He has over 3 years of experience in SEO. She has helped multiple clients in different industries grow their online presence through SEO, content creation and other technical strategies.He does her best writing on cruise ships, in Scottish castles, on her husband’s tour bus, and at home in her sunny southern California garden. Glynnis loves to play medieval matchmaker, transporting readers to a place where the bold heroes have endearing flaws, the women are stronger than they look, the land is lush and untamed, and chivalry is alive and well!'
      },
      {
        name: 'Alice Johnson',
        photo: '/assets/images/author3.jpg',
        bio: 'JavaScript advocate and software developer.He has over 3 years of experience in SEO. She has helped multiple clients in different industries grow their online presence through SEO, content creation and other technical strategies.His work has appeared on NPR and BuzzFeed, as well as in Playboy, GQ, and McSweeney’s. In his other life, he is a doctoral student at MIT and a Berkman Klein fellow at Harvard.His work across multiple disciplines broadly addresses narratives of human experience'
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
