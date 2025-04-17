import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';

// تعريف نوع البيانات لمنتج واحد
interface ProductData {
    product_name: string;
    price: string;
    color: string;
    size: string;
    main_form: string;
    additional_form: string;
    note_form: string;
}

// تعريف نوع البيانات للطلب الواحد
interface ShippingData {
    id: number;
    user_name: string;
    address: string;
    country: string;
    city: string;
    phone_number: string;
    shipping_method: string;
    order_type: string;
    order_ids: number[];
    status: number;
    created_at: string;
    updated_at: string;
    products: ProductData[];
    total_price: string;
}

// تعريف نوع البيانات للجدول
interface RowData {
    name: string;
    status: string;
    total: string;
    customerName: string;
    date: string;
    id: number;
    products: ProductData[];
}

const Requests: React.FC<{ row: ShippingData }> = ({ row }) => {
    const [open, setOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState(row.status);




    // دالة لتحويل الـ JSON إلى سطور مفصولة
    const formatJSON = (jsonStr: string) => {
        try {
            const jsonObject = JSON.parse(jsonStr);
            return Object.entries(jsonObject).map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong> {value}
                </div>
            ));
        } catch (error) {
            return <div>{jsonStr}</div>; // في حالة كانت القيمة ليست JSON
        }
    };


    // دالة لتغيير حالة الطلب
    const handleChangeStatus = async () => {
        const nextStatus = orderStatus === 5 ? 1 : orderStatus + 1; // التبديل بين الحالات
        setOrderStatus(nextStatus);

        // إرسال طلب لتحديث الحالة في الـ API
        try {
            const response = await fetch(`https://babyhumod.shop/api/orders/${row.id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: nextStatus }),
            });
            const data = await response.json();
            if (data.success) {
                alert("تم تغيير الحالة بنجاح");
            } else {
                alert("حدث خطأ في تحديث الحالة");
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };


    // تحويل الـ status إلى نص مناسب
    const getStatusText = (status: number) => {
        switch (status) {
            case 1:
                return "في الانتظار";
            case 2:
                return "قيد الإنشاء";
            case 3:
                return "تم التنفيذ";
            case 4:
                return "قيد التوصيل";
            case 5:
                return "مكتمل";
            default:
                return "غير معروف";
        }
    };



    return (
        <>
            <TableRow>
                <TableCell align="center">
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{row.user_name}</TableCell>
                <TableCell align="center">{row.country}</TableCell>
                <TableCell align="center">{row.phone_number}</TableCell>
                <TableCell align="center">{row.shipping_method}</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bolder' }}>#{row.id}</TableCell>
                <TableCell align="center">{row.total_price}</TableCell>
                {/* <TableCell align="center">
                    <Button variant="contained" color="primary" onClick={handleChangeStatus}>
                        تغيير الحالة ({getStatusText(orderStatus)})
                    </Button>
                </TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">Product</TableCell>
                                        <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">Price</TableCell>
                                        <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">Size</TableCell>
                                        <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">Color</TableCell>
                                        <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">Main Form</TableCell>
                                        <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">Additional Form</TableCell>
                                        <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">Note Form</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products.map((product, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{product.product_name}</TableCell>
                                            <TableCell align="center">{product.price}</TableCell>
                                            <TableCell align="center">{product.size}</TableCell>
                                            <TableCell align="center">{product.color}</TableCell>
                                            <TableCell align="center">{formatJSON(product.main_form)}</TableCell>
                                            <TableCell align="center">{formatJSON(product.additional_form)}</TableCell>
                                            <TableCell align="center">{formatJSON(product.note_form)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const CollapsibleTable: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [rows, setRows] = useState<ShippingData[]>([]);

    const { t, i18n } = useTranslation();

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // جلب البيانات من الـ API عند تحميل الصفحة
    useEffect(() => {
        const fetchShippingData = async () => {
            try {
                const response = await fetch('https://babyhumod.shop/api/shippings/status-1'); // ضع رابط الـ API هنا
                const data = await response.json();
                if (data.success) {

                    console.log('ana heanjn sjfiro', data.data);
                    setRows(data.data);

                } else {
                    console.error('Error fetching data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchShippingData();
    }, []);

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
                    type="text" placeholder={i18n.language === 'ar' ? 'بحث' : 'search'}
                />
                <SearchIcon sx={{
                    position: 'absolute',
                    left: '0%',
                    top: '21%',
                    width: '25%',
                }} />
            </Box>

            <Box sx={{
                padding: '0 20px'
            }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align='center'> {t('ordersManagment.clientName')} </TableCell>
                                <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center"> {t('ordersManagment.country')} </TableCell>
                                <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center"> {t('ordersManagment.phoneNumber')}  </TableCell>
                                <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center"> {t('ordersManagment.shippingWay')} </TableCell>
                                <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">ID</TableCell>
                                <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center"> {t('ordersManagment.totalPrice')} </TableCell>
                                {/* <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">إجراء</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <Requests key={row.id} row={row} />
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
    );
};

export default CollapsibleTable;
