import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }

  sendFeedback(feedback: { replies: string[], comment: string }) {
    // Simulate sending feedback to a server
    console.log('Sending feedback:', feedback);
    return new Promise(resolve => setTimeout(() => {
      console.log('Feedback sent successfully!');
      resolve({ status: 'success' });
    }, 1000));
  }
}
