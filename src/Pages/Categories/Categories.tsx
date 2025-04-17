
import { useEffect, useState, memo } from 'react';
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
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ImageIcon from '@mui/icons-material/Image';
import { BeatLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

// Styled Components
const ImagePlaceholder = styled(Box)(({ theme }) => ({
  width: 80,
  height: 190,
  backgroundColor: '#f8f9fa',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2)
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'start',
  color: theme.palette.text.secondary,
  borderRadius: '0',
  boxShadow: 'none',
  height: '100%',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



// Component for Input fields in form (with memoization and i18n)
const CategoryInput = memo(({ label, name, register, errors, placeholder, type = "text" }: any) => {
  const { t } = useTranslation();
  return (
    <Box mb={2}>
      <Typography variant="body2" sx={{ textAlign: 'right', mb: 1, fontWeight: 600, direction: 'rtl' }}>
        {label}
      </Typography>
      <input
        style={{
          width: '100%',
          padding: '.4375rem',
          borderRadius: '.25rem',
          border: '.0625rem solid #ccc'
        }}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: true })}
      />
      {errors[name] && (
        <Typography variant="caption" color="error">
          {t('categories.fieldRequired')}
        </Typography>
      )}
    </Box>
  );
});
CategoryInput.displayName = "CategoryInput";

// Table Row Component
const CategoryRow = ({ row, handleOpen, updateForm }: any) => {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell align='center'>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
          <small style={{ fontWeight: 'bold' }}>{row.name}</small>
          {row.name_en && <small style={{ fontSize: '.75rem', color: '#888' }}>{row.name_en}</small>}
        </Box>
      </TableCell>
      <TableCell align="center">
        <img
          src={row.image}
          width={80}
          height={80}
          alt={t('categories.categoryAlt')}
        />
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <span onClick={() => handleOpen("delete", row)} style={{ cursor: 'pointer' }}>
            <img src="/assets/imgs/trash.svg" alt={t('categories.deleteAlt')} />
          </span>
          <span onClick={() => handleOpen("toggle", row)} style={{ cursor: 'pointer', margin: '0 .4375rem' }}>
            {row.status === 'archived' ? (
              <img src="/assets/imgs/lock.svg" alt={t('categories.lockedAlt')} />
            ) : (
              <img src="/assets/imgs/unlocked.svg" alt={t('categories.unlockedAlt')} />
            )}
          </span>
          <span onClick={() => updateForm(row)} style={{ cursor: 'pointer' }}>
            <img src="/assets/imgs/edit.svg" alt={t('categories.editAlt')} />
          </span>
        </Box>
      </TableCell>
    </TableRow>
  );
};

