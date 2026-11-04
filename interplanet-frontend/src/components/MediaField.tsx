import { useEffect, useState, type ChangeEvent, type FC } from 'react'
import { Form } from 'react-bootstrap'

interface Props {
  id: string // он же name поля формы: photo или video
  label: string
  accept: string
  kind: 'photo' | 'video'
  defaultSrc: string
}

export const MediaField: FC<Props> = ({ id, label, accept, kind, defaultSrc }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  // освобождаем временную ссылку, когда выбран другой файл или страница закрыта
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl)
    }
  }, [fileUrl])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileUrl(file ? URL.createObjectURL(file) : null)
  }

  const src = fileUrl ?? defaultSrc // файл не выбран: показываем дефолт

  return (
    <div className="media-item">
      <div className="media-header">
        <Form.Label htmlFor={id} className="file-label">
          {label}
        </Form.Label>
        <Form.Control id={id} name={id} className="file-input" type="file" accept={accept} onChange={handleChange} />
      </div>

      <div className={`preview-box preview-${kind}`}>
        {kind === 'photo' ? (
          <img src={src} alt="Предпросмотр фото" />
        ) : (
          <video key={src} src={src} autoPlay loop muted playsInline />
        )}
      </div>
    </div>
  )
}
