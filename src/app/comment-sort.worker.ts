// comment-sort.worker.ts

// Listen for messages from the main thread (Angular app)
addEventListener('message', (event) => {
    const { comments, sortBy } = event.data;
    let sortedComments = [...comments];
  
    if (sortBy === 'newest') {
      // Sort by the most recent comments
      sortedComments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else if (sortBy === 'oldest') {
      // Sort by the oldest comments
      sortedComments.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    } else if (sortBy === 'mostLiked') {
      // Sort by the number of likes
      sortedComments.sort((a, b) => b.likes - a.likes);
    }
  
    // Send the sorted comments back to the main thread
    postMessage(sortedComments);
  });
  