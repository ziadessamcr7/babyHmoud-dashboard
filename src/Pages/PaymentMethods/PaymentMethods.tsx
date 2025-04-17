import { useForm } from 'react-hook-form';
import './PaymentMethods.css'
import { memo, useState } from 'react';
import { Avatar, Box, Button, Collapse, FormControlLabel, FormGroup, Grid2, Paper, styled, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';






const PaymentMethods = () => {


    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [previewImage, setPreviewImage] = useState<string | null>(null); // ⬅️ تخزين الصورة المختارة


    const [image, setImage] = useState('')

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        // padding: theme.spacing(1),
        textAlign: 'start',
        padding: '10px 30px',
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


    // Custom styled components
    const StyledPaper = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(3),
        marginBottom: theme.spacing(4),
        borderRadius: theme.spacing(0),
        // boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)'
        marginRight: '25px',
        marginLeft: '25px'
    }));

    const InputField = memo(({ label, name, register, required, file }: any) => (
        <Grid2>
            <Item>
                <FieldLabel>{label}</FieldLabel>
                <TextField
                    fullWidth
                    {...register(name, { required })}
                    variant="outlined"
                    size="small"
                    inputProps={{ dir: 'rtl' }}
                    type={file}
                />
            </Item>
        </Grid2>
    ));

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



    const submit = async (data: any) => {
        console.log('ana el form', data);
    };

    const handleReset = () => {
        setValue('title', '')
        setValue('description', '')
        setPreviewImage(null)
        setValue('image', '')
    };


    const handleImg = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setValue('image', file);
            setPreviewImage(URL.createObjectURL(file)); // ⬅️ تحديث المعاينة بالصورة الجديدة

        }
    };


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

    const rows: any = [
        createData('دبدوب', '22.0 دينار', 6.0, 'احمد محمد رضا', 'منذ دقيقتين', 3.99, 989),
        createData('دبدوب', '22.0 دينار', 16.0, 'احمد محمد رضا', 'منذ دقيقتين', 3.79, 989),
        createData('دبدوب', '22.0 دينار', 3.7, 'احمد محمد رضا', 'منذ دقيقتين', 2.5, 989),
        createData('دبدوب', '22.0 دينار', 16.0, 'احمد محمد رضا', 'منذ دقيقتين', 1.5, 989),
    ];



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
                    <TableCell align="center">
                        {row.calories}
                    </TableCell>
                    <TableCell align="center">
                        <img src="/assets/imgs/bitcoin.png"
                            width={80}
                            height={80}
                            alt="" />

                    </TableCell>

                    <TableCell align="center">
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked color='success' />} label="" />
                            {/* <FormControlLabel required control={<Switch />} label="Required" />
                            <FormControlLabel disabled control={<Switch />} label="Disabled" /> */}
                        </FormGroup>

                    </TableCell>

                    <TableCell align="center">

                        <span>
                            <img src="/assets/imgs/trash.svg" alt="" />
                        </span>

                        <span>
                            <img src="/assets/imgs/lock.svg"
                                style={{ margin: '0 7px' }}
                                alt="" />
                        </span>

                        <span>
                            <img src="/assets/imgs/edit.svg" alt="" />
                        </span>


                    </TableCell>

                </TableRow>

                <TableRow>
                    <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
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

                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    };






    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };




    return (
        <>

            {/* top content  */}

            <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
                {/* <Typography variant="h5" component="h1" align="right" sx={{ mb: 4, fontWeight: 'bold' }}>
                        تواصل معنا
                    </Typography> */}

                <StyledPaper>
                    <Grid2 container spacing={5}>
                        {/* First column of inputs */}
                        <Grid2 size={{ xs: 12, md: 4 }} >
                            <Item>
                                <Grid2 container spacing={2} direction="column">
                                    <InputField label="عنوان الصورة" name="title" register={register} required />
                                    <InputField label="وصف الصورة" name="description" register={register} required />

                                    {/* زر رفع الصورة */}
                                    <Box>
                                        <FieldLabel>اضافة صورة</FieldLabel>
                                        <input type="file" accept="image/*" onChange={handleImg} />
                                    </Box>

                                </Grid2>
                            </Item>
                        </Grid2>

                        {/* Second column of inputs */}
                        <Grid2 size={{ xs: 12, md: 4 }}>

                        </Grid2>

                        {/* Image column (on the left) */}
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Item>
                                <ImagePlaceholder sx={{ width: '100%' }}>
                                    <Avatar sx={{ width: '100%', height: '100%', borderRadius: '0', bgcolor: '#e9ecef' }} src={previewImage || undefined}>
                                        {!previewImage && <ImageIcon sx={{ fontSize: 50, color: '#adb5bd' }} />}
                                    </Avatar>
                                </ImagePlaceholder>
                            </Item>
                        </Grid2>
                    </Grid2>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <StyledButton
                            type="button"
                            onClick={handleReset}
                            color="secondary"
                        >
                            إعادة الضبط
                        </StyledButton>

                        <StyledButton
                            color="primary"
                            type="submit"
                        >
                            تنفيذ
                        </StyledButton>
                    </Box>
                </StyledPaper>

            </Box>

            {/* end of top content  */}






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
                                }} align='center'> اسم الطريقة </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center"> الوصف </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center"> الصورة </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center">  الحالة </TableCell>
                                <TableCell sx={{
                                    color: 'rgba(139, 144, 154, 1)'
                                }} align="center">  </TableCell>

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

export default PaymentMethods