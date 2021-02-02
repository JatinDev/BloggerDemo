import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { BlogActions, EnumBlogAction } from "./blogAction";
import { AppState, BlogState } from "./AppState";

const initialUserState: BlogState = {
    Blogs: []
}

export const blogReducers = (state = initialUserState, action: BlogActions): BlogState => {
    switch (action.type) {
        case EnumBlogAction.GetAllBlog:
            return {
                ...state
            };
        case EnumBlogAction.AddBlog:
            const Blogs = [...state.Blogs,
            action.payload];
            return { Blogs }
        case EnumBlogAction.DeleteBlog:
            const filter = state.Blogs.filter(x => x.blogId != action.payload);
            return {
                ...state,
                Blogs: filter
            };
        case EnumBlogAction.EditBlog:
            let index = state.Blogs.findIndex(x => x.blogId == action.payload.blogId);
            let blogArr;
            if (index != -1) {
                blogArr = state.Blogs.filter(x => x.blogId != action.payload.blogId);
                blogArr.splice(index, 0, action.payload);
            }
            return {
                ...state,
                Blogs: blogArr
            };
        default:
            return state;
    }
}

export const appReducer: ActionReducerMap<AppState> = {
    Blogs: blogReducers
}

export const selectBlog = (state: BlogState) => state.Blogs;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
