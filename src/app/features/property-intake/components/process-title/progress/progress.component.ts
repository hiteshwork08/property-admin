import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports:[],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit{
  @Input() progress = 0;
  constructor() {}

  ngOnInit() {}
}
