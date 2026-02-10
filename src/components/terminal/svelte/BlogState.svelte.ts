export interface Post {
  data: {
    authors?: string[];
    categories?: string[];
    date?: Date | string;
    description?: string;
    tags?: string[];
    title: string;
  };
  id: string;
}

let selectedPost = $state<null | Post>(null);

export const blogState = {
  get selectedPost() {
    return selectedPost;
  },
  set selectedPost(post: null | Post) {
    selectedPost = post;
  },
};