const Categories = () => {
  const { t } = useTranslation();
  // Form Handling
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  // State Management
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [image, setImage] = useState('');
  const [btnState, setBtnState] = useState('addBtn');
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // Modal Handlers
  const handleOpen = (type: any, cat: any) => {
    setModalType(type);
    setOpen(true);
    if (type === 'delete') {
      setCategoryId(cat.id);
    } else if (type === 'toggle') {
      setCategoryId(cat.id);
    } else if (type === 'view') {
      setCategoryId(cat.id);
    }
  };

  const handleClose = () => setOpen(false);

  // Table Pagination Handlers
  const handleChangePage = (_event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Image Upload Handler
  const handelImgUpload = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setValue('image', file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // API Calls
  const getAllCategories = () => {
    setIsLoading(true);
    axios.get(`https://babyhumod.shop/api/categories`)
      .then((response) => {
        setCategories(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const deleteCategory = () => {
    setIsLoading(true);
    axios.delete(`https://babyhumod.shop/api/categories/${categoryId}`)
      .then(() => {
        setIsLoading(false);
        handleClose();
        toast.success(t('categories.deleteSuccess'));
        getAllCategories();
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        handleClose();
      });
  };

  const toggleStatus = () => {
    setIsLoading(true);
    axios.put(`https://babyhumod.shop/api/categories/${categoryId}/toggle-status`)
      .then((response) => {
        getAllCategories();
        handleClose();
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  // Form Handlers
  const updateForm = (row: any) => {
    setValue('name', row.name);
    setValue('name_en', row.name_en || '');
    setImage(row.image);
    setBtnState('updateBtn');
    setCategoryId(row.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    reset();
    setImage('');
    setBtnState('addBtn');
  };

  const submitFrom = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("name_en", data.name_en || "");
      formData.append("image", data.image || "");
      formData.append("status", "published");

      if (btnState === 'updateBtn') {
        formData.append("_method", "PUT");
      }

      const url = btnState === 'addBtn'
        ? "https://babyhumod.shop/api/categories"
        : `https://babyhumod.shop/api/categories/${categoryId}`;

      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(btnState === 'addBtn' ? t('categories.addSuccess') : t('categories.updateSuccess'));
      getAllCategories();
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);


  return (
    <>
      {/* Delete/Status Toggle Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          width: 400,
          p: 3,
          bgcolor: "white",
          mx: "auto",
          mt: "20vh",
          borderRadius: 2
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            {modalType === "view" && t('categories.toggleStatusTitle')}
            {modalType === "delete" && t('categories.deleteConfirmationTitle')}
          </Typography>

          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalType === "view" && (
              <div style={{ position: 'relative' }}>
                <h2 onClick={handleClose} style={{
                  position: 'absolute',
                  left: '0',
                  top: '-100%',
                  cursor: 'pointer'
                }}>
                  x
                </h2>

                <h5>{t('categories.toggleStatusMessage')}</h5>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'

                }}>
                  <Button
                    variant='contained'
                    style={{ cursor: 'pointer' }}
                    onClick={toggleStatus}
                  >
                    {t('categories.toggle')}
                  </Button>
                </div>
              </div>
            )}

            {modalType === "delete" && (
              <div style={{ position: 'relative' }}>
                <h2 onClick={handleClose} style={{
                  position: 'absolute',
                  left: '0',
                  top: '-100%',
                  cursor: 'pointer'
                }}>
                  x
                </h2>

                <h3>{t('categories.deleteConfirmationMessage')}</h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'

                }}>
                  <Button
                    variant='contained'
                    style={{ cursor: 'pointer' }}
                    onClick={deleteCategory}
                  >
                    {t('categories.delete')}
                  </Button>
                </div>
              </div>
            )}
          </Typography>
        </Box>
      </Modal>

      {/* Header Section */}
      <Box sx={{ px: 3, pb: 2 }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/assets/imgs/circle-square.svg" width={35} height={35} alt={t('categories.headerIconAlt')} />
          <span style={{ marginRight: '.3125rem' }}>
            {t('categories.settingsTitle')}
          </span>
        </Typography>
      </Box>

      {/* Category Form Section */}
      <Box sx={{ flexGrow: 1, px: 3 }}>
        <Grid container spacing={0} component="form" onSubmit={handleSubmit(submitFrom)}>
          <Grid item xs={4}>
            <Item>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="">
                {t('categories.addCategoryArabic')}
              </label>
              <input
                style={{
                  width: '100%',
                  marginTop: '.625rem',
                  padding: '.4375rem',
                  borderRadius: '.25rem',
                  border: '.0625rem solid black'
                }}
                type="text"
                placeholder={t('categories.categoryNameArabic')}
                {...register('name', { required: true })}
              />
              {errors.name && <span style={{ color: 'red' }}>{t('categories.fieldRequired')}</span>}

              <label style={{ display: 'block', marginTop: '1.25rem', fontWeight: 'bold' }} htmlFor="">
                {t('categories.addCategoryEnglish')}
              </label>
              <input
                style={{
                  width: '100%',
                  marginTop: '.625rem',
                  padding: '.4375rem',
                  borderRadius: '.25rem',
                  border: '.0625rem solid black'
                }}
                type="text"
                placeholder={t('categories.categoryNameEnglish')}
                {...register('name_en')}
              />

              <label style={{ display: 'block', marginTop: '1.25rem', fontWeight: 'bold' }} htmlFor="mainImg">
                {t('categories.categoryImage')}
              </label>
              <input
                style={{
                  width: '100%',
                  marginTop: '.625rem',
                  padding: '.4375rem',
                  borderRadius: '.25rem',
                  border: '.0625rem solid black'
                }}
                type="file"
                id="mainImg"
                accept="image/*"
                onChange={handelImgUpload}
              />
            </Item>
          </Grid>

          <Grid item xs={4}>
            <Item>
              <ImagePlaceholder sx={{
                width: '70%',
                borderRadius: '.625rem',
                margin: 'auto',
                overflow: 'hidden'
              }}>
                <Avatar sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0',
                  bgcolor: '#e9ecef'
                }}
                  src={image || undefined}
                >
                  {!image && <ImageIcon sx={{ fontSize: 50, color: '#adb5bd' }} />}
                </Avatar>
              </ImagePlaceholder>
            </Item>
          </Grid>

          <Grid item xs={4}>
            <Item sx={{ display: 'flex', alignItems: 'end', height: '100%' }}>
              <button
                style={{
                  border: '.0625rem solid brown',
                  padding: '.625rem',
                  width: '6.875rem',
                  borderRadius: '.4375rem',
                  backgroundColor: 'rgba(101, 73, 41, 1)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                {btnState === 'addBtn' ? t('categories.add') : t('categories.update')}
              </button>

              <button
                style={{
                  border: '.0625rem solid rgba(101, 73, 41, 1)',
                  padding: '.625rem',
                  width: '6.875rem',
                  borderRadius: '.4375rem',
                  margin: '0 .625rem',
                  backgroundColor: 'transparent',
                  cursor: 'pointer'
                }}
                type='button'
                onClick={resetForm}
              >
                {t('categories.reset')}
              </button>
            </Item>
          </Grid>
        </Grid>
      </Box>

      {/* Categories Table Section */}
      <Box sx={{ px: 3 }}>
        <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ margin: '0 .625rem' }}>{t('categories.tableHeader.titleSection')}</span>
            <h3 style={{
              width: '2.1875rem',
              height: '2.1875rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(245, 245, 221, 1)',
              borderRadius: '50%'
            }}>
              {categories.length}
            </h3>
          </div>
        </Typography>
      </Box>

      {/* Loading State or Table */}
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <BeatLoader margin={3} />
        </div>
      ) : (
        <Box sx={{ px: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align='center'>
                    {t('categories.tableHeader.name')}
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">
                    {t('categories.tableHeader.image')}
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(139, 144, 154, 1)' }} align="center">
                    {t('categories.tableHeader.actions')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <CategoryRow key={row.id} row={row} handleOpen={handleOpen} updateForm={updateForm} />
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10]}
              component="div"
              count={categories.length}
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

export default Categories;
