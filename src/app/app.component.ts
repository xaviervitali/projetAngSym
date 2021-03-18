import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UiService } from './ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  flash = null;
  loading = false;

  constructor(public ui: UiService) {}

  ngOnInit() {}
}
