import { TableInventory } from '../components/inventory'
export const Inventory = ({setOpenAlerts, setAlertsOptions}) => {
  return (
    <>
      <TableInventory setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions}/>
    </>
  )
}
