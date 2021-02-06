import { Component, OnInit } from '@angular/core';
import { TennisService } from '../tennis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fullDate = new Date();
  selectedDate: string;
  dates = [];

  views = [
    'Rankings',
    'Matches',
    'Tournaments'
  ];
  view = 'Matches';
  results = [];

  constructor(private tennisService: TennisService) { }

  ngOnInit(): void {
    this.getDates(this.fullDate);
    // this.getMatches(this.dates[1]);
  }

  selectView = (event: any) => {
    console.log(event.value);
    this.view = event.value;
  }

  getDates = (date: Date) => {
    this.dates = [];
    let newDate = new Date(date.setDate(date.getDate() - 1));
    for (let round = 0; round < 3; round++) {
      const dateString = `${newDate.getDate() < 9 ? '0' + (newDate.getDate()) : (newDate.getDate())}-${newDate.getMonth() < 9 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)}-${newDate.getFullYear()}`;
      this.dates.push(dateString);
      newDate = new Date(date.setDate(date.getDate() + 1));
    }
  }

  changeDate = (dateString: string) => {
    const dateArr = dateString.split('-');
    const date = new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);
    this.getDates(date);
  }

  getMatches = (date: string) => {
    const dateArr = date.split('-');
    const dateStr = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
    this.tennisService.getMatchesByDate(dateStr).subscribe(data => {
      console.log(data.results);
      this.results = data.results;
    });
  }

  formatTime = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
  }

}
