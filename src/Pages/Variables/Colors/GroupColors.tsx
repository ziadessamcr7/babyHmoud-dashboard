import { Modal, Box, Typography, Button, Grid2, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, styled } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import './Group.css';

const GroupColors = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [groupColors, setGroupColors] = useState<any[]>([]);
    const [singleColors, setSingleColors] = useState<any[]>([]);
    const [btnState, setBtnState] = useState('addBtn');
    const [groupColorId, setGroupColorId] = useState(0);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // لتحديد نوع المودال ("delete" أو "update" أو "view")

    // Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // عنصر الورقة المُخصصة (Item) مع تنسيق من الثيم
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'start',
        color: theme.palette.text.primary,
        boxShadow: 'none',
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    const [activeBtn, setActiveBtn] = useState('myAccount');
    const [colors, setColors] = useState<any[]>([]);

    // دالة لجلب مجموعات الألوان
    const getAllColorGroups = () => {
        setIsLoading(true);
        axios.get(`https://babyhumod.shop/api/groups`)
            .then((response) => {
                console.log('Data from groups', response.data);
                setGroupColors(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
                toast.error("حدث خطأ أثناء جلب مجموعات الألوان");
            });
    };

    // دالة لإرسال بيانات مجموعة الألوان (إضافة أو تعديل)
    const submitGroupColors = async (data: any) => {
        console.log(data);
        if (btnState === 'addBtn') {
            try {
                const formData = new FormData();
                formData.append("name", data.name);
                const response = await axios.post("https://babyhumod.shop/api/groups", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log(response.data);
                toast.success('تم الإضافة بنجاح');
                getAllColorGroups();
                setValue('name', '');
                setValue('color_ids', '');
            } catch (error) {
                console.error("Error:", error);
                toast.error("حدث خطأ أثناء الإضافة");
            }
        } else if (btnState === 'updateBtn') {
            console.log('88888888888888');
            try {
                const response = await axios.put(`https://babyhumod.shop/api/groups/${groupColorId}`, data);
                console.log(response.data);
                toast.success('تم التعديل بنجاح');
                getAllColorGroups();
                setValue('name', '');
                setBtnState('addBtn');

            } catch (error) {
                console.error("Error:", error);
                toast.error("حدث خطأ أثناء التعديل");
            }
        }
    };

    // فتح المودال وتحديد نوع العملية
    const handleOpen = (type: string, cat: any) => {
        setModalType(type);
        setOpen(true);
        if (type === 'delete') {
            setGroupColorId(cat.id);
        } else if (type === 'update') {
            setGroupColorId(cat.id);
            setValue('name', cat.name);
            setBtnState('updateBtn');
        }
    };

    const updateForm = (row: any) => {
        console.log(row);
        setValue('name', row.name);
        setBtnState('updateBtn');
        setGroupColorId(row.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleClose = () => setOpen(false);

    const deleteGroup = () => {
        axios.delete(`https://babyhumod.shop/api/groups/${groupColorId}`)
            .then((response) => {
                console.log(response);
                handleClose();
                toast.success('تم المسح بنجاح');
                getAllColorGroups();
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response.data.error);
                handleClose();
            });
    };

    // دالة لجلب الألوان الفردية (من API الألوان)
    const getAllSingleColors = () => {
        setIsLoading(true);
        axios.get(`https://babyhumod.shop/api/colors`)
            .then((response) => {
                console.log('Colors data', response.data);
                setSingleColors(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getAllColorGroups();
        getAllSingleColors();
    }, []);

    // مكوّن يعرض بيانات صف من الجدول
    const ClientsData: React.FC<{ row: any }> = ({ row }) => {
        const [localOpen, setLocalOpen] = useState(false);
        return (
            <>
                <TableRow>

                    <TableCell align="center">
                        <span style={{
                            display: 'flex',
                            padding: '7px',
                            fontWeight: 'bold',
                            flexDirection: 'column'
                        }}>
                            <small>{row.name}</small>
                        </span>
                    </TableCell>
                    <TableCell align="center">
                        <span style={{
                            display: 'flex',
                            padding: '7px',
                            fontWeight: 'bold',
                            flexDirection: 'column'
                        }}>
                            <small>{row?.colors?.map((col, idx) => {
                                return <p style={{ margin: '0' }}> {col.name} </p>
                            })} </small>
                        </span>
                    </TableCell>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">
                        <span
                            onClick={() => handleOpen("delete", row)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src="/assets/imgs/trash.svg" alt="trash" />
                        </span>
                        <span
                            onClick={() => updateForm(row)}
                            style={{ cursor: 'pointer', marginLeft: '8px' }}
                        >
                            <img src="/assets/imgs/edit.svg" alt="edit" />
                        </span>
                    </TableCell>

                </TableRow>
            </>
        );
    };

    // نمط المودال الرئيسي
    const modalStyle = {
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

    return (

        <>
            {/* مودال العمليّات (على سبيل المثال للحذف) */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                <Box sx={modalStyle}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        {modalType === "delete" && "Confirm Delete"}
                    </Typography>
                    <Box id="modal-description" sx={{ mt: 2 }}>
                        {modalType === "delete" && (
                            <>
                                <h5>Are you sure you want to delete this item?</h5>

                                <Button variant='contained' onClick={deleteGroup} style={{ marginTop: '10px' }}>delete</Button>
                            </>
                        )}
                    </Box>
                    {/* <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
                        اغلاق
                    </Button> */}
                </Box>
            </Modal>

            {/* نموذج الإدخال */}
            <Box sx={{ flexGrow: 1, px: 3 }}>
                <Grid2 container component="form" onSubmit={handleSubmit(submitGroupColors)} spacing={2} sx={{ backgroundColor: '#fff', display: 'flex', alignItems: 'center' }}>
                    <Grid2 size={12}></Grid2>
                    <Grid2 sx={{ paddingRight: '20px' }} size={5}>
                        <Item>
                            <div className='settings'>
                                <form>
                                    <label>اسم المجموعة</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        {...register('name', { required: true })}
                                    />
                                    {errors.name && <span className="error">هذا الحقل مطلوب</span>}
                                </form>
                            </div>
                        </Item>
                    </Grid2>

                    <Grid2 sx={{ display: 'flex', alignItems: 'center' }} size={3}>
                        <div className="dropdown">
                            <button
                                style={{ border: 'blue 1px solid', backgroundColor: 'transparent', padding: '4px 0' }}
                                type='button'>  اختر اللون ▽</button>
                            <div className="dropdown-content">
                                {singleColors.map((color, idx) => (
                                    <label key={idx}>
                                        <input type="checkbox" {...register('color_ids', { required: true })} value={color.id} />
                                        <span>{color.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </Grid2>
                    <Grid2 size={3}>
                        <Item>
                            {btnState === 'addBtn' ?
                                <Button
                                    style={{
                                        // border: '1px solid brown',
                                        padding: '10px',
                                        width: '110px',
                                        borderRadius: '7px',
                                        // backgroundColor: 'rgba(101, 73, 41, 1)',
                                        color: 'white',
                                        cursor: 'pointer'
                                    }}
                                    variant='contained'
                                    type='submit'
                                >اضافه</Button>
                                :
                                <Button
                                    style={{
                                        // border: '1px solid brown',
                                        padding: '10px',
                                        width: '110px',
                                        borderRadius: '7px',
                                        // backgroundColor: 'rgba(101, 73, 41, 1)',
                                        color: 'white',
                                        cursor: 'pointer'
                                    }}
                                    variant='contained'
                                    type='submit'
                                >تعديل</Button>
                            }
                        </Item>
                    </Grid2>
                </Grid2>
            </Box>

            {/* عرض الجدول */}
            {isLoading ? (
                <div style={{ textAlign: 'center' }}>
                    <BeatLoader margin={3} />
                </div>
            ) : (
                <Box sx={{ px: 3, mt: 2 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' sx={{ color: 'rgba(139, 144, 154, 1)' }}>اسم المجموعة</TableCell>
                                    <TableCell align='center' sx={{ color: 'rgba(139, 144, 154, 1)' }}> الالوان</TableCell>
                                    <TableCell align="center" sx={{ color: 'rgba(139, 144, 154, 1)' }}>color group ID</TableCell>
                                    <TableCell align="center" sx={{ color: 'rgba(139, 144, 154, 1)' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groupColors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                    <ClientsData key={row.id} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[2, 5, 10]}
                            component="div"
                            count={groupColors.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ direction: 'ltr' }}
                        />
                    </TableContainer>
                </Box>
            )}
        </>

    );
};

export default GroupColors;
