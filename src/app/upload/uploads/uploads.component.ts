import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { environment } from 'src/environments/environment.prod';

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

  isVideo(file: any) {
    const videoExtension = ['mp4', 'mov', 'avi'];
    const reverse = file.split('').reverse().join('');

    const extension = reverse
      .slice(0, reverse.indexOf('.'))
      .split('')
      .reverse()
      .join('');

    return videoExtension.includes(extension);
  }

  getFileName(file: any) {
    const reverse = file.split('').reverse().join('');
    const extension = reverse
      .slice(0, reverse.indexOf('.'))
      .split('')
      .reverse()
      .join('');

    const originalFileName = reverse
      .slice(reverse.indexOf('-') + 1)
      .split('')
      .reverse()
      .join('');

    return originalFileName + '.' + extension;
  }

  transformUrl(fileUrl: string) {
    return environment.assetFiles + fileUrl;
  }
}
