import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IBlog } from 'src/app/model/Blog';
import { CommonService } from 'src/app/services/common.service';
import { AppState } from 'src/app/store/AppState';
import { DeleteBlogAction } from 'src/app/store/blogAction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>, private commonService: CommonService) { }

  allBlogs: IBlog[] = [];

  ngOnInit(): void {
    //get the data from store
    this.store.subscribe(res => {
      if (res && res.Blogs && res.Blogs.Blogs) {
        this.allBlogs = res.Blogs.Blogs
      }
    })

  }

  NavigateToBlogAddEdit() {
    // push the blogId to undefined just for safe side, because we are using same page for add edit
    this.commonService.BlogId$.next(undefined);
    this.router.navigateByUrl('/add');
  }

  ActionAddEdit(id, type) {
    //edit    
    if (type == 1) {
      this.commonService.BlogId$.next(id);
      //redirecting after 0.5 sec to let the value set on edit page
      setTimeout(() => {
        this.router.navigateByUrl('/add');
      }, 500);

    }
    //delete
    else {
      // confirm and remove the object from store
      if (confirm("Are you sure to delete this blog?")) {
        this.store.dispatch(new DeleteBlogAction(id));
      }
    }
  }

  OrberByChange(event: number) {
    // call eveny time when dropdown change with value
    if (event == 1)
      this.allBlogs = this.allBlogs.slice().sort((a, b) => a.createdOn.getTime() > b.createdOn.getTime() ? -1 : 1);
    else
      this.allBlogs = this.allBlogs.slice().sort((a, b) => a.createdOn.getTime() < b.createdOn.getTime() ? -1 : 1);
  }

}
