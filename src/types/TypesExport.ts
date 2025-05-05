export interface Festival {
    _id: string
    name: string
    description: string
    date: string
    location: string
    image: string
    regularPrice: number
    vipPrice: number
    artists: Artist[]
    stages: Stage[]
}

export interface Artist {
    _id: string
    name: string
    bio: string
    genre: string
    country: string
    image: string
    hits: string[]
}

export interface Stage {
    _id: string
    name: string
    capacity: number
    festivalId: Festival
}

export interface Schedule {
    _id: string
    startTime: string
    endTime: string
    festivalId: Festival
    artistId: Artist
    stageId: Stage
}   

export interface User {
    _id: string
    username: string
    email: string
    password: string
    role: string
    name: string
    surname: string
    age: number
    tickets: string[]
}



