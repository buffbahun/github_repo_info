import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RepoFetchService } from '../repo-fetch.service';
import { Query } from './query.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  resObj: any;
  currentPage = 0;
  totalPages = 0;

  searchForm: FormGroup;

  resultPerPage = [10, 25, 50];

  sortQuries = ['stars', 'forks', 'help-wanted-issues', 'updated'];
  sortOrders = ['decs', 'asc']

  constructor(public fb: FormBuilder, public _service: RepoFetchService, public router: Router) { 
    this.searchForm = fb.group({
      keyword: [''],
      sortQuery: [this.sortQuries[0]],
      sortOrder: [this.sortOrders[0]],
      pagination: [this.resultPerPage[0]]
    });
 
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe(vals => {
      this.queryOnChange(vals);
    });
  }

  queryOnChange(formValue: Query, page = 1) {
    if(formValue.keyword === "") {
      this.resObj = null;
      return;
    }

    this._service.getRepo(formValue, page)
    .subscribe(res => {
      this.resObj = res;
    }, err => {
      this.resObj = null;
      console.error(err);
    }, () => {
      this.updateTotalPages();
    });
  }

  updateTotalPages() {
    if(this.resObj === null || this.resObj.items.length <= 0) {
      this.totalPages = 0;
      this.currentPage = 0;
      return;
    }
 
    let totalRepos = this.resObj.total_count;
    let rowLength = this.searchForm.get("pagination")?.value;
    this.totalPages = Math.ceil(totalRepos / rowLength);
    this.currentPage = this.currentPage <= 0 ? 1 : this.currentPage;
  }

  onPaginate(isRight: boolean) {
    if(this.totalPages <= 0) {
      return;
    }

    if(isRight && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.queryOnChange(this.searchForm.value, this.currentPage);
      return;
    }
    if(!isRight && this.currentPage > 1) {
      this.currentPage--;
      this.queryOnChange(this.searchForm.value, this.currentPage);
      return;
    }
  }

  onDetail(repo: any) {
    const repoUrl = repo.url;
    const userUrl = repo.owner.url;

    this.router.navigate(['/detail-page'], 
      {state: {repoUrl, userUrl}});
  }

}
