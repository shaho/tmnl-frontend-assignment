import { Route, Routes } from 'react-router-dom'
import { Layout } from './components'

import { AlertPage } from './pages/alert'
import { AlertsPage } from './pages/alerts'
import { AddAlertPage } from './pages/add-alert'

import './styles.css'

export function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1 className="text-2xl font-semibold">Home Page</h1>
            </div>
          }
        />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/alerts/new" element={<AddAlertPage />} />
        <Route path="/alerts/:id" element={<AlertPage />} />
      </Routes>
    </Layout>
  )
}

export default App
