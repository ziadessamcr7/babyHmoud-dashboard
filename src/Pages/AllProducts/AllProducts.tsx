import React, { useEffect, useState } from 'react';
import './AllProducts.css';
import {
  Avatar,
  Box,
  Button,
  Grid,
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
  Typography
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

const AllProducts = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [btnState, setBtnState] = useState('addBtn');
  const [mainImage, setMainImage] = useState('');
  const [mainImageFile, setMainImageFile] = useState(null);
  const [subImages, setSubImages]: any = useState([]);
  const [existingSubImages, setExistingSubImages] = useState([]);
  const [subImageFiles, setSubImageFiles]: any = useState([]);
  const [deletedSubImages, setDeletedSubImages] = useState([]);

  const BASE_URL = 'https://babyhumod.shop/api/products';
  const IMAGE_BASE_URL = 'https://babyhumod.shop/public/storage/';

  const handleOpen = (type: any, product: any) => {
    setModalType(type);
    setOpen(true);
    setProductId(product.id);
  };

  const handleClose = () => setOpen(false);

  const ClientsData = ({ row }: any) => {
    // إذا كانت اللغة الإنجليزية مفعلة ويتم توافر الاسم أو الوصف الإنجليزي فنعرضهم
    const displayName = i18n.language === 'en' && row.name_en ? row.name_en : row.name;
    const displayDescription = i18n.language === 'en' && row.description_en
      ? row.description_en
      : (row.description && row.description.length > 20 ? row.description.slice(0, 20) + '...' : row.description);
    return (
      <TableRow>
        <TableCell align='center'>
          <span style={{ display: 'flex', padding: '7px', fontWeight: 'bold', flexDirection: 'column' }}>
            <small>{displayName}</small>
          </span>
        </TableCell>
        <TableCell align="center">{row.price}</TableCell>
        <TableCell align="center" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          <span style={{ width: '180px', display: 'block' }} title={row.description}>
            {displayDescription.slice(0, 30) + '..'}
          </span>
        </TableCell>
        <TableCell align="center">
          <img src={IMAGE_BASE_URL + row.main_image} width={80} height={80} alt="" />
        </TableCell>
        <TableCell style={{ fontWeight: 'bolder' }} align="center">
          {row.category?.name}
        </TableCell>
        <TableCell style={{ fontWeight: 'bolder' }} align="center">
          <span onClick={() => handleOpen("delete", row)} style={{ cursor: 'pointer' }}>
            <img src="/assets/imgs/trash.svg" alt="" />
          </span>
          <span onClick={() => updateForm(row)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            <img src="/assets/imgs/edit.svg" alt="" />
          </span>
        </TableCell>
      </TableRow>
    );
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'start',
    borderRadius: 0,
    boxShadow: 'none',
    height: '100%',
    color: theme.palette.text.secondary
  }));

  // رفع الصورة الرئيسية
  const handleMainImageUpload = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setValue('main_image', file);
      setMainImage(URL.createObjectURL(file));
      setMainImageFile(file);
      console.log('تم تحميل الصورة الرئيسية:', file.name);
    }
  };

  // رفع الصور الفرعية الجديدة
  const handleSubImagesUpload = (event: any) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      const previewUrls = uploadedFiles.map(file => URL.createObjectURL(file));
      setSubImages(prev => [...prev, ...previewUrls]);
      setSubImageFiles(prev => [...prev, ...uploadedFiles]);
      console.log('تمت إضافة صور إضافية:', uploadedFiles.map(file => file.name));
    }
  };

  // إزالة صورة فرعية
  const removeSubImage = (index: any) => {
    const newSubImages = [...subImages];
    const imageToRemove = newSubImages[index];

    if (imageToRemove.startsWith(IMAGE_BASE_URL)) {
      const imagePath = imageToRemove.replace(IMAGE_BASE_URL, '');
      setDeletedSubImages(prev => [...prev, imagePath]);
      setExistingSubImages(prev => prev.filter(img => IMAGE_BASE_URL + img !== imageToRemove));
    } else {
      setSubImageFiles(prev => {
        const newFiles = [...prev];
        newFiles.splice(index - existingSubImages.length, 1);
        return newFiles;
      });
    }
    newSubImages.splice(index, 1);
    setSubImages(newSubImages);
  };

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(BASE_URL);
      setProducts(response.data);
      console.log('pordssss', response.data);

    } catch (error) {
      console.error(error);
      toast.error(t('allProducts.fetchError'));
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://babyhumod.shop/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      toast.error(t('allProducts.fetchCategoriesError'));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${productId}`);
      toast.success(t('allProducts.deleteSuccess'));
      getAllProducts();
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(t('allProducts.deleteError'));
    } finally {
      setIsLoading(false);
    }
  };

  // تعبئة النموذج بالبيانات عند التعديل
  const updateForm = (product) => {
    setValue('name', product.name);
    setValue('name_en', product.name_en || ''); // الحقل الإنجليزي
    setValue('price', product.price);
    setValue('description', product.description);
    setValue('description_en', product.description_en || ''); // الحقل الإنجليزي
    setValue('category_id', product.category_id);
    setValue('weight', product.weight);
    setMainImage(IMAGE_BASE_URL + product.main_image);
    setMainImageFile(null);
    if (product.sub_images && product.sub_images.length > 0) {
      const subImagesUrls = product.sub_images.map((img) => IMAGE_BASE_URL + img);
      setSubImages(subImagesUrls);
      setExistingSubImages(product.sub_images);
    } else {
      setSubImages([]);
      setExistingSubImages([]);
    }
    setSubImageFiles([]);
    setDeletedSubImages([]);
    setBtnState('updateBtn');
    setProductId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    reset();
    setMainImage('');
    setMainImageFile(null);
    setSubImages([]);
    setSubImageFiles([]);
    setExistingSubImages([]);
    setDeletedSubImages([]);
    setBtnState('addBtn');
    setProductId(0);
  };

  // إرسال البيانات إلى API مع تضمين الحقول الإنجليزية
  const submitForm = async (data: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('name_en', data.name_en);
    formData.append('price', data.price);
    formData.append('weight', data.weight);
    formData.append('description', data.description);
    formData.append('description_en', data.description_en);
    formData.append('category_id', data.category_id);
    formData.append('status', '1');

    if (btnState === 'addBtn') {
      if (mainImageFile) {
        formData.append('main_image', mainImageFile);
      } else {
        toast.error(t('allProducts.mainImageRequired'));
        setIsLoading(false);
        return;
      }
    } else {
      if (mainImageFile) {
        formData.append('main_image', mainImageFile);
      } else {
        const existingImagePath = mainImage.replace(IMAGE_BASE_URL, '');
        formData.append('existing_main_image', existingImagePath);
      }
    }

    if (existingSubImages.length > 0) {
      existingSubImages.forEach((img, index) => {
        formData.append(`existing_sub_images[${index}]`, img);
      });
    }
    if (subImageFiles.length > 0) {
      subImageFiles.forEach((file, index) => {
        formData.append(`sub_images[${index}]`, file);
      });
    }
    if (deletedSubImages.length > 0) {
      deletedSubImages.forEach((imagePath, index) => {
        formData.append(`deleted_sub_images[${index}]`, imagePath);
      });
    }

    if (btnState === 'updateBtn') {
      formData.append('_method', 'PUT');
    }

    try {
      const url = btnState === 'addBtn' ? BASE_URL : `${BASE_URL}/${productId}`;
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(btnState === 'addBtn' ? t('allProducts.addSuccess') : t('allProducts.updateSuccess'));
      resetForm();
      getAllProducts();
    } catch (error) {
      console.error(error);
      toast.error(t('allProducts.submitError'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

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

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={{ width: 400, p: 3, bgcolor: "white", mx: "auto", mt: "20vh", borderRadius: 2 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            {modalType === "delete" && t('allProducts.deleteProductTitle')}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalType === "delete" &&
              <>
                <h3>{t('allProducts.deleteProductMessage')}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Button onClick={handleClose} variant="contained">{t('allProducts.close')}</Button>
                  <Button onClick={deleteProduct} variant="contained" color="error">{t('allProducts.delete')}</Button>
                </div>
              </>
            }
          </Typography>
        </Box>
      </Modal>

      <Box sx={{ px: 3, pb: 2 }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/assets/imgs/circle-square.svg" width={35} height={35} alt="" />
          <span style={{ marginRight: '5px' }}>{t('allProducts.productsSettings')}</span>
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, px: 3 }}>
        <Grid container spacing={0} component="form" onSubmit={handleSubmit(submitForm)}>
          {/* القسم الخاص بالحقول العامة */}
          <Grid item xs={12} md={4}>
            <Item>
              <label style={{ display: 'block' }}>{t('allProducts.productNameArabic')}*</label>
              <input
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '7px',
                  borderRadius: '4px',
                  border: '1px solid black'
                }}
                type="text"
                placeholder={t('allProducts.productNameArabicPlaceholder')}
                {...register('name', { required: true })}
              />
              {errors.name && <span style={{ color: 'red' }}>{t('allProducts.fieldRequired')}</span>}

              <label style={{ display: 'block', marginTop: '15px' }}>{t('allProducts.productNameEnglish')}*</label>
              <input
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '7px',
                  borderRadius: '4px',
                  border: '1px solid black'
                }}
                type="text"
                placeholder={t('allProducts.productNameEnglishPlaceholder')}
                {...register('name_en', { required: true })}
              />
              {errors.name_en && <span style={{ color: 'red' }}>{t('allProducts.fieldRequired')}</span>}

              <label style={{ display: 'block', marginTop: '15px' }}>{t('allProducts.productPrice')}*</label>
              <input
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '7px',
                  borderRadius: '4px',
                  border: '1px solid black'
                }}
                type="number"
                placeholder={t('allProducts.productPricePlaceholder')}
                {...register('price', { required: true })}
              />
              {errors.price && <span style={{ color: 'red' }}>{t('allProducts.fieldRequired')}</span>}

              <label style={{ display: 'block', marginTop: '15px' }}>{t('allProducts.productWeight')}*</label>
              <input
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '7px',
                  borderRadius: '4px',
                  border: '1px solid black'
                }}
                type="number"
                placeholder={t('allProducts.productWeightPlaceholder')}
                {...register('weight', { required: true })}
              />
              {errors.weight && <span style={{ color: 'red' }}>{t('allProducts.fieldRequired')}</span>}

              <label style={{ display: 'block', marginTop: '15px' }}>{t('allProducts.productDescriptionArabic')}*</label>
              <textarea
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '7px',
                  borderRadius: '4px',
                  border: '1px solid black',
                  minHeight: '100px'
                }}
                placeholder={t('allProducts.productDescriptionArabicPlaceholder')}
                {...register('description', { required: true })}
              />
              {errors.description && <span style={{ color: 'red' }}>{t('allProducts.fieldRequired')}</span>}

              <label style={{ display: 'block', marginTop: '15px' }}>{t('allProducts.productDescriptionEnglish')}*</label>
              <textarea
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '7px',
                  borderRadius: '4px',
                  border: '1px solid black',
                  minHeight: '100px'
                }}
                placeholder={t('allProducts.productDescriptionEnglishPlaceholder')}
                {...register('description_en', { required: true })}
              />
              {errors.description_en && <span style={{ color: 'red' }}>{t('allProducts.fieldRequired')}</span>}

              <label style={{ display: 'block', marginTop: '15px' }}>{t('allProducts.productCategory')}*</label>
              <select
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '7px',
                  borderRadius: '4px',
                  border: '1px solid black'
                }}
                {...register('category_id', { required: true })}
              >
                <option value="">{t('allProducts.chooseCategory')}</option>
                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {errors.category_id && <span style={{ color: 'red' }}>{t('allProducts.fieldRequired')}</span>}
            </Item>
          </Grid>

          {/* الصورة الرئيسية */}
          <Grid item xs={12} md={4}>
            <Item>
              <ImagePlaceholder sx={{ width: '75%', margin: 'auto' }}>
                <Avatar
                  sx={{ width: '100%', height: '100%', borderRadius: '0', bgcolor: '#e9ecef' }}
                  src={mainImage || undefined}
                >
                  {!mainImage && <ImageIcon sx={{ fontSize: 50, color: '#adb5bd' }} />}
                </Avatar>
              </ImagePlaceholder>

              <label style={{ display: 'block', marginTop: '20px' }}>{t('allProducts.mainImage')}{btnState === 'addBtn' && '*'}</label>
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
                onChange={handleMainImageUpload}
              />
            </Item>
          </Grid>

          {/* الصور الفرعية */}
          <Grid item xs={12} md={4}>
            <Item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
              <div style={{ width: '100%', maxHeight: '400px', overflowY: 'auto' }}>
                {subImages.map((img, index) => (
                  <div key={index} style={{ marginBottom: '15px', position: 'relative' }}>
                    <ImagePlaceholder sx={{ width: '100%', height: '120px' }}>
                      <Avatar
                        sx={{ width: '100%', height: '100%', borderRadius: '0', bgcolor: '#e9ecef' }}
                        src={img}
                      >
                        <ImageIcon sx={{ fontSize: 50, color: '#adb5bd' }} />
                      </Avatar>
                    </ImagePlaceholder>
                    <button
                      type="button"
                      onClick={() => removeSubImage(index)}
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '25px',
                        height: '25px',
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <label style={{ display: 'block', marginTop: '15px' }}>{t('allProducts.subImages')}</label>
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
                multiple
                onChange={handleSubImagesUpload}
              />
            </Item>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              type="button"
              onClick={resetForm}
              variant="outlined"
              sx={{ mx: 1, minWidth: '120px', backgroundColor: 'transparent', color: '#8B5A2B', borderColor: '#8B5A2B' }}
            >
              {t('allProducts.reset')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ mx: 1, minWidth: '120px', backgroundColor: '#8B5A2B', color: 'white' }}
              disabled={isLoading}
            >
              {isLoading ? t('allProducts.processing') : btnState === 'addBtn' ? t('allProducts.add') : t('allProducts.update')}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ px: 3 }}>
        <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              {products.length}
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
                  <TableCell align='center'>{t('allProducts.tableHeader.name')}</TableCell>
                  <TableCell align="center">{t('allProducts.tableHeader.price')}</TableCell>
                  <TableCell align="center">{t('allProducts.tableHeader.description')}</TableCell>
                  <TableCell align="center">{t('allProducts.tableHeader.image')}</TableCell>
                  <TableCell align="center">{t('allProducts.tableHeader.category')}</TableCell>
                  <TableCell align="center">{t('allProducts.tableHeader.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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

export default AllProducts;
