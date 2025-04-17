import { Box, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const Transactions = () => {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    interface HistoryData {
        date: string;
        customerId: string;
        amount: number;
        ayHaga: number;
        ayHaga2: number;
    }

    interface RowData {
        name: string;
        calories: number;
        fat: number;
        carbs: number;
        protein: number;
        price: number;
        history: HistoryData[];
        id: number;
    }

    const createData = (
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
        price: number,
        id: number
    ): RowData => {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
            price,
            history: [
                { date: '', customerId: '11091700', amount: 3, ayHaga: 555, ayHaga2: 'Apple iPhone 16' },
            ],
            id
        };
    };


    const ClientsData: React.FC<{ row: RowData }> = ({ row }) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <TableRow>
                    <TableCell align="center">
                        {/* <IconButton size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton> */}
                    </TableCell>
                    <TableCell align='center'>
                        <span style={{
                            display: 'flex',

                            padding: '7px',
                            // color: 'rgba(255, 198, 0, 1)',
                            fontWeight: 'bold',
                            flexDirection: 'column'

                        }}>

                            <small>
                                {row.name}
                            </small>

                        </span>


                    </TableCell>
                    <TableCell align="center"> <span > {row.calories} </span>   </TableCell>
                    <TableCell align="center"
                        sx={{
                            color: 'rgba(255, 198, 0, 1)',
                            fontWeight: 'bold'
                        }}
                    > قيد الانتظار </TableCell>
                    <TableCell align="center">
                        {/* <DeleteIcon />
                        <LockIcon sx={{ margin: '0 10px' }} />
                        <BorderColorIcon /> */}

                        25 ابريل 2025

                    </TableCell>
                    <TableCell align="center">
                        $2,564
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bolder' }} align="center">
                        #5089
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bolder' }} align="center">

                        <span>
                            <img src="/assets/imgs/trash.svg" alt="" />
                        </span>

                        <span>
                            <img src="/assets/imgs/lock.svg"
                                style={{
                                    margin: '0 7px'
                                }}
                                alt="" />
                        </span>

                        <span>
                            <img src="/assets/imgs/edit.svg" alt="" />
                        </span>

                    </TableCell>
                </TableRow>
                <TableRow>
                    {/* <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow  >
                                            <TableCell sx={{
                                                color: 'rgba(139, 144, 154, 1)',
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }} align="center">PRINT <img src="/assets/imgs/fluent_print-24-filled.svg" alt="" /> </TableCell>
                                            <TableCell sx={{
                                                color: 'rgba(139, 144, 154, 1)'
                                            }} align="center">TOTAL</TableCell>
                                            <TableCell sx={{
                                                color: 'rgba(139, 144, 154, 1)'
                                            }} align="center">DISC</TableCell>
                                            <TableCell sx={{
                                                color: 'rgba(139, 144, 154, 1)'
                                            }} align="center">QTY</TableCell>
                                            <TableCell sx={{
                                                color: 'rgba(139, 144, 154, 1)'
                                            }} align="center">PRICE</TableCell>
                                            <TableCell sx={{
                                                color: 'rgba(139, 144, 154, 1)'
                                            }} align="center">NAME</TableCell>
                                            <TableCell sx={{
                                                color: 'rgba(139, 144, 154, 1)'
                                            }} align="center">SKU</TableCell>
                                            <TableCell sx={{
                                                color: 'rgba(139, 144, 154, 1)'
                                            }} align="center">#</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <>
                                                <TableRow key={historyRow.date}>
                                                    <TableCell align="center"> <img style={{ cursor: 'pointer' }} src="/assets/imgs/solar_menu-dots-bold.svg" alt="" /> </TableCell>
                                                    <TableCell align="center">${historyRow.customerId}</TableCell>
                                                    <TableCell sx={{ color: 'red' }} align="center">{historyRow.amount}%</TableCell>
                                                    <TableCell align="center">x{historyRow.ayHaga}</TableCell>
                                                    <TableCell align="center">$500255</TableCell>
                                                    <TableCell align="center">{historyRow.ayHaga2}</TableCell>
                                                    <TableCell align="center"> #877 </TableCell>
                                                    <TableCell align="center">
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>

                                                    <TableCell align="center"> </TableCell>
                                                    <TableCell align="center">$2526 </TableCell>
                                                    <TableCell > </TableCell>
                                                    <TableCell align="center"> Subtotal </TableCell>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center">  </TableCell>
                                                    <TableCell align="center">
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>

                                                    <TableCell align="center"> </TableCell>
                                                    <TableCell align="center">$10</TableCell>
                                                    <TableCell > </TableCell>
                                                    <TableCell align="center"> Shipping </TableCell>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center">  </TableCell>
                                                    <TableCell align="center">
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>

                                                    <TableCell align="center"> </TableCell>
                                                    <TableCell align="center">$150</TableCell>
                                                    <TableCell > </TableCell>
                                                    <TableCell align="center"> Discount </TableCell>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center">  </TableCell>
                                                    <TableCell align="center">
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>

                                                    <TableCell align="center"> </TableCell>
                                                    <TableCell align="center">$250000</TableCell>
                                                    <TableCell > </TableCell>
                                                    <TableCell align="center"> Total </TableCell>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center">  </TableCell>
                                                    <TableCell align="center">
                                                    </TableCell>
                                                </TableRow>
                                            </>

                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell> */}
                </TableRow>
            </>
        );
    };


    const rows: RowData[] = [
        createData('احمد المنفي', 'فودافون كاش', 6.0, 'احمد محمد رضا', 'منذ دقيقتين', 3.99, 989),
        createData('احمد المنفي', 'فودافون كاش', 16.0, 'احمد محمد رضا', 'منذ دقيقتين', 3.79, 989),
        createData('احمد المنفي', 'فودافون كاش', 3.7, 'احمد محمد رضا', 'منذ دقيقتين', 2.5, 989),
        createData('احمد المنفي', 'فودافون كاش', 16.0, 'احمد محمد رضا', 'منذ دقيقتين', 1.5, 989),
    ];




    return (
        <>
            <Box sx={{
                margin: '20px 0', paddingRight: '25px',
                backgroundColor: '', width: 'fit-content',
                position: 'relative'
            }}>
                <input style={{
                    border: 'none',
                    padding: '7px',
                }}
                    type="text" placeholder='بحث'
                />
                <SearchIcon sx={{
                    position: 'absolute',
                    left: '5%',
                    top: '21%'
                }} />
            </Box>

            <Box sx={{
                padding: '0 20px'
            }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead >
                            <TableRow>
                                <TableCell />
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align='center'> اسم العميل  </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center"> طريقة الدفع </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center"> الحالة </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center"> التاريخ </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center"> الكل  </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center"> ID  </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center">   </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                <ClientsData key={row.id} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            direction: 'ltr'
                        }}
                    />
                </TableContainer>
            </Box>
        </>
    )
}

export default Transactions