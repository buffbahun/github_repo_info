import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Query } from './search/query.model';

const apiUrl = "https://api.github.com/search/repositories";

@Injectable({
  providedIn: 'root'
})
export class RepoFetchService {

  constructor(public _http: HttpClient) { }

  private queryObjToStr(qurryObj: Query, page: number): string {
    return `?q=${qurryObj.keyword}&sort=${qurryObj.sortQuery}&order=${qurryObj.sortOrder}&per_page=${qurryObj.pagination}&page=${page}`;
  }

  getRepo(qurryObj: Query, page: number) {
    const qurStr = this.queryObjToStr(qurryObj, page);
    const fetchApi = apiUrl + qurStr;

    return this._http.get(fetchApi);
  }

  getRepoByUrl(url: string) {
    return this._http.get(url);
  }

  getUserByUrl(url: string) {
    return this._http.get(url);
  }

  getReadme(url: string) {
    return this._http.get(url + '/readme');
  }
}
