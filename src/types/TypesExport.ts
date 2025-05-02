export interface Festival {
    _id: string
    name: string
    description: string
    date: string
    location: string
    image: string
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
