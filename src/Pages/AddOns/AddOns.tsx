import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  Avatar,
  Grid
} from '@mui/material';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

const BASE_URL: any = 'https://babyhumod.shop/api/extra-products';
const IMAGE_BASE_URL: any = 'https://babyhumod.shop/public/storage/';

interface ExtraProduct {
  id: number;
  name: string;
  name_en?: string;
  price: number;
  image: string;
  product_id: number;
}

interface Product {
  id: number;
  name: string;
  name_en?: string;
}

// interface Category {
//   id: number;
//   name: string;
//   name_en?: string;
// }

// تعريف Item مرة واحدة فقط
const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'start',
  color: theme.palette.text.secondary,
  borderRadius: 0,
  boxShadow: 'none',
  height: '100%',
}));

const FieldLabel = styled(Typography)(({ theme }: any) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 'medium',
  textAlign: 'right',
  direction: 'rtl',
}));

const StyledPaper = styled(Paper)(({ theme }: any) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(0),
  margin: '0 25px'
}));

const ImagePlaceholder = styled(Box)(({ theme }: any) => ({
  width: 180,
  height: 220,
  backgroundColor: '#f8f9fa',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2)
}));

const StyledButton = styled(Button)(({ theme, color }: any) => ({
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

const AddOns = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<any>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<any>(null);

  // Table pagination
  const [page, setPage] = useState<any>(0);
  const [rowsPerPage, setRowsPerPage] = useState<any>(2);

  // Data state
  const [extraProducts, setExtraProducts] = useState<ExtraProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  // const [categories, setCategories] = useState<Category[]>([]);
  const [btnState, setBtnState] = useState<any>('add');
  const [currentProductId, setCurrentProductId] = useState<any>(null);

  // Modal state
  // const [modalType, setModalType] = useState<any>("");
  const [open, setOpen] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(true);

  // Fetch all extra products
  const fetchExtraProducts = async () => {
    try {
      const response: any = await axios.get(BASE_URL);
      setExtraProducts(response.data);
      console.log(' ssssssssss', response.data);

      setIsLoading(false);
    } catch (error: any) {
      toast.error(t('allProducts.fetchError'));
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response: any = await axios.get('https://babyhumod.shop/api/products');
      setProducts(response.data);
    } catch (error: any) {
      toast.error(t('allProducts.fetchProductsError'));
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories (المنتجات المرتبطة)
  // const fetchCategories = async () => {
  //   try {
  //     const res: any = await axios.get('https://babyhumod.shop/api/categories');
  //     // setCategories(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Handle form submission (add/update)
  const onSubmit = async (data: any) => {
    if (btnState === 'add' && !imageFile) {
      toast.error(t('allProducts.imageRequired'));
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('name_en', data.name_en);
    formData.append('price', data.price);
    formData.append('weight', data.weight);
    formData.append('description', data.description);
    formData.append('description_en', data.description_en);
    // استخدام الحقل product_id بدلاً من category_id
    formData.append('product_id', data.product_id);
    formData.append('status', '1');

    if (btnState === 'update' && currentProductId) {
      formData.append('_method', 'PUT');
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const url = btnState === 'add'
        ? BASE_URL
        : `${BASE_URL}/${currentProductId}`;

      await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success(btnState === 'add' ? t('allProducts.addSuccess') : t('allProducts.updateSuccess'));
      resetForm();
      fetchExtraProducts();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t(`allProducts.${btnState === 'add' ? 'addError' : 'updateError'}`);
      toast.error(errorMessage);
      console.error(error);
    }
  };

  // Handle image upload
  const handleImageUpload = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setValue('image', file);
    }
  };

  // Reset form
  const resetForm = () => {
    reset();
    setPreviewImage(null);
    setImageFile(null);
    setBtnState('add');
    setCurrentProductId(null);
  };

  // Prepare form for update
  const prepareUpdateForm = (product: any) => {
    setValue('name', product.name);
    setValue('name_en', product.name_en || '');
    setValue('price', product.price);
    setValue('description', product.description);
    setValue('description_en', product.description_en || '');
    // تعبئة حقل product_id بالمنتج المرتبط
    setValue('product_id', product.product_id);
    // هنا إذا كان لديك حقل وزن المنتج تأكد من تعبئته إذا كان متوفر
    setValue('weight', product.price); // مثال: قم بتعديل هذا بناءً على متغير الوزن الصحيح
    setPreviewImage(IMAGE_BASE_URL + product.image);
    setImageFile(null);
    setBtnState('update');
    setCurrentProductId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete extra product
  const deleteProduct = async () => {
    try {
      await axios.delete(`${BASE_URL}/${currentProductId}`);
      toast.success(t('allProducts.deleteSuccess'));
      handleClose();
      fetchExtraProducts();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t('allProducts.deleteError');
      toast.error(errorMessage);
      console.error(error);
    }
  };

  // Modal handlers
  const handleOpen = (type: any, product: any) => {
    // setModalType(type);
    console.log(type);

    setOpen(true);
    setCurrentProductId(product.id);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProductId(null);
  };

  // Table pagination handlers
  const handleChangePage = (_event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchExtraProducts();
    fetchProducts();
    // fetchCategories();
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
          borderRadius: 2
        }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {t('allProducts.deleteProductTitle')}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {t('allProducts.deleteProductMessage')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={handleClose} variant="outlined">
              {t('allProducts.close')}
            </Button>
            <Button onClick={deleteProduct} color="error" variant="contained">
              {t('allProducts.delete')}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Extra Product Form */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <StyledPaper>
          <Grid container spacing={0}>
            {/* Form Fields Column */}
            <Grid item xs={12} md={8}>
              <Item>
                <Grid container spacing={2} direction="column">
                  <Grid item>
                    <FieldLabel>{t('allProducts.productNameArabic')}*</FieldLabel>
                    <TextField
                      fullWidth
                      {...register('name', { required: true })}
                      variant="outlined"
                      size="small"
                      inputProps={{ dir: 'rtl' }}
                      error={!!errors.name}
                      helperText={errors.name && t('allProducts.fieldRequired')}
                    />
                  </Grid>
                  <Grid item>
                    <FieldLabel>{t('allProducts.productNameEnglish')}*</FieldLabel>
                    <TextField
                      fullWidth
                      {...register('name_en', { required: true })}
                      variant="outlined"
                      size="small"
                      inputProps={{ dir: 'rtl' }}
                      error={!!errors.name_en}
                      helperText={errors.name_en && t('allProducts.fieldRequired')}
                    />
                  </Grid>
                  <Grid item>
                    <FieldLabel>{t('allProducts.productPrice')}*</FieldLabel>
                    <TextField
                      fullWidth
                      {...register('price', {
                        required: true,
                        pattern: { value: /^\d+(\.\d{1,2})?$/, message: t('allProducts.pricePattern') }
                      })}
                      variant="outlined"
                      size="small"
                      inputProps={{ dir: 'rtl' }}
                      error={!!errors.price}
                      helperText={
                        errors.price
                          ? (typeof errors.price.message === 'string'
                            ? errors.price.message
                            : t('allProducts.fieldRequired'))
                          : ''
                      }

                    />
                  </Grid>
                  <Grid item>
                    <FieldLabel>{t('allProducts.productWeight')}*</FieldLabel>
                    <TextField
                      fullWidth
                      {...register('weight', { required: true })}
                      variant="outlined"
                      size="small"
                      inputProps={{ dir: 'rtl' }}
                      error={!!errors.weight}
                      helperText={errors.weight && t('allProducts.fieldRequired')}
                    />
                  </Grid>
                  <Grid item>
                    <FieldLabel>{t('allProducts.productDescriptionArabic')}*</FieldLabel>
                    <TextField
                      fullWidth
                      {...register('description', { required: true })}
                      variant="outlined"
                      size="small"
                      multiline
                      minRows={4}
                      inputProps={{ dir: 'rtl' }}
                      error={!!errors.description}
                      helperText={errors.description && t('allProducts.fieldRequired')}
                    />
                  </Grid>
                  <Grid item>
                    <FieldLabel>{t('allProducts.productDescriptionEnglish')}*</FieldLabel>
                    <TextField
                      fullWidth
                      {...register('description_en', { required: true })}
                      variant="outlined"
                      size="small"
                      multiline
                      minRows={4}
                      inputProps={{ dir: 'rtl' }}
                      error={!!errors.description_en}
                      helperText={errors.description_en && t('allProducts.fieldRequired')}
                    />
                  </Grid>
                  <Grid item>
                    <FieldLabel>{t('allProducts.productCategory')}*</FieldLabel>
                    <TextField
                      select
                      fullWidth
                      {...register('product_id', { required: true })}
                      variant="outlined"
                      size="small"
                      SelectProps={{
                        native: true,
                        dir: 'rtl'
                      }}
                      error={!!errors.product_id}
                      helperText={errors.product_id && t('allProducts.fieldRequired')}
                    >
                      <option value="">{t('allProducts.chooseProduct')}</option>
                      {products.map((product: any) => (
                        <option key={product.id} value={product.id}>
                          {i18n.language === 'en' && product.name_en ? product.name_en : product.name}
                        </option>
                      ))}
                    </TextField>
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
                <FieldLabel>{t('allProducts.mainImage')}{btnState === 'add' && '*'}</FieldLabel>
                <input
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    padding: '7px',
                    borderRadius: '4px',
                    border: '1px solid black'
                  }}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
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
              {t('allProducts.reset')}
            </StyledButton>
            <StyledButton
              color="primary"
              type="submit"
            >
              {isLoading ? t('allProducts.processing') : btnState === 'add' ? t('allProducts.add') : t('allProducts.update')}
            </StyledButton>
          </Box>
        </StyledPaper>
      </Box>

      {/* Extra Products Table */}
      <Box sx={{ padding: '0 20px', margin: '50px 0' }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ margin: '0 10px' }}>{t('allProducts.tableHeader.titleSection')}</span>
            <h3 style={{
              width: '35px',
              height: '35px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(245, 245, 221, 1)',
              borderRadius: '50%'
            }}>
              {extraProducts.length}
            </h3>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder={t('allProducts.searchPlaceholder')}
              style={{
                padding: '5px 30px 5px 10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            <SearchIcon style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#777'
            }} />
          </div>
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <BeatLoader color="#8B5A2B" />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #eee' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">{t('allProducts.tableHeader.name')}</TableCell>
                  <TableCell align="center">{t('allProducts.tableHeader.price')}</TableCell>
                  <TableCell align="center">{t('allProducts.tableHeader.image')}</TableCell>
                  <TableCell align="center">{t('allProducts.tableHeader.productName')}</TableCell>
                  <TableCell align="center">{t('allProducts.tableHeader.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {extraProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    const relatedProduct = products.find((p: any) => p.id === row.product_id);
                    const productName = relatedProduct
                      ? (i18n.language === 'en' && relatedProduct.name_en ? relatedProduct.name_en : relatedProduct.name)
                      : t('allProducts.unknownProduct');

                    return (
                      <TableRow key={row.id}>
                        <TableCell align="center">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">
                          {row.price}
                        </TableCell>
                        <TableCell align="center">
                          <img
                            src={IMAGE_BASE_URL + row.image}
                            width={80}
                            height={80}
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="center">
                          {productName}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Button onClick={() => handleOpen("delete", row)} color="error" size="small">
                              {t('allProducts.delete')}
                            </Button>
                            <Button onClick={() => prepareUpdateForm(row)} color="primary" size="small">
                              {t('allProducts.edit')}
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10]}
              component="div"
              count={extraProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ direction: 'ltr' }}
            />
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default AddOns;
