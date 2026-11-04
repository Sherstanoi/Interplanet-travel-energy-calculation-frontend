export interface PlanetPair {
  id: number
  name: string
  description: string
  status: 'draft' | 'published'
  photo_url: string
  video_url: string
  distance: number // световые годы
  period: number // период сближения, годы
  creation_time: string
  forming_time: string
  creator_id: number
  like_count: number
}
