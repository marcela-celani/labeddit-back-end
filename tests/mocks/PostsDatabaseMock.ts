import {
  LikeDislikeDB,
  POST_LIKES,
  PostDB,
  PostDBWithCreatorName,
} from "../../src/models/Post";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const postsMock: PostDB[] = [
  {
    id: "eadcdc2b-59bc-4794-8c57-21690a6cf040",
    creator_id: "id-mock-user",
    content: "Este post é um mock para teste unitário",
    likes: 1,
    dislikes: 2,
    comments: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "add2fd02-643f-4440-a79c-4ef92d730dfb",
    creator_id: "id-mock-user",
    content: "Este post é outro mock para teste unitário",
    likes: 1,
    dislikes: 2,
    comments: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const postsMockWithCreatorName: PostDBWithCreatorName[] = [
  {
    id: "eadcdc2b-59bc-4794-8c57-21690a6cf040",
    creator_id: "id-mock-user",
    content: "Este post é um mock para teste unitário",
    likes: 1,
    dislikes: 2,
    comments: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    creator_name: "user",
  },
  {
    id: "add2fd02-643f-4440-a79c-4ef92d730dfb",
    creator_id: "id-mock-user",
    content: "Este post é outro mock para teste unitário",
    likes: 1,
    dislikes: 2,
    comments: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    creator_name: "user",
  },
];

const likesDislikesMock: LikeDislikeDB[] = [
  {
    user_id: "user1",
    post_id: "post1",
    like: 1,
  },
  {
    user_id: "user2",
    post_id: "post1",
    like: 0,
  },
];

export class PostsDatabaseMock extends BaseDatabase {
  public static TABLE_POSTS = "posts";
  public static TABLE_LIKES_DISLIKES_POSTS = "likes_dislikes_posts";

  public async insertPost(postDB: PostDB): Promise<void> {
    postsMock.push(postDB);
  }

  public async updateCommentNumber(postId: string): Promise<void> {
    const index = postsMock.findIndex((post) => post.id === postId);

    if (index !== -1) {
      postsMock[index].comments + 1;

      const updatePost = postsMock.splice(index, 1)[0];
      postsMock.splice(index, 0, updatePost);
    }
  }

  public async findLikeDislike(
    likeDislikeDB: LikeDislikeDB
  ): Promise<POST_LIKES | undefined> {
    const [likeDislike] = likesDislikesMock.filter(
      (like) =>
        like.user_id === likeDislikeDB.user_id &&
        like.post_id === likeDislikeDB.post_id
    );

    if (likeDislike === undefined) {
      return undefined;
    } else if (likeDislike.like === 1) {
      return POST_LIKES.LIKED;
    } else {
      return POST_LIKES.DISLIKED;
    }
  }

  public async updatePost(postDB: PostDB): Promise<void> {
    const index = postsMock.findIndex((post) => post.id === postDB.id);
    if (index !== -1) {
      const updatePost = postsMock.splice(index, 1)[0];
      postsMock.splice(index, 0, updatePost);
    }
  }

  public async deletePostById(id: string): Promise<void> {
    const index = postsMock.findIndex((post) => post.id === id);
    if (index !== -1) {
      postsMock.splice(index, 1);
    }
  }

  public async findPostById(id: string): Promise<PostDB | undefined> {
    return postsMock.find((post) => post.id === id);
  }

  public getPostsWithCreatorName = async (): Promise<
    PostDBWithCreatorName[]
  > => {
    return postsMockWithCreatorName;
  };

  public async findPostWithCreatorNameById(
    id: string
  ): Promise<PostDBWithCreatorName | undefined> {
    const result = postsMockWithCreatorName.find((post) => post.id === id);
    return result;
  }

  public async removeLikeDislike(likeDislikeDB: LikeDislikeDB): Promise<void> {
    const index = likesDislikesMock.findIndex(
      (like) =>
        like.user_id === likeDislikeDB.user_id &&
        like.post_id === likeDislikeDB.post_id
    );
    if (index !== -1) {
      likesDislikesMock.splice(index, 1);
    }
  }

  public async updateLikeDislike(likeDislikeDB: LikeDislikeDB): Promise<void> {
    const index = likesDislikesMock.findIndex(
      (like) =>
        like.user_id === likeDislikeDB.user_id &&
        like.post_id === likeDislikeDB.post_id
    );
    if (index !== -1) {
      const updatePost = likesDislikesMock.splice(index, 1)[0];
      likesDislikesMock.splice(index, 0, updatePost);
    }
  }

  public async insertLikeDislike(likeDislikeDB: LikeDislikeDB): Promise<void> {
    likesDislikesMock.push(likeDislikeDB);
  }
}
