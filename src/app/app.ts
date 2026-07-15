import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  private audio?: HTMLAudioElement;
  private previousNumbers = new Map<string, string>();

  constructor(private queueService: QueueService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.audio = new Audio('dingdong.mp3');

    this.loadQueue();

    setInterval(() => {
      this.loadQueue();
    }, 1000);
  }

  loadQueue() {
    this.queueService.getQueue().subscribe({
      next: (data) => {
        this.queue = data;
        this.playDingDongIfChanged(data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }

  private playDingDongIfChanged(data: QueueResponse) {
    const currentNumbers = [data.room1.number, data.room2.number];
    let hasChanged = false;

    currentNumbers.forEach((number, index) => {
      const key = `room${index + 1}`;
      const previous = this.previousNumbers.get(key);

      if (previous !== undefined && previous !== number) {
        hasChanged = true;
      }

      this.previousNumbers.set(key, number);
    });

    if (hasChanged) {
      this.audio?.play().catch(() => {
        // Ignore autoplay restrictions in the browser.
      });
    }
  }

}