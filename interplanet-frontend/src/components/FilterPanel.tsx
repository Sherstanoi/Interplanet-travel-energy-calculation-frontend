import type { FC } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { MAX_DISTANCE } from '../modules/mock'
import { DEFAULT_FILTERS, SORT_LABELS, type Filters, type SortField } from '../modules/filters'

interface Props {
  filters: Filters
  onChange: (next: Filters) => void
}

export const FilterPanel: FC<Props> = ({ filters, onChange }) => {
  const patch = (part: Partial<Filters>) => onChange({ ...filters, ...part })

  return (
    <Form className="mb-3" onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="mb-2" controlId="filter-query">
        <Form.Control
          type="search"
          placeholder="Поиск по названию"
          value={filters.query}
          onChange={(e) => patch({ query: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="filter-min">
        <Form.Label className="d-flex justify-content-between mb-0">
          <span>Расстояние от</span>
          <span>{filters.rangeMin.toLocaleString('ru-RU')} св. л.</span>
        </Form.Label>
        <Form.Range
          min={0}
          max={MAX_DISTANCE}
          value={filters.rangeMin}
          onChange={(e) => patch({ rangeMin: Math.min(Number(e.target.value), filters.rangeMax) })}
        />
      </Form.Group>

      <Form.Group controlId="filter-max">
        <Form.Label className="d-flex justify-content-between mb-0">
          <span>Расстояние до</span>
          <span>{filters.rangeMax.toLocaleString('ru-RU')} св. л.</span>
        </Form.Label>
        <Form.Range
          min={0}
          max={MAX_DISTANCE}
          value={filters.rangeMax}
          onChange={(e) => patch({ rangeMax: Math.max(Number(e.target.value), filters.rangeMin) })}
        />
      </Form.Group>

      <Row className="g-2 mb-2">
        <Col>
          <Form.Select
            aria-label="Сортировка"
            value={filters.sortField}
            onChange={(e) => patch({ sortField: e.target.value as SortField })}
          >
            {(Object.keys(SORT_LABELS) as SortField[]).map((field) => (
              <option key={field} value={field}>
                {SORT_LABELS[field]}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-secondary"
            aria-label="Направление сортировки"
            onClick={() => patch({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' })}
          >
            {filters.sortDir === 'asc' ? '↑' : '↓'}
          </Button>
        </Col>
      </Row>

      <Button variant="outline-primary" size="sm" className="w-100" onClick={() => onChange(DEFAULT_FILTERS)}>
        Сбросить фильтр
      </Button>
    </Form>
  )
}
