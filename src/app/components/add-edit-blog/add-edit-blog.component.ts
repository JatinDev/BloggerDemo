import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IBlog } from 'src/app/model/Blog';
import { AddBlogAction, EditBlogAction } from 'src/app/store/blogAction';
import { AppState } from 'src/app/store/AppState';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.css']
})
export class AddEditBlogComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>, private router: Router, private commonService: CommonService) { }

  form: FormGroup;
  Saving: boolean;
  currentDate = new Date();
  unSubscribe = new Subject<void>();
  isEdit: boolean;
  editBlogId: string;

  ngOnInit(): void {
    // blank the form
    this.intialState();

    // get the blogId if user is coming for edit.
    this.commonService.BlogId$.pipe(takeUntil(this.unSubscribe)).subscribe(val => {
      // execute only if value if there
      if (val) {
        this.editBlogId = val;
        //get the data from store to fetch the exact object from array to fill the form
        this.store.pipe(takeUntil(this.unSubscribe)).subscribe(res => {
          if (res && res.Blogs && res.Blogs.Blogs) {
            let editBlog = res.Blogs.Blogs.find(x => x.blogId == val);
            if (editBlog) {
              // setting form value if we found on array
              this.form.patchValue({
                blogName: editBlog.blogName,
                blogDescription: editBlog.blogDescription
              });
              this.isEdit = true;
            }
          }
        })
      }
    })
  }

  onSubmit() {
    this.Saving = true;
    let obj: IBlog = {
      blogId: UUID.UUID().toString(),
      blogDescription: this.form.controls['blogDescription'].value,
      blogName: this.form.controls['blogName'].value,
      createdOn: new Date()
    }

    // if user is editing the blog
    if (this.isEdit) {
      obj.blogId = this.editBlogId;
      this.store.dispatch(new EditBlogAction(obj));
    }
    // user creating new blog
    else
      this.store.dispatch(new AddBlogAction(obj));

    // just to show the spinner
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2000);

  }

  intialState() {
    this.form = new FormGroup({
      "blogName": new FormControl("", Validators.required),
      "blogDescription": new FormControl("", Validators.required),
    });
  }

  ngOnDestroy(): void {
    // unsusbribe if comp is destroy, save from memory leakage
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

}
