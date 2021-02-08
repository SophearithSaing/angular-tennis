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
  loading = false;
  results = [];

  constructor(private tennisService: TennisService) { }

  ngOnInit(): void {
    this.getDates(this.fullDate);
  }

  getDates = (date: Date) => {
    this.dates = [];
    let newDate = new Date(date.setDate(date.getDate() - 1));
    for (let round = 0; round < 3; round++) {
      const dateString = `${newDate.getDate() < 10 ? '0' + (newDate.getDate()) : (newDate.getDate())}-${newDate.getMonth() < 9 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)}-${newDate.getFullYear()}`;
      this.dates.push(dateString);
      newDate = new Date(date.setDate(date.getDate() + 1));
    }
    this.selectedDate = this.dates[1];
    this.getMatches(this.dates[1]);
  }

  changeDate = (dateString: string) => {
    const dateArr = dateString.split('-');
    const date = new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);
    this.getDates(date);
  }

  getMatches = (date: string) => {
    this.results = [];
    this.loading = true;
    this.selectedDate = date;
    const dateArr = date.split('-');
    const dateStr = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
    this.tennisService.getMatchesByDate(dateStr).subscribe(data => {
      this.results = data.results;
      this.loading = false;
      console.log(this.results);
    });
  }

  formatTime = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
  }

}
