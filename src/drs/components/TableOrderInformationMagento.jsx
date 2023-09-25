import { TableRow, TableHead, Table, TableBody, TableCell, TableContainer, Paper, styled, tableCellClasses } from '@mui/material'
import { Links } from '../../components'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#00A1E0',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const TableOrderInformationMagento = ({ logEmailResultResult }) => {
  const rows = [...logEmailResultResult].reverse()
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'white' }}>
      <TableContainer sx={{ maxHeight: 390 }}>
        <Table /* sx={{ minWidth: 650 }} */ size='small' stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align='center'>Template</StyledTableCell>
              <StyledTableCell align='center'>CSR</StyledTableCell>
              <StyledTableCell align='center'>File </StyledTableCell>
              <StyledTableCell align='center'>Shipping/Pickup</StyledTableCell>
              <StyledTableCell align='center'>Delivery Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align='center'>{row.email_log__email_date}</StyledTableCell>
                <StyledTableCell align='center'>{row.email_template__name_template}</StyledTableCell>
                <StyledTableCell align='center'>{row.email_log__csr}</StyledTableCell>
                <StyledTableCell align='center'><Links name={row.email_log__nameFile}/></StyledTableCell>
                <StyledTableCell align='center'>{row.email_log__estimated_shipping_or_pickup_date}</StyledTableCell>
                <StyledTableCell align='center'>{row.email_log__estimated_delivery_date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
