import { Component, OnInit } from '@angular/core';
import { TennisService } from '../tennis.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  rankings = [];
  loading = false;

  displayedColumns: string[] = ['ranking', 'country', 'name', 'points'];
  constructor(private tennisService: TennisService) { }

  ngOnInit(): void {
    this.loading = true;
    this.tennisService.getRankings().subscribe(data => {
      this.rankings = data.results.rankings;
      this.loading = false;
    });
  }

}
