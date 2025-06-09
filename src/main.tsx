import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import FormBuilderPage from './pages/FormBuilderPage'
import TableDemoPage from './pages/TableDemoPage'
import TableBuilderPage from './pages/TableBuilderPage'
import FormDisplayDemo from './pages/FormDisplayDemo'
import AdvancedTableDemo from './pages/AdvancedTableDemo'
import BulkEditTableDemo from './pages/BulkEditTableDemo'
import ApiFormDemo from './pages/ApiFormDemo'
import Layout from './components/Layout'

const isProd = import.meta.env.MODE === "production";
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: '/form-builder',
    element: (
      <Layout>
        <FormBuilderPage />
      </Layout>
    ),
  },
  {
    path: '/table-demo',
    element: (
      <Layout>
        <TableDemoPage />
      </Layout>
    ),
  },
  {
    path: '/table-builder',
    element: (
      <Layout>
        <TableBuilderPage />
      </Layout>
    ),
  },
  {
    path: '/form-display-demo',
    element: (
      <Layout>
        <FormDisplayDemo />
      </Layout>
    ),
  },
  {
    path: '/advanced-table-demo',
    element: (
      <Layout>
        <AdvancedTableDemo />
      </Layout>
    ),
  },
  {
    path: '/bulk-edit-table-demo',
    element: (
      <Layout>
        <BulkEditTableDemo />
      </Layout>
    ),
  },
  {
    path: '/api-form-demo',
    element: (
      <Layout>
        <ApiFormDemo />
      </Layout>
    ),
  },
  {
    path: '/registration-confirmation',
    element: (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Registration Complete!</h1>
            <p className="text-gray-600 mb-6">Thank you for registering for the event. We've sent a confirmation email with all the details.</p>
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    ),
  },
], {
  basename: isProd ? "/react-dynamic-forms" : undefined,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
