import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  data;
  shortUrl: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private _location: Location
  ) {
    // console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    this.shortUrl = history.state.element.shortUrl;
    this.api
      .getUrlsGroupedByDate(history.state.element._id)
      .subscribe((data) => {
        this.data = data;
      });
  }

  backClicked() {
    this._location.back();
  }
}
