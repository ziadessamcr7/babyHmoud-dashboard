import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

const ConnectPorducts = () => {


    const { t } = useTranslation();


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    // const [categories, setCategories] = useState([]);
    const [productId, setProductId] = useState(0);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState("");


    // لجروبات الألوان
    const [groupColors, setGroupColors] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [currentGroup, setCurrentGroup]: any = useState(null);

    // لجروبات الأحجام
    const [sizeGroups, setSizeGroups] = useState([]);
    const [selectedSizeGroup, setSelectedSizeGroup] = useState("");
    const [currentSizeGroup, setCurrentSizeGroup]: any = useState(null);

    // للفورم الطفل (القديم)
    const [childForms, setChildForms] = useState([]);
    const [selectedChildForm, setSelectedChildForm] = useState("");
    const [currentChildForm, setCurrentChildForm]: any = useState(null);

    // للفورم الإضافية (الجديد)
    const [selectedAdditionalForm, setSelectedAdditionalForm] = useState("");
    const [currentAdditionalForm, setCurrentAdditionalForm]: any = useState(null);

    const BASE_URL = 'https://babyhumod.shop/api/products';
    const IMAGE_BASE_URL = 'https://babyhumod.shop/public/storage/';

    // دوال فتح وإغلاق المودالات
    const handleOpen = (type: any, product: any) => {
        setModalType(type);
        setOpen(true);
        setProductId(product.id);
        if (type === "groupColors") {
            fetchCurrentGroup(product.id);
        } else if (type === "groupSizes") {
            fetchCurrentSizeGroup(product.id);
        } else if (type === "childForm") {
            fetchCurrentChildForm(product.id);
        } else if (type === "additionalForm") {
            fetchCurrentAdditionalForm(product.id);
        }
    };

    const handleClose = () => {
        setOpen(false);
        // إعادة تعيين القيم الخاصة بالجروبات والفورمات عند الإغلاق
        setSelectedGroup("");
        setCurrentGroup(null);
        setSelectedSizeGroup("");
        setCurrentSizeGroup(null);
        setSelectedChildForm("");
        setCurrentChildForm(null);
        setSelectedAdditionalForm("");
        setCurrentAdditionalForm(null);
    };

    // جروبات الألوان
    const getAllColorGroups = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://babyhumod.shop/api/groups');
            setGroupColors(response.data);
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء جلب جروبات الألوان');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCurrentGroup = async (prodId: any) => {
        try {
            const response = await axios.get(`https://babyhumod.shop/api/product/${prodId}/group`);
            setCurrentGroup(response.data);
        } catch (error) {
            console.error(error);
            setCurrentGroup(null);
        }
    };

    const handleUpdateGroup = async () => {
        if (!selectedGroup) {
            toast.error("يرجى اختيار جروب");
            return;
        }
        try {
            if (!currentGroup) {
                await axios.post(`https://babyhumod.shop/api/groups/${selectedGroup}/product`, {
                    product_id: productId
                });
                toast.success("تم إضافة الجروب بنجاح");
            } else {
                await axios.put(`https://babyhumod.shop/api/product/${productId}/group`, {
                    group_id: selectedGroup
                });
                toast.success("تم تعديل الجروب بنجاح");
            }
            fetchCurrentGroup(productId);
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء تحديث الجروب");
        }
    };

    const handleRemoveGroup = async () => {
        try {
            await axios.put(`https://babyhumod.shop/api/product/${productId}/group`, {
                group_id: null
            });
            toast.success("تم إلغاء ربط الجروب");
            setCurrentGroup(null);
            setSelectedGroup("");
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء إلغاء الربط");
        }
    };

    // جروبات الأحجام
    const getAllSizeGroups = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://babyhumod.shop/api/size-groups');
            setSizeGroups(response.data);
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء جلب جروبات الأحجام');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCurrentSizeGroup = async (prodId: any) => {
        try {
            const response = await axios.get(`https://babyhumod.shop/api/product/${prodId}/size-group`);
            setCurrentSizeGroup(response.data);
        } catch (error) {
            console.error(error);
            setCurrentSizeGroup(null);
        }
    };

    const handleUpdateSizeGroup = async () => {
        if (!selectedSizeGroup) {
            toast.error("يرجى اختيار جروب");
            return;
        }
        try {
            if (!currentSizeGroup) {
                await axios.post(`https://babyhumod.shop/api/size-groups/${selectedSizeGroup}/product`, {
                    product_id: productId
                });
                toast.success("تم إضافة الجروب بنجاح");
            } else {
                await axios.put(`https://babyhumod.shop/api/product/${productId}/size-group`, {
                    group_id: selectedSizeGroup
                });
                toast.success("تم تعديل الجروب بنجاح");
            }
            fetchCurrentSizeGroup(productId);
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء تحديث الجروب");
        }
    };

    const handleRemoveSizeGroup = async () => {
        try {
            await axios.put(`https://babyhumod.shop/api/product/${productId}/size-group`, {
                group_id: null
            });
            toast.success("تم إلغاء ربط الجروب");
            setCurrentSizeGroup(null);
            setSelectedSizeGroup("");
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء إلغاء الربط");
        }
    };

    // الفورم الطفل (القديم)
    const getAllChildForms = async () => {
        try {
            const response = await axios.get('https://babyhumod.shop/api/forms');
            setChildForms(response.data);
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء جلب النماذج");
        }
    };

    const fetchCurrentChildForm = async (prodId: any) => {
        try {
            const response = await axios.get(`https://babyhumod.shop/api/product/${prodId}/form`);
            setCurrentChildForm(response.data);
        } catch (error) {
            console.error(error);
            setCurrentChildForm(null);
        }
    };

    const handleUpdateChildForm = async () => {
        if (!selectedChildForm) {
            toast.error("يرجى اختيار الفورم");
            return;
        }
        try {
            // تعديل الفورم يتم عن طريق POST كما هو موجود (دون زر إلغاء الربط)
            await axios.post(`https://babyhumod.shop/api/product/${productId}/form`, {
                form_id: selectedChildForm
            });
            toast.success("تم تعديل الفورم بنجاح");
            fetchCurrentChildForm(productId);
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء تحديث الفورم");
        }
    };

    // الفورم الإضافية (الجديد)
    const fetchCurrentAdditionalForm = async (prodId: any) => {
        try {
            const response = await axios.get(`https://babyhumod.shop/api/product/${prodId}/additional-form`);
            // التحقق من وجود الفورم الإضافية
            if (response.data.has_additional_form) {
                setCurrentAdditionalForm(response.data.form);
            } else {
                setCurrentAdditionalForm(null);
            }
        } catch (error) {
            console.error(error);
            setCurrentAdditionalForm(null);
        }
    };

    const handleUpdateAdditionalForm = async () => {
        if (!selectedAdditionalForm) {
            toast.error("يرجى اختيار الفورم");
            return;
        }
        try {
            await axios.put(`https://babyhumod.shop/api/product/${productId}/additional-form`, {
                form_id: selectedAdditionalForm
            });
            toast.success("تم تعديل الفورم بنجاح");
            fetchCurrentAdditionalForm(productId);
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء تحديث الفورم");
        }
    };

    const handleRemoveAdditionalForm = async () => {
        try {
            await axios.delete(`https://babyhumod.shop/api/product/${productId}/additional-form`);
            toast.success("تم إلغاء ربط الفورم");
            setCurrentAdditionalForm(null);
            setSelectedAdditionalForm("");
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء إلغاء الربط");
        }
    };

    // باقي دوال المنتجات والتصنيفات
    const getAllProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(BASE_URL);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء جلب المنتجات');
        } finally {
            setIsLoading(false);
        }
    };

    // const getAllCategories = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.get('https://babyhumod.shop/api/categories');
    //         // setCategories(response.data);
    //     } catch (error) {
    //         console.error(error);
    //         toast.error('حدث خطأ أثناء جلب التصنيفات');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // دالة حذف المنتج
    const deleteProduct = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`${BASE_URL}/${productId}`);
            toast.success('تم حذف المنتج بنجاح');
            getAllProducts();
            handleClose();
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء حذف المنتج');
        } finally {
            setIsLoading(false);
        }
    };










    // تغيير الصفحة والصفوف في الجدول
    const handleChangePage = (_event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    // إرجاع أيقونة المودال بناءً على النوع
    const renderModalIcon = () => {
        switch (modalType) {
            case 'delete':
                return <DeleteIcon sx={{ fontSize: 40, color: 'red' }} />;
            case 'groupColors':
                return <ColorLensIcon sx={{ fontSize: 40, color: '#1976d2' }} />;
            case 'groupSizes':
                return <FormatSizeIcon sx={{ fontSize: 80, color: '#388e3c' }} />;
            case 'childForm':
                return <ChildCareIcon sx={{ fontSize: 40, color: '#f57c00' }} />;
            case 'additionalForm':
                return <InsertDriveFileIcon sx={{ fontSize: 40, color: '#2e7d32' }} />;
            case 'addForm':
                return <AddCircleIcon sx={{ fontSize: 40, color: '#2e7d32' }} />;
            case 'notesForm':
                return <NoteAltIcon sx={{ fontSize: 40, color: '#6a1b9a' }} />;
            default:
                return null;
        }
    };

    // عند تحميل المكون: جلب المنتجات، التصنيفات، جروبات الألوان، الأحجام والنماذج
    useEffect(() => {
        getAllProducts();
        // getAllCategories();
        getAllColorGroups();
        getAllSizeGroups();
        getAllChildForms();
    }, []);

    // مكون عرض صف واحد من المنتجات
    const ClientsData = ({ row }: any) => {
        return (
            <TableRow>
                <TableCell align='center'>
                    <span style={{ display: 'flex', padding: '7px', fontWeight: 'bold', flexDirection: 'column' }}>
                        <small>{row.name}</small>
                        <small style={{ color: 'gray' }}>{row.name_en}</small>
                    </span>
                </TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center" style={{ width: '180px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    <span title={row.description}>
                        {row.description?.slice(0, 20) + '...'}
                    </span>
                </TableCell>
                <TableCell align="center">
                    <img src={IMAGE_BASE_URL + row.main_image} width={80} height={80} alt="" />
                </TableCell>
                <TableCell style={{ fontWeight: 'bolder' }} align="center">
                    {row.category?.name}
                    <small style={{ color: 'gray', display: 'block' }}>{row.category.name_en}</small>

                </TableCell>
                <TableCell style={{ fontWeight: 'bolder' }} align="center">
                    {/* <span onClick={() => handleOpen("delete", row)} style={{ cursor: 'pointer' }}>
                        <img src="/assets/imgs/trash.svg" alt="delete" />
                    </span>
                    <span onClick={() => updateForm(row)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        <img src="/assets/imgs/edit.svg" alt="edit" />
                    </span> */}
                    <span onClick={() => handleOpen("groupColors", row)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        <ColorLensIcon />
                    </span>
                    <span onClick={() => handleOpen("groupSizes", row)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        <FormatSizeIcon />
                    </span>
                    <span onClick={() => handleOpen("childForm", row)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        <ChildCareIcon />
                    </span>
                    <span onClick={() => handleOpen("additionalForm", row)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        <InsertDriveFileIcon />
                    </span>
                    {/* <span onClick={() => handleOpen("addForm", row)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        <AddCircleIcon />
                    </span>
                    <span onClick={() => handleOpen("notesForm", row)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        <NoteAltIcon />
                    </span> */}
                </TableCell>
            </TableRow>
        );
    };

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                <Box sx={{ width: 400, p: 3, bgcolor: "white", mx: "auto", mt: "20vh", borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {renderModalIcon()}
                        <Typography id="modal-title" variant="h6" component="h2" sx={{ ml: 1 }}>
                            {modalType === "delete" && "حذف المنتج"}
                            {modalType === "groupColors" && "مجموعة الألوان"}
                            {modalType === "groupSizes" && "الأحجام"}
                            {modalType === "childForm" && "فورم الطفل"}
                            {modalType === "additionalForm" && "الفورم الإضافية"}
                            {modalType === "addForm" && "فورم الإضافة"}
                            {modalType === "notesForm" && "فورم الملاحظات"}
                        </Typography>
                    </Box>

                    {modalType === "groupColors" && (
                        <>
                            <Typography sx={{ mb: 2 }}>
                                <strong>الجروب الحالي:</strong> {currentGroup ? currentGroup.name : "لا يوجد"}
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="group-select-label">اختر جروب</InputLabel>
                                <Select
                                    labelId="group-select-label"
                                    value={selectedGroup}
                                    label="اختر جروب"
                                    onChange={(e) => setSelectedGroup(e.target.value)}
                                >
                                    {groupColors.map((group: any) => (
                                        <MenuItem key={group.id} value={group.id}>
                                            {group.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                <Button onClick={handleUpdateGroup} variant="contained">تحديث</Button>
                                <Button onClick={handleRemoveGroup} variant="contained" color="error">إلغاء الربط</Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button onClick={handleClose} variant="contained">إغلاق</Button>
                            </Box>
                        </>
                    )}

                    {modalType === "groupSizes" && (
                        <>
                            <Typography sx={{ mb: 2 }}>
                                <strong>الجروب الحالي:</strong> {currentSizeGroup ? currentSizeGroup.name : "لا يوجد"}
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="size-group-select-label">اختر جروب</InputLabel>
                                <Select
                                    labelId="size-group-select-label"
                                    value={selectedSizeGroup}
                                    label="اختر جروب"
                                    onChange={(e) => setSelectedSizeGroup(e.target.value)}
                                >
                                    {sizeGroups.map((group: any) => (
                                        <MenuItem key={group.id} value={group.id}>
                                            {group.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                <Button onClick={handleUpdateSizeGroup} variant="contained">تحديث</Button>
                                <Button onClick={handleRemoveSizeGroup} variant="contained" color="error">إلغاء الربط</Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button onClick={handleClose} variant="contained">إغلاق</Button>
                            </Box>
                        </>
                    )}

                    {modalType === "childForm" && (
                        <>
                            <Typography sx={{ mb: 2 }}>
                                <strong>الفورم الحالي:</strong> {currentChildForm ? currentChildForm.name : "لا يوجد"}
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="child-form-select-label">اختر الفورم</InputLabel>
                                <Select
                                    labelId="child-form-select-label"
                                    value={selectedChildForm}
                                    label="اختر الفورم"
                                    onChange={(e) => setSelectedChildForm(e.target.value)}
                                >
                                    {childForms.map((form: any) => (
                                        <MenuItem key={form.id} value={form.id}>
                                            {form.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                <Button onClick={handleUpdateChildForm} variant="contained">تحديث</Button>
                                {/* تمت إزالة زر إلغاء الربط من فورم الطفل */}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button onClick={handleClose} variant="contained">إغلاق</Button>
                            </Box>
                        </>
                    )}

                    {modalType === "additionalForm" && (
                        <>
                            <Typography sx={{ mb: 2 }}>
                                <strong>الفورم الحالي:</strong> {currentAdditionalForm ? currentAdditionalForm.name : "لا يوجد"}
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="additional-form-select-label">اختر الفورم</InputLabel>
                                <Select
                                    labelId="additional-form-select-label"
                                    value={selectedAdditionalForm}
                                    label="اختر الفورم"
                                    onChange={(e) => setSelectedAdditionalForm(e.target.value)}
                                >
                                    {childForms.map((form: any) => (
                                        <MenuItem key={form.id} value={form.id}>
                                            {form.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                <Button onClick={handleUpdateAdditionalForm} variant="contained">تحديث</Button>
                                <Button onClick={handleRemoveAdditionalForm} variant="contained" color="error">إلغاء الربط</Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button onClick={handleClose} variant="contained">إغلاق</Button>
                            </Box>
                        </>
                    )}

                    {modalType === "delete" && (
                        <>
                            <Typography sx={{ mb: 2 }}>
                                <h3>هل أنت متأكد من حذف هذا المنتج؟</h3>
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Button onClick={handleClose} variant="contained">إغلاق</Button>
                                <Button onClick={deleteProduct} variant="contained" color="error">حذف</Button>
                            </Box>
                        </>
                    )}

                    {/* يمكن تكرار نماذج المودالات الأخرى (addForm, notesForm) بنفس النمط */}
                </Box>
            </Modal>



            <Box sx={{ px: 3 }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ margin: '0 10px' }}> {t('connectProducts.producList')} </span>
                        <h3 style={{
                            width: '35px',
                            height: '35px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(245, 245, 221, 1)',
                            borderRadius: '50%'
                        }}>
                            {products.length}
                        </h3>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder='بحث'
                            style={{
                                padding: '5px 30px 5px 10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                        <SearchIcon sx={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#777'
                        }} />
                    </div>
                </Typography>
            </Box>

            {isLoading ? (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <BeatLoader color="#8B5A2B" />
                </div>
            ) : (
                <Box sx={{ px: 3 }}>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #eee' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'> {t('connectProducts.productName')} </TableCell>
                                    <TableCell align="center"> {t('connectProducts.productPrice')} </TableCell>
                                    <TableCell align="center"> {t('connectProducts.productDescription')} </TableCell>
                                    <TableCell align="center"> {t('connectProducts.productImg')} </TableCell>
                                    <TableCell align="center"> {t('connectProducts.productCategory')} </TableCell>
                                    <TableCell align="center"> Actions </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                                    <ClientsData key={row.id} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[2, 5, 10]}
                            component="div"
                            count={products.length}
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

export default ConnectPorducts;
