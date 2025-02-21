export interface Activity {
    title: string,
    description?: string,
    status: boolean,
    created_at?: Date,
    updated_at: Date;
    _id?: string
}