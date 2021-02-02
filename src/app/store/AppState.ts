import { IBlog } from "../model/Blog";

export interface AppState {
    Blogs: BlogState;
}

export interface BlogState {
    Blogs: IBlog[]
}