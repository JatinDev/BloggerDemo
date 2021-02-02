import { Action } from "@ngrx/store";
import { IBlog } from "../model/Blog";


export enum EnumBlogAction {
    GetAllBlog = '[Blog] GetAllBlog',
    AddBlog = '[Blog] AddBlog',
    DeleteBlog = '[Blog] DeleteBlog',
    EditBlog = '[Blog] EditBlog'
}

export class GetAllBlogAction implements Action {
    type = EnumBlogAction.GetAllBlog;
    constructor(public payload = null) { }
}

export class AddBlogAction implements Action {
    type = EnumBlogAction.AddBlog;
    constructor(public payload: IBlog) { }
}

export class DeleteBlogAction implements Action {
    type = EnumBlogAction.DeleteBlog;
    constructor(public payload: string) { }
}

export class EditBlogAction implements Action {
    type = EnumBlogAction.EditBlog;
    constructor(public payload: IBlog) { }
}

export type BlogActions = GetAllBlogAction | AddBlogAction | DeleteBlogAction;