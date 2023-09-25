import { TemplateEmail } from '../components/templateStatus'

export const TemplateEmailStatus = ({setAlertsOptions, setOpenAlerts}) => {
  return (
    <>
      <TemplateEmail setAlertsOptions={setAlertsOptions} setOpenAlerts={setOpenAlerts} />
    </>
  )
}
