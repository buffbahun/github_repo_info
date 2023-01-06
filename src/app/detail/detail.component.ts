import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { RepoFetchService } from '../repo-fetch.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  repoName: string = '';
  userName: string = '';
  openIssues?: Number;
  defaultBranch: string = '';
  readme: string = '';

  repoGitUrl: string = '';
  userGitUrl: string = '';

  constructor(public _service: RepoFetchService, public router: Router) { 
    let nav = router.getCurrentNavigation();

    if (nav?.extras && nav.extras.state) {
      let repoUrl = nav.extras.state['repoUrl'] ?? '';
      let userUrl = nav.extras.state['userUrl'] ?? '';
      
      if (repoUrl === '' || userUrl === '')
        router.navigate(['']);

      this.getRepoDetail(repoUrl);
      this.getUserDetail(userUrl);
      this.getReadmeContent(repoUrl);
    } else {
      router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }


  getRepoDetail(url: string) {
    this._service.getRepoByUrl(url)
    .subscribe((res: any) => {
      this.repoName = res.name;
      this.openIssues = res.open_issues;
      this.defaultBranch = res.default_branch;

      this.repoGitUrl = res.html_url;
    }, err => {
      this.router.navigate(['']);
    })
  }

  getUserDetail(url: string) {
    this._service.getUserByUrl(url)
    .subscribe((res: any) => {
      this.userName = res.name;

      this.userGitUrl = res.html_url;
    }, err => {
      this.router.navigate(['']);
    })
  }

  getReadmeContent(url: string) {
    this._service.getReadme(url)
    .subscribe((res: any) => {
      const content = atob(res.content);
      this.readme = content;
    });
  }
}
