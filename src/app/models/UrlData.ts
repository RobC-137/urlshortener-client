import { UrlHandlingStrategy } from '@angular/router';

export interface UrlData {
  _id: string;
  url: string;
  slug: string;
  domain: string;
  clicks: number;
  shortUrl?: string;
  __v: number;
}

export interface UrlQueryData {
  results: UrlData[];
  count: number;
}

export interface ClicksByDate {
  date: string;
  clicks: number;
}
