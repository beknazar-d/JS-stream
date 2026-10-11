import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { LessonPage } from './pages/LessonPage.tsx'
import { ModulePage } from './pages/ModulePage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { ProgressPage } from './pages/ProgressPage.tsx'
import { ReviewPage } from './pages/ReviewPage.tsx'
import { TaskPage } from './pages/TaskPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path=":moduleSlug" element={<ModulePage />} />
        <Route path=":moduleSlug/:lessonSlug" element={<LessonPage />} />
        <Route path=":moduleSlug/:lessonSlug/:taskSlug" element={<TaskPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
