import { Component } from '@angular/core';

@Component({
  selector: 'app-process-title',
  standalone: true,
  imports:[],
  templateUrl: './process-title.component.html',
  styleUrls: ['./process-title.component.scss']
})
export class ProcessTitleComponent {

files:any[]=[];

onFileDropped($event){
 for(const item of $event){
   this.files.push(item)
 }
}

fileBrowserHandler($event){
}

deleteFiles(files){
  
}

}


