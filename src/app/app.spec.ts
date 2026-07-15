import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { App } from './app';
import { QueueService } from './services/queue.service';

declare const jasmine: any;

describe('App', () => {
  let queueService: any;

  beforeEach(async () => {
    queueService = {
      getQueue: jasmine.createSpy('getQueue')
    };

    class MockAudio {
      constructor(public src: string) {}
      play = jasmine.createSpy('play').and.returnValue(Promise.resolve());
    }

    (window as Window & typeof globalThis & { Audio: typeof MockAudio }).Audio = MockAudio as unknown as typeof Audio;

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: QueueService, useValue: queueService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('plays a sound when the queue number changes', () => {
    queueService.getQueue.and.returnValues(
      of({
        room1: { room: 'Room 1', doctor: 'Dr. A', number: '10' },
        room2: { room: 'Room 2', doctor: 'Dr. B', number: '20' },
      }),
      of({
        room1: { room: 'Room 1', doctor: 'Dr. A', number: '11' },
        room2: { room: 'Room 2', doctor: 'Dr. B', number: '20' },
      })
    );

    const fixture = TestBed.createComponent(App);
    fixture.componentInstance.loadQueue();
    fixture.componentInstance.loadQueue();

    const audio = fixture.componentInstance['audio'] as { play: any } | undefined;
    expect(audio?.play).toHaveBeenCalled();
  });
});
