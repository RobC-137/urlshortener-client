import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { UrlQueryData, UrlData } from '../../models/UrlData';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-links-table',
  templateUrl: './links-table.component.html',
  styleUrls: ['./links-table.component.scss'],
})
export class LinksTableComponent implements OnInit {
  urlsData: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['originalUrl', 'shortUrl', 'clicks', 'delete'];
  copyToClipboard: String;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions = [5, 10, 20];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    // this.sort.sortChange.subscribe(() => {
    //   console.log(this.sort);
    // });
    // this.api.getUrls().subscribe((data) => {
    //   this.urlsData.data = data;
    //   this.urlsData.sort = this.sort;
    // });
    this.paginator.pageSize = this.pageSizeOptions[0];
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          //console.log(this.sort.direction);

          return this.api.getUrls(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageSize,
            this.paginator.pageIndex
          );
        })
      )
      .subscribe((data: UrlQueryData) => {
        this.urlsData.data = data.results;
        this.urlsData.sort = this.sort;
        this.paginator.length = data.count;
      });
  }

  details(element: UrlData) {
    this.router.navigateByUrl('details', { state: { element: element } });
  }

  deleteUrl(id: string) {
    this.api
      .deleteUrl(id)
      .pipe(
        startWith({}),
        switchMap(() => {
          //console.log(this.sort.direction);

          return this.api.getUrls(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageSize,
            this.paginator.pageIndex
          );
        })
      )
      .subscribe((data: UrlQueryData) => {
        this.urlsData.data = data.results;
        this.urlsData.sort = this.sort;
        this.paginator.length = data.count;
      });
  }
}
