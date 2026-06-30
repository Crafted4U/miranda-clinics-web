import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QueueService, QueueResponse } from './services/queue.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  queue?: QueueResponse;

  constructor(private queueService: QueueService) {}

  ngOnInit(): void {

    this.loadQueue();

    setInterval(() => {
      this.loadQueue();
    }, 1000);

  }

  loadQueue() {
    console.log('loadQueue called');
    this.queueService.getQueue().subscribe({
      next: (data) => {
        console.log('API response received:', data);
        this.queue = data;
        console.log('queue assigned:', this.queue);
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }

}