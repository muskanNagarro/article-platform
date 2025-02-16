import { TestBed } from "@angular/core/testing";
import { CommentSortService } from "./comment-sort.service";

class MockWorker {
  postMessage(data: any) {}
  onmessage: Function;
  onerror: Function;
}

describe('CommentSortService', () => {
  let service: CommentSortService;
  let mockWorker: MockWorker | null; // Allow mockWorker to be null

  beforeEach(() => {
    // Create a mock Web Worker
    mockWorker = new MockWorker();
    spyOn(mockWorker, 'postMessage');  // Spy on postMessage
    spyOn(mockWorker, 'onmessage');   // Spy on the onmessage function

    // Set up the testing module
    TestBed.configureTestingModule({
      providers: [
        CommentSortService,
        { provide: Worker, useValue: mockWorker }
      ]
    });

    service = TestBed.inject(CommentSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort comments by newest first', (done) => {
    const mockComments = [
      { id: 1, author: 'Alice', timestamp: '2023-01-01T10:00:00Z', text: 'Great article!', likes: 5 },
      { id: 2, author: 'Bob', timestamp: '2023-03-01T10:00:00Z', text: 'I disagree.', likes: 3 },
      { id: 3, author: 'Charlie', timestamp: '2023-02-01T10:00:00Z', text: 'Interesting read.', likes: 8 }
    ];

    // Simulate worker's onmessage behavior
    mockWorker!.onmessage = (event: { data: any; }) => { // Use non-null assertion to ensure mockWorker is not null
      const sortedComments = event.data;
      expect(sortedComments[0].author).toBe('Bob'); // The comment with the latest timestamp
      expect(sortedComments[1].author).toBe('Charlie');
      expect(sortedComments[2].author).toBe('Alice');
      done(); // Let Jasmine know the test is done
    };

    // Call the method and simulate the worker message
    service.sortComments(mockComments, 'newest');
    mockWorker!.onmessage({ data: mockComments });
  });

  it('should sort comments by oldest first', (done) => {
    const mockComments = [
      { id: 1, author: 'Alice', timestamp: '2023-01-01T10:00:00Z', text: 'Great article!', likes: 5 },
      { id: 2, author: 'Bob', timestamp: '2023-03-01T10:00:00Z', text: 'I disagree.', likes: 3 },
      { id: 3, author: 'Charlie', timestamp: '2023-02-01T10:00:00Z', text: 'Interesting read.', likes: 8 }
    ];

    // Simulate worker's onmessage behavior
    mockWorker!.onmessage = (event: { data: any; }) => { // Use non-null assertion
      const sortedComments = event.data;
      expect(sortedComments[0].author).toBe('Alice'); // The comment with the oldest timestamp
      expect(sortedComments[1].author).toBe('Charlie');
      expect(sortedComments[2].author).toBe('Bob');
      done(); // Let Jasmine know the test is done
    };

    // Call the method and simulate the worker message
    service.sortComments(mockComments, 'oldest');
    mockWorker!.onmessage({ data: mockComments });
  });

  it('should sort comments by most liked', (done) => {
    const mockComments = [
      { id: 1, author: 'Alice', timestamp: '2023-01-01T10:00:00Z', text: 'Great article!', likes: 5 },
      { id: 2, author: 'Bob', timestamp: '2023-03-01T10:00:00Z', text: 'I disagree.', likes: 3 },
      { id: 3, author: 'Charlie', timestamp: '2023-02-01T10:00:00Z', text: 'Interesting read.', likes: 8 }
    ];

    // Simulate worker's onmessage behavior
    mockWorker!.onmessage = (event: { data: any; }) => { // Use non-null assertion
      const sortedComments = event.data;
      expect(sortedComments[0].author).toBe('Charlie'); // The comment with the most likes
      expect(sortedComments[1].author).toBe('Alice');
      expect(sortedComments[2].author).toBe('Bob');
      done(); // Let Jasmine know the test is done
    };

    // Call the method and simulate the worker message
    service.sortComments(mockComments, 'mostLiked');
    mockWorker!.onmessage({ data: mockComments });
  });

  afterEach(() => {
    // Reset any mocks or configurations if needed
    mockWorker = null;  // Set mockWorker back to null after each test
  });
});
