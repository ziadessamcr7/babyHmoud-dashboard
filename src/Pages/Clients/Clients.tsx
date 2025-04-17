import { Box, Button, Grid2, Modal, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './Clients.css';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

const Clients = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [clientId, setClientId] = useState(0);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState<string>("");
    const [clientFirstName, setClientFirstName] = useState<string>("");
    const [clientLastName, setClientLastName] = useState<string>("");
    const [clientHistoryArray, setClientHistoryArray] = useState<[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);


    const [day, setDay] = useState('')

    const [searchTerm, setSearchTerm] = useState(""); // قيمة البحث
    const [filteredUsers, setFilteredUsers] = useState([]); // 
    const [users, setUsers] = useState([]); // البيانات الأصلية

    const { t, i18n } = useTranslation();


    const handleOpen = (type: string, client: any) => {
        setModalType(type);
        setOpen(true);

        if (type === 'update') {
            setClientId(client.id);
            setValue('first_name', client.first_name);
            setValue('last_name', client.last_name);
            setValue('birth_date', client.birth_date);
        }
        else if (type === 'delete') {
            setClientId(client.id);
        }
        else {

            console.log('hhhhhhhhh', client);
            setClientFirstName(client.first_name)
            setClientLastName(client.last_name)
            getLoginHistory(client?.id)
        }

    };

    const handleClose = () => setOpen(false);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [clients, setClients] = useState<any[]>([]);


    const getAllClients = () => {
        setIsLoading(true)
        axios.get(`https://babyhumod.shop/api/users`)
            .then((response) => {
                console.log('koool el clients', response.data);

                setUsers(response.data);
                setClients(response.data);

                setClients(response.data);
                setIsLoading(false)

            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false)
            });
    };

    const updateClientData = (data: any) => {
        axios.put(`https://babyhumod.shop/api/users/${clientId}`, data)
            .then((response) => {
                toast.success('تم التعديل بنجاح')
                getAllClients(); // إعادة تحميل قائمة العملاء بعد التحديث
                handleClose()
            })
            .catch((error) => {
                toast.success('فشل في التعديل')

                console.error(error);
                handleClose()

            });

    };

    const deleteClient = () => {
        axios.delete(`https://babyhumod.shop/api/users/${clientId}`)
            .then((response) => {
                console.log(response);
                handleClose()
                toast.success('تم المسح بنجاح')

                getAllClients(); // إعادة تحميل قائمة العملاء بعد التحديث

            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response.data.error)
                handleClose()

            });
    }

    const getLoginHistory = (client_id: any) => {
        setIsLoadingModal(true)
        axios.get(`https://babyhumod.shop/api/users/${client_id}/login-histories`)
            .then((response) => {
                console.log('ana el data bta3t el history', response.data);

                setClientHistoryArray(response.data)

                setIsLoadingModal(false)

                setDay(response?.data[0]?.login_at?.slice(0, 10))
            })
            .catch((error) => {
                console.error(error);
                setIsLoadingModal(false)

            });
    }

    useEffect(() => {
        getAllClients();
    }, []);



    useEffect(() => {
        const filtered = users.filter((user) =>
            `${user.first_name} ${user.last_name}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setClients(filtered);
    }, [searchTerm, users]);




    const ClientsData: React.FC<{ row: any }> = ({ row }) => {
        return (
            <TableRow>
                <TableCell align='center'>
                    <span style={{
                        display: 'flex',
                        padding: '7px',
                        fontWeight: 'bold',
                        flexDirection: 'column'
                    }}>
                        <small>{row.first_name} {row.last_name}</small>
                    </span>
                </TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">

                    <span onClick={() => handleOpen("view", row)} style={{ cursor: 'pointer' }}>
                        <img src="/assets/imgs/iconoir_eye.svg" alt="view" />
                    </span>
                    <span onClick={() => handleOpen("delete", row)} style={{ cursor: 'pointer', margin: '0 7px' }}>
                        <img src="/assets/imgs/trash.svg" alt="delete" />
                    </span>
                    <span onClick={() => handleOpen("update", row)} style={{ cursor: 'pointer' }}>
                        <img src="/assets/imgs/edit.svg" alt="edit" />
                    </span>

                </TableCell>

            </TableRow>
        );
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'start',
        boxShadow: 'none',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    // const formatDate = (dateString: any) => {
    //     const date = new Date(dateString);
    //     return new Intl.DateTimeFormat('ar-EG', {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric'
    //     }).format(date);
    // };


    // console.log(formatDate("2025-03-05"));

    // const formatTime = (timeString: any) => {
    //     const [hours, minutes, seconds] = timeString.split(':');
    //     const date = new Date();
    //     date.setHours(hours, minutes, seconds);

    //     return new Intl.DateTimeFormat('en-US', {
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         hour12: true
    //     }).format(date);
    // };

    // console.log(formatTime("20:15:16")); 


    return (
        <>

            <div>
                {/* الـ Modal */}
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                    <Box sx={style}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            {modalType === "view" && ""}
                            {modalType === "update" && t('clientsEditModal.editClientData')}
                            {modalType === "delete" && t('clientsDeleteModal.deleteClient')}
                        </Typography>


                        <Box id="modal-description" sx={{ mt: 2 }}>
                            {modalType === "view" &&

                                <div style={{ position: 'relative' }}>
                                    {
                                        isLoadingModal ? <div style={{
                                            textAlign: 'center'
                                        }}>
                                            <BeatLoader margin={3} />
                                        </div> :
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Grid2 container spacing={0}>
                                                    <Grid2 size={12}>
                                                        <Item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div>
                                                                <h5
                                                                    style={{
                                                                        margin: '3px 0',
                                                                        fontSize: '18px'
                                                                    }}
                                                                > {clientFirstName + ' '} {clientLastName}  </h5>
                                                                {/* <small>robert@gmail.com</small> */}
                                                            </div>
                                                            {/* <div className='inputWrapper'>
                                                                <input type="text"
                                                                    placeholder='بحث...'
                                                                />
                                                                <img src="/assets/imgs/Group.svg" alt="" />
                                                            </div> */}
                                                        </Item>
                                                    </Grid2>

                                                    <Grid2 sx={{
                                                        borderBottom: '1px solid rgb(207, 210, 216)'
                                                    }} size={4}>
                                                        <Item>
                                                            {t('clientsViewModal.hour')}
                                                        </Item>

                                                    </Grid2>
                                                    {/* <Grid2 sx={{
                                                        borderBottom: '1px solid rgb(207, 210, 216)'
                                                    }} size={3}>
                                                        <Item>
                                                            اليوم
                                                        </Item>

                                                    </Grid2> */}
                                                    <Grid2 sx={{
                                                        borderBottom: '1px solid rgb(207, 210, 216)'
                                                    }} size={4}>
                                                        <Item>
                                                            {t('clientsViewModal.date')}
                                                        </Item>
                                                    </Grid2>
                                                    <Grid2 sx={{
                                                        borderBottom: '1px solid rgb(207, 210, 216)'
                                                    }} size={4}>
                                                        <Item>
                                                            {t('clientsViewModal.didTheyBuy')}
                                                        </Item>

                                                    </Grid2>

                                                    {
                                                        clientHistoryArray.length > 0 ? <>
                                                            {
                                                                clientHistoryArray?.map((row: any, idx) => {

                                                                    return <>

                                                                        <Grid2 sx={{
                                                                            borderBottom: '1px solid rgb(207, 210, 216)'
                                                                        }} size={4}>

                                                                            <h5> {row.login_at.slice(10, 20)} </h5>
                                                                        </Grid2>

                                                                        {/* <Grid2 sx={{
                                                                    borderBottom: '1px solid rgb(207, 210, 216)'
                                                                }} size={3}>

                                                                    <h5>2 يناير</h5>

                                                                </Grid2> */}

                                                                        <Grid2 sx={{
                                                                            borderBottom: '1px solid rgb(207, 210, 216)'
                                                                        }} size={4}>

                                                                            <h5> {row.login_at.slice(0, 10)} </h5>
                                                                        </Grid2>
                                                                        <Grid2 sx={{
                                                                            borderBottom: '1px solid rgb(207, 210, 216)'
                                                                        }} size={4}>

                                                                            {/* <h5> {t('clientsViewModal.yes')} </h5> */}
                                                                            <h5> idk </h5>
                                                                        </Grid2>
                                                                    </ >
                                                                })
                                                            }
                                                        </> : <h3>   {t('clientsViewModal.noData')} </h3>
                                                    }

                                                </Grid2>
                                            </Box>
                                    }
                                </div>
                            }

                            {modalType === "update" &&

                                < div style={{ position: 'relative' }}>

                                    <h2 onClick={handleClose} style={{ position: 'absolute', left: '0', top: '-30%', cursor: 'pointer' }}>x</h2>

                                    <form onSubmit={handleSubmit(updateClientData)} className='updateClientForm'>
                                        <label htmlFor=""> {t('clientsEditModal.firstName')} </label>
                                        <input type="text" {...register('first_name', { required: true })} />
                                        {errors.first_name && <span style={{ color: 'red' }}>Field required</span>}

                                        <label htmlFor=""> {t('clientsEditModal.lastName')} </label>
                                        <input type="text" {...register('last_name', { required: true })} />
                                        {errors.last_name && <span style={{ color: 'red' }}>Field required</span>}

                                        <label htmlFor=""> {t('clientsEditModal.BirthDate')} </label>
                                        <input type="text" placeholder="YYYY-MM-DD" {...register('birth_date', { required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ })} />
                                        {errors.birth_date && <span style={{ color: 'red' }}>Enter a valid date</span>}


                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                            <Button variant='contained' type="submit"> {t('clientsEditModal.editBtn')} </Button>

                                            {/* <Button onClick={handleClose} variant="contained" >
                                            اغلاق
                                        </Button> */}

                                        </div>

                                    </form>
                                </div>


                            }

                            {modalType === "delete" &&

                                <div style={{ position: 'relative' }}>

                                    <h2 onClick={handleClose} style={{ position: 'absolute', left: '0', top: '-30%', cursor: 'pointer' }}>x</h2>


                                    <h5>

                                        {t('clientsDeleteModal.areYouSureMsg')}
                                    </h5>



                                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>


                                        <div style={{ width: '100%' }}>
                                            <img src="../../../public/assets/imgs/warningImg.jpg" style={{ width: '40%', height: '190px', display: 'block', margin: 'auto' }} alt="" />
                                        </div>

                                        <Button onClick={deleteClient} variant='contained'>
                                            {t('clientsDeleteModal.delete')}
                                        </Button>


                                    </div>


                                </div>

                            }
                        </Box>
                        {/* 
                        <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
                            اغلاق
                        </Button> */}

                    </Box>
                </Modal>
            </div>

            <Box sx={{ margin: '20px 0', paddingRight: '25px', position: 'relative', width: '20%' }}>
                <input style={{ border: 'none', padding: '7px', width: '100%' }}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}

                    placeholder={i18n.language === 'ar' ? 'بحث' : 'search'}
                />
                <SearchIcon sx={{ position: 'absolute', left: '5%', top: '21%' }} />
            </Box>

            {
                isLoading ? <div style={{
                    textAlign: 'center'
                }}>
                    <BeatLoader margin={3} />
                </div> : <Box sx={{ padding: '0 20px' }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>

                                    <TableCell align='center'> {t('ordersManagment.clientName')} </TableCell>
                                    <TableCell align='center'> {t('ordersManagment.phoneNumber')} </TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                    <ClientsData key={row.id} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            sx={{
                                direction: 'ltr'
                            }}
                            rowsPerPageOptions={[2, 5, 10]}
                            component="div"
                            count={clients.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Box>
            }


        </>
    );
};

export default Clients;
