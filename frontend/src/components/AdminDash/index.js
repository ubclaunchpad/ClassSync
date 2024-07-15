import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./index.css";

import { FormControlLabel, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@material-ui/core';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

const URL = process.env.REACT_APP_API_URL
const useStyles = makeStyles({
    table: {
        minWidth: 0,
    },
    stickyHeader: {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: 'white',
        fontWeight: 'bold',
    },
    tableContainer: {
        borderRadius: 15,
        border: '2px solid black',
        overflow: 'hidden',
        margin: 50,
        padding: 5,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#f2f2f2',
        },
    },
    statusPill: {
        padding: '5px 10px',
        borderRadius: '50px',
        color: 'black',
        width: '80%',
        justifyContent: 'center'
    },
    completed: {
        backgroundColor: '#90EE90', // Light pastel green
    },
    pending: {
        backgroundColor: '#B2BEB5', // Beige
    },
    noShow: {
        backgroundColor: '#FFB6C1', // Red pastel shade
    },
});

function StatusPill({ status }) {
    const classes = useStyles();
    const statusClasses = {
        Completed: classes.completed,
        Pending: classes.pending,
        'No Show': classes.noShow,
    };

    const statusClass = statusClasses[status] || classes.pending;
    return <div className={`${classes.statusPill} ${statusClass}`}>{status}</div>;
}

function createData(column1, column2, column3, column4, column5, column6, column7) {
    return { column1, column2, column3, column4, column5, column6, column7 };
}


export default function StickyHeaderTable() {
    const [rows, setRows] = useState([]); // Initialize rows state
    const [view, setView] = useState('history'); // New state to track the current view


    useEffect(() => {
        const endpoint = view === 'history' ? '/admin/dashboard/history' : '/admin/dashboard/upcoming';
        fetch(URL + endpoint)
            .then(response => response.json())
            .then(data => {
                // Assuming the data structure is the same for both views
                const formattedRows = data.map(item => createData(item.tutor, item.student, item.start_time, item.course, item.session, item.status, item.booking_id));
                setRows(formattedRows);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [view]); // Dependency on view means this effect runs when view changes

    const classes = useStyles();
    const toggleView = () => {
        setView(prevView => prevView === 'history' ? 'schedule' : 'history');
    };

    return (
        <>
            <FormControlLabel
                control={
                    <Switch
                        checked={view === 'schedule'}
                        onChange={toggleView}
                        name="viewSwitch"
                        color="primary"
                    />
                }
                label={view === 'history' ? 'View Schedule' : 'View History'}
                style={{ position: 'absolute', top: 200, right: 40, margin: '10px' }}
            />
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell className={classes.stickyHeader}>Tutor</TableCell>
                            <TableCell className={classes.stickyHeader}>Student</TableCell>
                            <TableCell className={classes.stickyHeader}>Date</TableCell>
                            <TableCell className={classes.stickyHeader}>Time</TableCell>

                            <TableCell className={classes.stickyHeader}>Course</TableCell>
                            <TableCell className={classes.stickyHeader}>Session</TableCell>
                            <TableCell className={classes.stickyHeader}>Status</TableCell>
                            <TableCell className={classes.stickyHeader}>Notes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.column1} className={classes.row}>
                                <TableCell style={{ padding: '5px' }}>{row.column1}</TableCell>
                                <TableCell style={{ padding: '5px' }}>{row.column2}</TableCell>
                                <TableCell style={{ padding: '5px' }}>
                                    {new Date(row.column3).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </TableCell>
                                <TableCell style={{ padding: '5px' }}>
                                    {new Date(row.column3).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </TableCell>                   <TableCell style={{ padding: '5px' }}>{row.column4}</TableCell>
                                <TableCell style={{ padding: '5px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '60px' }}>
                                        {row.column5}/5
                                    </div></TableCell>
                                <TableCell style={{ padding: '5px' }}><StatusPill status={row.column6}>Complete</StatusPill></TableCell>
                                <TableCell style={{ padding: '5px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '60px' }}>
                                        <Link to={`/class/${row.column7}`}>                                    <IconButton aria-label="edit" style={{ color: '#103da2' }}>
                                            <EditNoteIcon />
                                        </IconButton>
                                        </Link>

                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    );
}