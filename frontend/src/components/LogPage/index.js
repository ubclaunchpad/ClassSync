
import React, { useState } from 'react';
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import Chip from '@mui/material/Chip';
import { Card, CardContent } from '@material-ui/core';
import './index.css'
import { MainContentLayout } from '../MainContentLayout';

const URL = process.env.REACT_APP_API_URL
export default function LogPage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [rows, setRows] = React.useState([])


    React.useEffect(() => {
        fetch(URL + '/tutor/log')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRows(data);
                    console.log(data)
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            })
            .catch(error => console.error('Error:', error));
    }, []);

    function CollapsibleRow({ row }) {
        const [open, setOpen] = useState(false);

        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell align="left">
                        <Chip
                            label={row.action === 0 ? 'Deleted' : 'Created'}
                            style={{
                                backgroundColor: row.action === 0 ? '#ff6347' : '#008000',
                                color: 'white',
                                fontWeight: 'bold',
                                margin: '5px'
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        {new Date(row.time).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </TableCell>

                    <TableCell align="left">
                        {row.tutor + ' ' + (row.action === 0 ? 'deleted' : 'created') + ' appointment with ' + row.student}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>

                            <Card style={{ margin: '10px', borderRadius: '5px' }}>
                                <CardContent>
                                    <Typography>Enrollment: {row.enrollment}</Typography>
                                    <Typography>Event: {new Date(row.event).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</Typography>            <Typography>Tutor ID: {row.tutor_id}</Typography>
                                </CardContent>
                            </Card>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    const currentRows = rows.slice(rowsPerPage * page, rowsPerPage * (page + 1));

    const handleChangePage = (event, newPage) => {
        console.log("New page is ", newPage)
        console.log("Slice ", rowsPerPage * page, " - ", rowsPerPage * (page + 1))
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (
        event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <MainContentLayout>

            <div style={{ position: 'relative' }} className='log-div'>



                <h3 style={{
                    color: '#fff',
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#103da2',
                    borderRadius: '5px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
                }}>
                    Tutor Activity Log
                </h3>      <TableContainer style={{ justifyContent: 'center' }}>
                    <Table aria-label="collapsible table" >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: 'fit-content' }} />
                                <TableCell style={{ width: 'fit-content' }} align="center"><b>Action</b></TableCell>
                                <TableCell style={{ width: 'fit-content' }} ><b>Time</b></TableCell>
                                <TableCell style={{ width: 'fit-content' }} align="left"><b>Description</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentRows.map((row) => (
                                <CollapsibleRow row={row} />
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </div>
        </MainContentLayout>
    );
}
