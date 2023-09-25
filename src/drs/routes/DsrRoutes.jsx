import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../layout/index'
import { Flagship, Detrack, Dsr, NotFound, Dh1, Accounting, Magento, Links, ProductDie, Producction, TemplateEmailStatus, HistoryIssues, Inventory } from '../pages'
import { MagentoOrderId } from '../../drs/components'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { Alerts } from '../components'

export const DsrRoutes = () => {
  const [openAlerts, setOpenAlerts] = useState(false)
  const [alertsOptions, setAlertsOptions] = useState({})
  return (
    <>
      <Navbar />
      <Toolbar />
      <Container disableGutters maxWidth={false} className='container-layout'>
        <Routes>
          <Route path='dsr' element={<Dsr setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />} />
          <Route path='flagship' element={<Flagship />} />
          <Route path='detrack' element={<Detrack />} />
          <Route path='dh1' element={<Dh1 />} />
          <Route path='magento' element={<Magento />} />
          <Route path='magento/:id/:idwebsite' element={<MagentoOrderId />} />
          <Route path='accounting' element={<Accounting />} />
          <Route path='links' element={<Links setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />} />
          <Route path='product_die' element={<ProductDie setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />} />
          <Route path='producction' element={<Producction />} />
          <Route path='template_email_status' element={<TemplateEmailStatus setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />} />
          <Route path='history_issues' element={<HistoryIssues setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />} />
          <Route path='inventory' element={<Inventory setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />} />

          <Route path='notFound' element={<NotFound />} />
          {/* <Route path='hero/:id' element={<HeroPage />} /> */}
          <Route path='/' element={<Navigate to='/Dsr' />} />
        </Routes>
      </Container>
      <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
    </>
  )
}
