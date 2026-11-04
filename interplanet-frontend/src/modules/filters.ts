import type { PlanetPair } from './types'

// Границы ползунков расстояния из шаблона ЛР1
export const RANGE_MIN = 1
export const RANGE_MAX = 500000

export type SortKey =
  | 'date_asc'
  | 'date_desc'
  | 'name_asc'
  | 'name_desc'
  | 'distance_asc'
  | 'distance_desc'

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'date_asc', label: 'Сначала старые' },
  { key: 'date_desc', label: 'Сначала новые' },
  { key: 'name_asc', label: 'Названия А-Я' },
  { key: 'name_desc', label: 'Названия Я-А' },
  { key: 'distance_asc', label: 'Сначала ближайшие' },
  { key: 'distance_desc', label: 'Сначала дальнейшие' },
]

export interface Filters {
  query: string // подстрока в названии
  rangeMin: number // расстояние от
  rangeMax: number // расстояние до
  dateFrom: string // 'YYYY-MM-DD' или '' (без ограничения)
  sort: SortKey
}

export const DEFAULT_FILTERS: Filters = {
  query: '',
  rangeMin: RANGE_MIN,
  rangeMax: RANGE_MAX,
  dateFrom: '',
  sort: 'date_asc',
}

export function applyFilters(items: PlanetPair[], f: Filters): PlanetPair[] {
  const query = f.query.trim().toLowerCase()
  const from = f.dateFrom ? Date.parse(f.dateFrom) : -Infinity

  const filtered = items.filter(
    (p) =>
      p.status === 'published' &&
      p.name.toLowerCase().includes(query) &&
      p.distance >= f.rangeMin &&
      p.distance <= f.rangeMax &&
      Date.parse(p.forming_time) >= from,
  )

  const [field, dir] = f.sort.split('_') as ['date' | 'name' | 'distance', 'asc' | 'desc']
  const sign = dir === 'asc' ? 1 : -1

  return filtered.sort((a, b) => {
    switch (field) {
      case 'name':
        return a.name.localeCompare(b.name, 'ru') * sign
      case 'distance':
        return (a.distance - b.distance) * sign
      case 'date':
        return (Date.parse(a.forming_time) - Date.parse(b.forming_time)) * sign
    }
  })
}
