import { Avatar, Box, Button, Grid, Modal, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';
import { toast } from 'react-toastify';

interface SplashScreenData {
    id: number;
    title_ar: string;
    title_en: string;
    details_ar: string;
    details_en: string;
    image: string;
}

const BASE_URL = 'https://babyhumod.shop/api/banners';

const Banners = () => {
    // Form handling
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Table pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    // Data state
    const [allBannersArray, setAllBannersArray] = useState<SplashScreenData[]>([]);
    const [btnState, setBtnState] = useState<'add' | 'update'>('add');
    const [currentBannerId, setCurrentBannerId] = useState<number | null>(null);

    // Modal state
    const [modalType, setModalType] = useState<"delete" | "">("");
    const [open, setOpen] = useState(false);

    // Styled components
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        textAlign: 'start',
        padding: '10px 30px',
        boxShadow: 'none',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    const FieldLabel = styled(Typography)(({ theme }) => ({
        marginBottom: theme.spacing(1),
        fontWeight: 'medium',
        textAlign: 'right',
        direction: 'rtl',
    }));

    const StyledPaper = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(3),
        marginBottom: theme.spacing(4),
        borderRadius: theme.spacing(0),
        margin: '0 25px'
    }));

    const ImagePlaceholder = styled(Box)(({ theme }) => ({
        width: 180,
        height: 220,
        backgroundColor: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(2)
    }));

    const StyledButton = styled(Button)(({ theme, color }) => ({
        padding: theme.spacing(1, 4),
        borderRadius: theme.spacing(0.5),
        fontWeight: 'bold',
        margin: theme.spacing(1),
        border: color === 'primary' ? 'none' : '1px solid #8B5A2B',
        backgroundColor: color === 'primary' ? '#8B5A2B' : 'transparent',
        color: color === 'primary' ? 'white' : '#8B5A2B',
        '&:hover': {
            backgroundColor: color === 'primary' ? '#6d4522' : 'rgba(139, 90, 43, 0.04)',
        },
    }));

    // Fetch all splash screens
    const fetchBannerScreens = async () => {
        try {
            const response = await axios.get('https://babyhumod.shop/api/banners');
            setAllBannersArray(response.data);
            console.log(response.data);

        } catch (error) {
            toast.error('Error fetching splash screens');
            console.error("Error fetching data:", error);
        }
    };


    const [order, setOrder] = useState([])

    // Fetch all splash screens
    const fetchAllOrders = async () => {
        try {
            const response = await axios.get('https://babyhumod.shop/api/orders');
            // setAllBannersArray(response.data);
            console.log(response.data);
        } catch (error) {
            toast.error('Error fetching splash screens');
            console.error("Error fetching data:", error);
        }
    };


    // Handle form submission (add/update)
    const onSubmit = async (data: any) => {

        console.log('ana geeeeeeeeeeet', data);


        if (btnState === 'add' && !imageFile) {
            toast.error('Please upload an image');
            return;
        }

        const formData = new FormData();

        // Append text fields
        formData.append('title', data.title);
        // formData.append('title_en', data.title);
        formData.append('description', data.description);
        formData.append('order', data.order);

        // For update, we need to append the _method field
        if (btnState === 'update' && currentBannerId) {
            formData.append('_method', 'PUT');
        }

        // Append image file if exists (for add it's required, for update it's optional)
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const url = btnState === 'add'
                ? BASE_URL
                : `${BASE_URL}/${currentBannerId}`;

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(`Splash screen ${btnState === 'add' ? 'added' : 'updated'} successfully`);
            resetForm();
            fetchBannerScreens();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || `Error ${btnState === 'add' ? 'adding' : 'updating'} splash screen`;
            toast.error(errorMessage);
            console.error(error);
        }
    };

    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Reset form
    const resetForm = () => {
        reset();
        setPreviewImage(null);
        setImageFile(null);
        setBtnState('add');
        setCurrentBannerId(null);
    };

    // Prepare form for update
    const prepareUpdateForm = (banner: SplashScreenData) => {
        console.log("bannnner", banner);

        setValue('title', banner.title);
        setValue('description', banner.description);
        setValue('order', banner.order);
        setPreviewImage(`https://babyhumod.shop/public/storage/` + banner.image_path);
        setImageFile(null);
        setBtnState('update');
        setCurrentBannerId(banner.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Delete splash screen
    const deleteBanner = async () => {
        try {
            await axios.delete(`${BASE_URL}/${currentBannerId}`);
            toast.success('Splash screen deleted successfully');
            handleClose();
            fetchBannerScreens();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Error deleting splash screen';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    // Modal handlers
    const handleOpen = (type: "delete", splash: SplashScreenData) => {
        setModalType(type);
        setOpen(true);
        setCurrentBannerId(splash.id);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentBannerId(null);
    };

    // Table pagination handlers
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchBannerScreens();
        fetchAllOrders()
    }, []);

    return (
        <>
            {/* Delete Confirmation Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Confirm Delete
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        هل انت متأكد من مسح هذا البانر ؟
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button onClick={handleClose}>اغلاق</Button>
                        <Button onClick={deleteBanner} color="error" variant="contained">
                            حذف
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Splash Screen Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <StyledPaper>
                    <Grid container spacing={0}>
                        {/* Form Fields Column */}
                        <Grid item xs={12} md={8}>
                            <Item>
                                <Grid container spacing={2} direction="column">
                                    <Grid item>
                                        <FieldLabel>عنوان البانر</FieldLabel>
                                        <TextField
                                            fullWidth
                                            {...register('title', { required: true })}
                                            variant="outlined"
                                            size="small"
                                            inputProps={{ dir: 'rtl' }}
                                            error={!!errors.title}
                                            helperText={errors.title && 'This field is required'}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FieldLabel>وصف البانر</FieldLabel>
                                        <TextField
                                            fullWidth
                                            {...register('description', { required: true })}
                                            variant="outlined"
                                            size="small"
                                            inputProps={{ dir: 'rtl' }}
                                            error={!!errors.description}
                                            helperText={errors.description && 'This field is required'}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FieldLabel>رقم الطلب</FieldLabel>
                                        <TextField
                                            fullWidth
                                            {...register('order', { required: true })}
                                            variant="outlined"
                                            size="small"
                                            inputProps={{ dir: 'rtl' }}
                                            error={!!errors.description}
                                            helperText={errors.description && 'This field is required'}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FieldLabel>اضافة صورة</FieldLabel>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            required={btnState === 'add'}
                                        />
                                    </Grid>
                                </Grid>
                            </Item>
                        </Grid>

                        {/* Image Preview Column */}
                        <Grid item xs={12} md={4}>
                            <Item>
                                <ImagePlaceholder sx={{ width: '100%' }}>
                                    <Avatar
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '0',
                                            bgcolor: '#e9ecef'
                                        }}
                                        src={previewImage || undefined}
                                    >
                                        {!previewImage && <ImageIcon sx={{ fontSize: 50, color: '#adb5bd' }} />}
                                    </Avatar>
                                </ImagePlaceholder>
                            </Item>
                        </Grid>
                    </Grid>

                    {/* Form Actions */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <StyledButton
                            type="button"
                            onClick={resetForm}
                            color="secondary"
                        >
                            إعادة الضبط
                        </StyledButton>
                        <StyledButton
                            color="primary"
                            type="submit"
                        >
                            {btnState === 'add' ? 'اضافة' : 'تعديل'}
                        </StyledButton>
                    </Box>
                </StyledPaper>
            </Box>

            {/* Splash Screens Table */}
            <Box sx={{ padding: '0 20px', margin: '50px 0' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>العنوان</TableCell>
                                <TableCell align="center">العنوان الفرعي</TableCell>
                                <TableCell align="center">الصورة</TableCell>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">الاجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allBannersArray
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((banner) => (
                                    <TableRow key={banner.id}>
                                        <TableCell align='center'>
                                            {banner.title}
                                        </TableCell>
                                        <TableCell align="center">
                                            {banner.description}
                                        </TableCell>
                                        <TableCell align="center">
                                            <img
                                                src={`https://babyhumod.shop/public/storage/` + banner.image_path}
                                                width={80}
                                                height={80}
                                                alt="Splash screen"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {banner.id}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                                <Button
                                                    onClick={() => handleOpen("delete", banner)}
                                                    color="error"
                                                    size="small"
                                                >
                                                    حذف
                                                </Button>
                                                <Button
                                                    onClick={() => prepareUpdateForm(banner)}
                                                    color="primary"
                                                    size="small"
                                                >
                                                    تعديل
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10]}
                        component="div"
                        count={allBannersArray.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ direction: 'ltr' }}
                    />
                </TableContainer>
            </Box>
        </>
    );
};

export default Banners;