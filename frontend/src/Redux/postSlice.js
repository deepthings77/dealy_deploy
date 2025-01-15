import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
    name:'post',
    initialState:{
        posts:[],
        selectedPost:null,
        hasMore: true,
    },
    reducers:{
        //actions
        setPosts:(state,action) => {
            state.posts = action.payload;
        },
        appendPosts: (state, action) => {
            const newPosts = action.payload.posts.filter(
                (newPost) => !state.posts.some((post) => post._id === newPost._id)
              );
              state.posts = [...state.posts, ...newPosts];
              state.hasMore = action.payload.hasMore;
          },
       
        setSelectedPost:(state,action) => {
            state.selectedPost = action.payload;
        },
        clearPosts: (state) => {
            state.posts = [];
            state.hasMore = true;
          },
    }
});
export const {setPosts, appendPosts,setSelectedPost,clearPosts} = postSlice.actions;
export default postSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";
// const postSlice = createSlice({
//     name:'post',
//     initialState:{
//         posts:[],
//         selectedPost:null,
//     },
//     reducers:{
//         //actions
//         setPosts:(state,action) => {
//             state.posts = action.payload;
//         },
//         setSelectedPost:(state,action) => {
//             state.selectedPost = action.payload;
//         }
//     }
// });
// export const {setPosts, setSelectedPost} = postSlice.actions;
// export default postSlice.reducer;