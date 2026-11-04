import type { SyntheticEvent } from 'react'
import type { PlanetPair } from './types'

export const DEFAULT_PHOTO = '/default/photo.png'
export const DEFAULT_VIDEO = '/default/video.mp4'

export const photoOf = (p: PlanetPair): string => p.photo_url || DEFAULT_PHOTO
export const videoOf = (p: PlanetPair): string => p.video_url || DEFAULT_VIDEO

export const onPhotoError = (e: SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget
  if (!img.src.endsWith(DEFAULT_PHOTO)) {
    img.src = DEFAULT_PHOTO
  }
}
