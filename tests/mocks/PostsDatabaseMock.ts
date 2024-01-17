import { PostDB } from "../../src/models/Post";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const postsMock: PostDB[] = [
  {
    id: 'eadcdc2b-59bc-4794-8c57-21690a6cf040',
    creator_id: '86f87c46-af7b-41b7-b92e-a39605b9e32a',
    content: 'Este post é um mock para teste unitário',
    likes: 1,
    dislikes: 2,
    comments: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'add2fd02-643f-4440-a79c-4ef92d730dfb',
    creator_id: '86f87c46-af7b-41b7-b92e-a39605b9e32a',
    content: 'Este post é outro mock para teste unitário',
    likes: 1,
    dislikes: 2,
    comments: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export class PostsDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts"

  public async findPosts(
    q: string | undefined
  ): Promise<PostDB[]> {
    if (q) {
      return postsMock
        .filter((post) => post.name.toLocaleLowerCase()
          .includes(q.toLocaleLowerCase()))

    } else {
      return postsMock
    }
  }

  public async findPostById(
    id: string
  ): Promise<PostDB | undefined> {
    return postsMock.filter(post => post.id === id)[0]
  }

}