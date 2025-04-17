import React, { useEffect, useState } from 'react'
import './Ratings.css'
import { Box, Button, Collapse, Grid2, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Ratings = () => {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [ratings, setRatings] = useState([]);

    const { t, i18n } = useTranslation();





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

    const getAllRatings = () => {
        setIsLoading(true)
        axios.get(`https://babyhumod.shop/api/reviews`)
            .then((response) => {
                console.log('looooooool', response.data);
                // setColors(response.data.colors)
                setRatings(response.data)
                setIsLoading(false)

                // setValue('name', response.data[0].name)
                // setValue('image', response.data[0].image)
                // setImage(response.data[0].image)

            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false)

            });
    }

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
                            padding: '',
                            // color: 'rgba(255, 198, 0, 1)',
                            fontWeight: 'bold',
                            flexDirection: 'column'
                        }}>

                            <small>
                                {row.first_name + ' '}
                                {row.last_name}
                            </small>

                        </span>
                    </TableCell>
                    <TableCell align="center"
                        style={{
                            width: '28%',
                        }}
                    >
                        <span style={{

                            display: 'inline-block',
                            borderRadius: '3px',
                            padding: '3px'
                        }} >
                            {row.review}
                        </span>
                    </TableCell>

                    <TableCell align="center">
                        {[...Array(5)].map((_, index) => (
                            index < row.rating ? (
                                <StarIcon key={index} sx={{ color: 'orange' }} />
                            ) : (
                                <StarBorderIcon key={index} sx={{ color: 'gray' }} />
                            )
                        ))}
                    </TableCell>
                    <TableCell align="center">

                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleOpen("delete", row)}>
                            <img src="/assets/imgs/trash.svg" alt="" />
                        </span>

                        <span
                            onClick={() => handleOpen("view", row)}
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            {
                                row.status === 'published' ?
                                    <img src="/assets/imgs/lock.svg"
                                        style={{
                                            margin: '0 7px'
                                        }}
                                        alt="" /> : <img src="/assets/imgs/unlocked.svg"
                                            style={{
                                                margin: '0 7px 2px 7px'
                                            }}
                                            alt="" />

                            }

                        </span>
                        {/* <span>
                            <img src="/assets/imgs/edit.svg" alt="" />
                        </span> */}


                    </TableCell>

                    {/* <TableCell align="center"> </TableCell> */}

                </TableRow>

            </>
        );
    };


    const rows: RowData[] = [
        createData('احمد المنفي', 'التطبيق انيق جدا و سلس بردو حاجه عظمة بصراحة', 6.0, 'احمد محمد رضا', 'منذ دقيقتين', 3.99, 989),
        createData('احمد المنفي', 'التطبيق انيق جدا و سلس بردو حاجه عظمة بصراحة', 16.0, 'احمد محمد رضا', 'منذ دقيقتين', 3.79, 989),
        createData('احمد المنفي', 'التطبيق انيق جدا و سلس بردو حاجه عظمة بصراحة', 3.7, 'احمد محمد رضا', 'منذ دقيقتين', 2.5, 989),
        createData('احمد المنفي', 'التطبيق انيق جدا و سلس بردو حاجه عظمة بصراحة', 16.0, 'احمد محمد رضا', 'منذ دقيقتين', 1.5, 989),
    ];

    const [isLoading, setIsLoading] = useState(false);



    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // لتحديد نوع المودال

    const [categoryId, setCategoryId] = useState(0);

    const [commentStatus, setCommentStatus] = useState('');




    const handleOpen = (type: any, cat: any) => {
        setModalType(type); // تحديد نوع المودال
        setOpen(true);

        console.log(cat);


        if (type === 'delete') {
            setCategoryId(cat.id);
        } else if (type === 'update') {
            // setCategoryId(cat.id);

            console.log(cat);
            // setValue('first_name', client.first_name);
            // setValue('last_name', client.last_name);
            // setValue('birth_date', client.birth_date);
        }

        else if (type === 'view') {
            setCategoryId(cat.id)
            setCommentStatus(cat.status)
        }
    };


    const handleClose = () => setOpen(false);



    const toggleStatus = () => {
        console.log(commentStatus);

        setIsLoading(true);

        const newStatus = commentStatus === 'pending' ? 'published' : 'pending';

        axios.put(`https://babyhumod.shop/api/reviews/${categoryId}/status`, { status: newStatus })
            .then((response) => {
                console.log('responseeeeeee', response.data);
                getAllRatings();
                handleClose();
                toast.success('تم تعديل حالة التعليق بنجاح');
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }


    useEffect(() => {
        getAllRatings()
    }, [])




    return (
        <>


            {/* الـ Modal */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                <Box sx={{ width: 400, p: 3, bgcolor: "white", mx: "auto", mt: "20vh", borderRadius: 2 }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        {modalType === "view" && t('commentCaseModal.title')}
                        {/* {modalType === "update" && "تعديل القسم"} */}
                        {modalType === "delete" && t('commentDeleteModal.title')}
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        {modalType === "view" && <div style={{ position: 'relative' }}>

                            <h2 onClick={handleClose} style={{ position: 'absolute', left: '0', top: '-100%', cursor: 'pointer' }}>x</h2>

                            <h5> {t('commentCaseModal.subtitle')}  </h5>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                <Button onClick={toggleStatus} variant='contained' style={{ cursor: 'pointer' }} > {t('commentCaseModal.btn')} </Button>

                            </div>

                        </div>}

                        {modalType === "delete" &&
                            <div style={{ position: 'relative' }}>
                                <h2 onClick={handleClose} style={{ position: 'absolute', left: '0', top: '-100%', cursor: 'pointer' }}>x</h2>

                                <h3> {t('commentDeleteModal.subtitle')}  </h3>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                    <Button variant='contained' style={{ cursor: 'pointer' }}> {t('commentDeleteModal.btn')} </Button>

                                </div>

                            </div>
                        }

                    </Typography>
                    {/* <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
                            Close
                        </Button> */}
                </Box>

            </Modal>


            <Box sx={{
                margin: '20px 0', paddingRight: '25px',
                backgroundColor: '', width: 'fit-content',
                position: 'relative'
            }}>

                <input style={{
                    border: 'none',
                    padding: '7px',
                }}
                    type="text"
                    type="text" placeholder={i18n.language === 'ar' ? 'بحث' : 'search'}
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
                                }} align='center'> {t("ratings.name")} </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center"> {t("ratings.comment")} </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center"> {t("ratings.rate")} </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center">  </TableCell>
                                {/* <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center">  </TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">Loading...</TableCell>
                                </TableRow>
                            ) : ratings.length > 0 ? (
                                ratings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                    <ClientsData key={row.id} row={row} />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">No ratings found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10]}
                        component="div"
                        count={ratings.length}
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

export default Ratings