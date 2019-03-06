import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public dateTimeFormat = '';
  public selectedDateFormat = '';
  public selectedTimeZone = '';
  public currentTime = '';
  public dateFormats = [
    {
      'text': 'dddd, MMMM Do YYYY, h:mm:ss a',
      'value': 'dddd, MMMM Do YYYY, h:mm:ss a'
    },
    {
      'text': 'YYYY-MM-DDTHH:mm	',
      'value': 'YYYY-MM-DDTHH:mm	'
    },
    {
      'text': 'YYYY-MM-DDTHH:mm:ss.SSS',
      'value': 'YYYY-MM-DDTHH:mm:ss.SSS'
    },
    {
      'text': 'ddd, hA',
      'value': 'ddd, hA'
    },
    {
      'text': 'YYYY MM DD',
      'value': 'YYYY MM DD'
    }
  ];

  public dropdownColors = [
    {
      'text': '#cccccc',
      'value': '#cccccc'
    },
    {
      'text': '#fcc750',
      'value': '#fcc750'
    },
    {
      'text': '#cafff7',
      'value': '#cafff7'
    },
    {
      'text': '#fff9e7',
      'value': '#fff9e7'
    },
    {
      'text': '#f6effb',
      'value': '#f6effb'
    }
  ];

  constructor() {

  }

  ngOnInit() {
  }

  retrieveCurrentTime(event) {
    this.selectedTimeZone = event.selectedTimeZone;
    this.currentTime = event.currentTime;
  }

}
