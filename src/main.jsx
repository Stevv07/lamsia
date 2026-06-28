import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AppLayout from '@/components/app-layout.jsx'
import { JadwalObat } from '@/jadwalObat.jsx'
import { BerandaDashboard } from './LamsiaDashboard'
import { DataObat } from '@/daftarObat.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <BerandaDashboard  />
      },
      {
        path: "jadwal",
        element: <JadwalObat />
      },
      {
        path: "obat",
        element: <DataObat/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
