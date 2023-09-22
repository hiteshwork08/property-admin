import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressComponent } from './progress/progress.component';

@Component({
  selector: 'app-process-title',
  standalone: true,
  imports: [CommonModule,ProgressComponent],
  templateUrl: './process-title.component.html',
  styleUrls: ['./process-title.component.scss'],
})
export class ProcessTitleComponent {
  files: any[] = [];


  onFileDropped(event) {
    this.prepareFileslist(event.target.files)
  }

  // formatBytes(bytes,decimals){
  //   if (bytes === 0) {
  //     return '0 Bytes';
  //   }
  //   const k = 1024;
  //   const dm = decimals <= 0 ? 0 : decimals || 2;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  // }

  


  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  prepareFileslist(files){
    this.files.push(...files);
    // this.uploadFilesSimulator(0);
  }
}
``