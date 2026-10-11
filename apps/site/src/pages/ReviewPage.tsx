import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../components/useTitle.ts'
import { checkAnswer, grade, reviewQueue, type ReviewItem } from '../progress/review.ts'
import { getProgress, useProgress } from '../progress/store.ts'

export function ReviewPage() {
  useTitle('Повторение')
  const progress = useProgress()
  // Очередь фиксируется в начале сессии, чтобы карточки не прыгали после ответа.
  const [session, setSession] = useState(() => buildSession())
  const [index, setIndex] = useState(0)
  const item = session[index]
  const openedLessons = Object.keys(progress.lessons).length

  const nextCard = () => setIndex((i) => i + 1)
  const restart = () => {
    setSession(buildSession())
    setIndex(0)
  }

  return (
    <div className="page">
      <h1>Повторение</h1>
      <p>
        Карточки по шпаргалкам открытых уроков. Интервал растёт, если вы помните ответ: 1, 3, 7, 16, 35 и 90 дней.
        Забытая карточка возвращается в начало. Новых карточек — не больше 10 в день.
      </p>
      {openedLessons === 0 ? (
        <p className="alert">
          Карточки появятся, когда вы откроете первый урок. <Link to="/">Перейти к курсу</Link>.
        </p>
      ) : item ? (
        <>
          <p className="muted" role="status">
            Карточка {index + 1} из {session.length}
          </p>
          <ReviewCard key={item.key + index} item={item} onDone={nextCard} />
        </>
      ) : (
        <div className="review-card">
          <p className="review-card__front">На сегодня всё повторено.</p>
          <p className="muted">Возвращайтесь завтра: карточки придут по расписанию.</p>
          <button type="button" className="button" onClick={restart}>
            Проверить ещё раз
          </button>
        </div>
      )}
    </div>
  )
}

function buildSession(): ReviewItem[] {
  const { due, fresh } = reviewQueue(getProgress())
  return [...due, ...fresh]
}

function ReviewCard({ item, onDone }: { item: ReviewItem; onDone: () => void }) {
  const { card } = item
  const [revealed, setRevealed] = useState(false)
  const [input, setInput] = useState('')
  const typed = card.answer !== undefined
  const correct = useMemo(() => (revealed && typed ? checkAnswer(card, input) : undefined), [revealed, typed, card, input])

  const answer = (remembered: boolean) => {
    grade(item, remembered)
    onDone()
  }

  return (
    <div className="review-card">
      <p className="muted">{item.lessonTitle}</p>
      <p className="review-card__front">{card.front}</p>
      {typed && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setRevealed(true)
          }}
        >
          <label htmlFor="review-answer">Наберите ответ по памяти</label>
          <input
            id="review-answer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            readOnly={revealed}
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
          {!revealed && (
            <button type="submit" className="button button--primary">
              Проверить
            </button>
          )}
        </form>
      )}
      {!typed && !revealed && (
        <button type="button" className="button button--primary" onClick={() => setRevealed(true)} autoFocus>
          Показать ответ
        </button>
      )}
      {revealed && (
        <div role="status">
          {correct !== undefined && (
            <p className={correct ? 'badge badge--ok' : 'badge badge--warn'}>{correct ? '✓ Верно' : '✗ Не совпало'}</p>
          )}
          <pre>
            <code>{card.back}</code>
          </pre>
          {typed ? (
            <button type="button" className="button button--primary" onClick={() => answer(Boolean(correct))} autoFocus>
              Дальше
            </button>
          ) : (
            <div className="row">
              <button type="button" className="button" onClick={() => answer(false)}>
                Не вспомнил
              </button>
              <button type="button" className="button button--primary" onClick={() => answer(true)} autoFocus>
                Помню
              </button>
            </div>
          )}
          {typed && !correct && (
            <p className="muted">
              Если ответ верный, но записан иначе,{' '}
              <button type="button" className="button button--small" onClick={() => answer(true)}>
                засчитать
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
