export interface User {
    user_id: number,
    username: string,
    discriminator: number,
    avatar: string
}

export interface Post {
    user: User,
    id: number,
    title: string,
    description: string,
    created_at: string,
    modified_at: string,
    likes: User[] | null,
    liked: boolean

}