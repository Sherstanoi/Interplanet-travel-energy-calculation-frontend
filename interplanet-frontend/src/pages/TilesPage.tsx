import { useMemo, useState, type FC } from 'react'
import { FilterBar } from '../components/FilterBar'
import { PlanetPairCard } from '../components/PlanetPairCard'
import { DEFAULT_FILTERS, applyFilters, type Filters } from '../modules/filters'
import { PLANET_PAIRS_MOCK } from '../modules/mock'
import './TilesPage.css'

const TilesPage: FC = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  const items = useMemo(() => applyFilters(PLANET_PAIRS_MOCK, filters), [filters])

  return (
    <div className="tilesPage">
      <FilterBar filters={filters} onChange={setFilters} />

      <div className="tilesList">
        {items.length === 0 && <p className="emptyText">Ничего не найдено</p>}
        {items.map((pair) => (
          <PlanetPairCard key={pair.id} pair={pair} />
        ))}
      </div>
    </div>
  )
}

export default TilesPage
