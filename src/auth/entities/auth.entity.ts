export interface Auth {
    email: string,
    username: string,
    password: string,
    created_at?: Date,
    updated_at: Date;
    _id?: string
}