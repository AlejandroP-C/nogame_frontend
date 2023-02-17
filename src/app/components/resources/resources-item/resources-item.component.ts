import { Component, Input, OnInit } from '@angular/core';
import { Structure } from 'src/app/interfaces/structure';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-resources-item',
  templateUrl: './resources-item.component.html',
  styleUrls: ['./resources-item.component.scss']
})
export class ResourcesItemComponent implements OnInit {

  @Input() structure!: Structure;
  @Input() user: User = JSON.parse(localStorage.getItem('user')!);

  constructor() { }

  ngOnInit(): void {
  }

}
