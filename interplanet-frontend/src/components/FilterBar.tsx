import { useState, type FC } from 'react'
import { Button, Col, Collapse, Form, Row } from 'react-bootstrap'
import {
  DEFAULT_FILTERS,
  RANGE_MAX,
  RANGE_MIN,
  SORT_OPTIONS,
  type Filters,
  type SortKey,
} from '../modules/filters'
import './FilterBar.css'

interface Props {
  filters: Filters
  onChange: (next: Filters) => void
}

export const FilterBar: FC<Props> = ({ filters, onChange }) => {
  const [open, setOpen] = useState(false)
  const patch = (part: Partial<Filters>) => onChange({ ...filters, ...part })

  return (
    <Form className="topBar" onSubmit={(e) => e.preventDefault()}>
      <div className="sliderRow">
        <div className="sliderBlock">
          <Form.Label htmlFor="range_min" className="sliderLabel">
            <span>Мин. расстояние:</span>
            <span className="sliderValue">{filters.rangeMin} св. лет</span>
          </Form.Label>
          <Form.Range
            id="range_min"
            className="rangeSlider"
            min={RANGE_MIN}
            max={RANGE_MAX}
            step={1}
            value={filters.rangeMin}
            onChange={(e) => patch({ rangeMin: Math.min(Number(e.target.value), filters.rangeMax) })}
          />

          <Form.Label htmlFor="range_max" className="sliderLabel">
            <span>Макс. расстояние:</span>
            <span className="sliderValue">{filters.rangeMax} св. лет</span>
          </Form.Label>
          <Form.Range
            id="range_max"
            className="rangeSlider"
            min={RANGE_MIN}
            max={RANGE_MAX}
            step={1}
            value={filters.rangeMax}
            onChange={(e) => patch({ rangeMax: Math.max(Number(e.target.value), filters.rangeMin) })}
          />
        </div>

        <Button
          type="button"
          className="funnelBtn"
          aria-label="Фильтр"
          aria-expanded={open}
          aria-controls="filter-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <img src="/img/Icon-filter.png" alt="" />
        </Button>
      </div>

      <Collapse in={open}>
        <div id="filter-panel">
          <div className="filterPanel">
            <Form.Group className="mb-2" controlId="filter-name">
              <Form.Label className="panelLabel">Название</Form.Label>
              <Form.Control
                className="filterControl"
                type="search"
                placeholder="Например, Сириус"
                value={filters.query}
                onChange={(e) => patch({ query: e.target.value })}
              />
            </Form.Group>

            <Row className="g-2 mb-2">
              <Col xs={5}>
                <Form.Group controlId="filter-date">
                  <Form.Label className="panelLabel">Опубликовано с</Form.Label>
                  <Form.Control
                    className="filterControl"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => patch({ dateFrom: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col xs={7}>
                <Form.Group controlId="filter-sort">
                  <Form.Label className="panelLabel">Сортировка</Form.Label>
                  <Form.Select
                    className="filterSelect"
                    value={filters.sort}
                    onChange={(e) => patch({ sort: e.target.value as SortKey })}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.key} value={o.key}>
                        {o.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Button className="resetBtn w-100" onClick={() => onChange(DEFAULT_FILTERS)}>
              Сбросить фильтр
            </Button>
          </div>
        </div>
      </Collapse>
    </Form>
  )
}
