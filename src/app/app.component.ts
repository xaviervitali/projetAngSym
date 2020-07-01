import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UiService } from './ui/ui.service';
import { ToastrService } from 'ngx-toastr';

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
