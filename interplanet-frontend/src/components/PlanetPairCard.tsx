import type { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { PlanetPair } from '../modules/types'
import { onPhotoError, photoOf } from '../modules/media'
import { ROUTES } from '../Routes'
import './PlanetPairCard.css'

interface Props {
  pair: PlanetPair
}

export const PlanetPairCard: FC<Props> = ({ pair }) => (
  <Link to={`${ROUTES.FEED}/${pair.id}`} className="pairLink">
    <Card className="pairCard">
      <Card.Body>
        <Card.Img className="pairImage" src={photoOf(pair)} alt={pair.name} onError={onPhotoError} />
        <Card.Title className="pairTitle">{pair.name}</Card.Title>
        <Card.Text as="div" className="pairInfo">
          <div>Расстояние: {pair.distance}</div>
          <div>Сближение: {pair.period} лет</div>
        </Card.Text>
        <div className="pairFooter">
          <img src="/img/Icon-heart.png" alt="like" />
          <span className="pairColon">:</span>
          <div className="pairLikes">{pair.like_count}</div>
        </div>
      </Card.Body>
    </Card>
  </Link>
)
