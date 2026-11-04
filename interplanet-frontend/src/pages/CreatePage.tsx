import type { FC } from 'react'
import { Form } from 'react-bootstrap'
import { MediaField } from '../components/MediaField'
import { DEFAULT_PHOTO, DEFAULT_VIDEO } from '../modules/media'
import './CreatePage.css'

const CreatePage: FC = () => (
  <div className="createPage">
    <Form onSubmit={(e) => e.preventDefault()}>
      <div className="media-section">
        <MediaField id="photo" label="Фото:" accept="image/*" kind="photo" defaultSrc={DEFAULT_PHOTO} />
        <MediaField id="video" label="Видео:" accept="video/*" kind="video" defaultSrc={DEFAULT_VIDEO} />
      </div>

      <div className="fields-section">
        <Form.Group className="field-group" controlId="planet_start">
          <Form.Label className="field-label">Планета-отправитель:</Form.Label>
          <Form.Control className="field-value" type="text" name="planet_start" placeholder="Введите название" />
        </Form.Group>

        <Form.Group className="field-group" controlId="planet_end">
          <Form.Label className="field-label">Планета-получатель:</Form.Label>
          <Form.Control className="field-value" type="text" name="planet_end" placeholder="Введите название" />
        </Form.Group>

        <Form.Group className="field-group" controlId="distance">
          <Form.Label className="field-label">Расстояние:</Form.Label>
          <Form.Control className="field-value" type="number" name="distance" placeholder="0" />
        </Form.Group>

        <Form.Group className="field-group" controlId="closest_period">
          <Form.Label className="field-label">Период сближения:</Form.Label>
          <Form.Control className="field-value" type="number" name="closest_period" placeholder="0" />
        </Form.Group>

        <Form.Group className="field-group textarea-group" controlId="special_info">
          <Form.Label className="field-label">Доп. информация:</Form.Label>
          <Form.Control
            as="textarea"
            className="field-value textarea-value"
            name="special_info"
            rows={3}
            placeholder="Введите дополнительную информацию..."
          />
        </Form.Group>
      </div>
    </Form>
  </div>
)

export default CreatePage
