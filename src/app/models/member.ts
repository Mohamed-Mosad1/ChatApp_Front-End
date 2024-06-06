export interface Member {
  id: string
  userName: string
  age: number
  photoUrl: string
  knownAs: string
  created: Date
  lastActive: Date
  gender: string
  introduction: string
  lookingFor: string
  interests: string
  city: string
  country: string
  photos: Photo[]
}

export interface Photo {
  id: number
  url: string
  isMain: boolean
}

export interface IUpdateMember {
  introduction: string
  lookingFor: string
  interests: string
  city: string
  country: string
}
