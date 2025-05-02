export interface Festival {
    _id: string
    name: string
    description: string
    startDate: string
    endDate: string
    location: string
    image: string
    artists: Artist[]
    stages: string[]
}

export interface Artist {
    _id: string
    name: string
    bio: string
    genre: string
    country: string
    image: string
}