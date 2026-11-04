import { useState, type FC } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { videoOf } from '../modules/media'
import { PLANET_PAIRS_MOCK } from '../modules/mock'
import { ROUTES } from '../Routes'
import './FeedPage.css'

// Лента: только опубликованные, по возрастанию id (как GET /api/planet-pairs/feed)
const FEED = PLANET_PAIRS_MOCK.filter((p) => p.status === 'published').sort((a, b) => a.id - b.id)

const Description: FC<{ text: string }> = ({ text }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="description">
      <p className={`descriptionText ${expanded ? 'expanded' : ''}`}>{text}</p>
      <Button variant="link" className="moreBtn" onClick={() => setExpanded((v) => !v)}>
        {expanded ? 'Свернуть' : 'Узнать больше'}
      </Button>
    </div>
  )
}

const FeedPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  if (FEED.length === 0) {
    return <div className="feedPage" />
  }

  // нет id или неверный id: показываем первую карточку
  const index = Math.max(0, FEED.findIndex((p) => String(p.id) === id))
  const pair = FEED[index]
  const next = FEED[(index + 1) % FEED.length] // после последней открывается первая

  return (
    <div className="feedPage">
      <div className="videoBg">
        <video key={pair.id} className="bgVideo" src={videoOf(pair)} autoPlay muted loop playsInline />
      </div>

      <div className="feedContent">
        <div className="bottomSection">
          <div className="headerBlock">
            <div className="titleArea">
              <span className="feedTitle">{pair.name}</span>
            </div>

            <div className="iconsBlock">
              <div className="likeBlock">
                <img src="/img/Icon-likes.png" alt="Лайки" className="likeIcon" />
                <span className="likeCount">{pair.like_count}</span>
              </div>
              <Button className="nextBtn" aria-label="Далее" onClick={() => navigate(`${ROUTES.FEED}/${next.id}`)}>
                <img src="/img/Icon-arrow.png" alt="" />
              </Button>
            </div>
          </div>

          <div className="contentBlock">
            <Description key={pair.id} text={pair.description} />

            <div className="infoBlock">
              <div className="infoRow">
                <span className="infoValue">{pair.distance} св.л.</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Период:</span>
                <span className="infoValue">{pair.period} л.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedPage
