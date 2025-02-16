// comment-sort.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentSortService {
  private worker: Worker;

  constructor() {
    // Check if the browser supports Web Workers
    if (typeof Worker !== 'undefined') {
      // Create a new worker from the comment-sort.worker.ts file
      this.worker = new Worker(new URL('./comment-sort.worker', import.meta.url), { type: 'module' });
    }
  }

  // Method to sort comments using the Web Worker
  sortComments(comments: any[], sortBy: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // Listen for the result from the worker
      this.worker.onmessage = (event) => {
        resolve(event.data); // Resolve the promise with the sorted comments
      };

      // Handle errors from the worker
      this.worker.onerror = (error) => {
        reject(error); // Reject the promise if an error occurs in the worker
      };

      // Send the data to the worker for processing
      this.worker.postMessage({ comments, sortBy });
    });
  }
}
