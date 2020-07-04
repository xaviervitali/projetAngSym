import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css'],
})
export class UploadsComponent implements OnInit {
  uploads: [] = [];
  loading = true;
  noUpload: boolean;
  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.uploadService.findAll().subscribe((liste) => {
      this.uploads = liste;
      this.loading = false;
      liste.length > 0 ? (this.noUpload = false) : (this.noUpload = true);
    });
  }
  isImage(file: any) {
    const imageExtension = ['jpeg', 'jpg', 'gif', 'png'];
    const reverse = file.split('').reverse().join('');

    const extension = reverse
      .slice(0, reverse.indexOf('.'))
      .split('')
      .reverse()
      .join('');

    return imageExtension.includes(extension);
  }
}
