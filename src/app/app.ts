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
    this.queueService.getQueue().subscribe({
      next: (data) => {
        this.queue = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}