import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss'],
})
export class EmojiComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public addEmoji(data: any) {
    console.log(data);
  }
}
