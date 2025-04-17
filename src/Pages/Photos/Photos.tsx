import { Avatar, Box, Button, Grid, Modal, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface SplashScreenData {
  id: number;
  title_ar: string;
  title_en: string;
  details_ar: string;
  details_en: string;
  image: string;
}

const BASE_URL = 'https://babyhumod.shop/public/api/splash-screen';

const Photos = () => {
  const { t, i18n } = useTranslation();

  // Form handling
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  // Data state
  const [allPicsArray, setAllPicsArray] = useState<SplashScreenData[]>([]);
  const [btnState, setBtnState] = useState<'add' | 'update'>('add');
  const [currentSplashId, setCurrentSplashId] = useState<number | null>(null);

  // Modal state
  // const [modalType, setModalType] = useState<"delete" | "">("");
  const [open, setOpen] = useState(false);

  // Styled components
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
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
  const fetchSplashScreens = async () => {
    try {
      const response = await axios.get('https://babyhumod.shop/api/splash-screens');
      console.log('reszzz', response.data.data);

      setAllPicsArray(response.data.data);
    } catch (error) {
      toast.error(t("photos.fetchError"));
      console.error("Error fetching data:", error);
    }
  };

  // Handle form submission (add/update)
  const onSubmit = async (data: any) => {
    if (btnState === 'add' && !imageFile) {
      toast.error(t("photos.uploadError"));
      return;
    }

    const formData = new FormData();


    // Append text fields with separate values for Arabic and English
    formData.append('title_ar', data.title_ar);
    formData.append('title_en', data.title_en);
    formData.append('details_ar', data.details_ar);
    formData.append('details_en', data.details_en);

    // For update, append _method field
    if (btnState === 'update' && currentSplashId) {
      formData.append('_method', 'PUT');
    }

    // Append image file if exists (required for add, optional for update)

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const url = btnState === 'add'
        ? BASE_URL
        : `${BASE_URL}/${currentSplashId}`;

      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success(t(`photos.${btnState}Success`));
      resetForm();
      fetchSplashScreens();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t(`photos.${btnState}Error`);
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
    setCurrentSplashId(null);
  };

  // Prepare form for update
  const prepareUpdateForm = (splash: SplashScreenData) => {
    setValue('title_ar', splash.title_ar);
    setValue('details_ar', splash.details_ar);
    setValue('title_en', splash.title_en);
    setValue('details_en', splash.details_en);
    setPreviewImage(splash.image);
    setImageFile(null);
    setBtnState('update');
    setCurrentSplashId(splash.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete splash screen
  const deleteSplash = async () => {
    try {
      await axios.delete(`${BASE_URL}/${currentSplashId}`);
      toast.success(t("photos.deleteSuccess"));
      handleClose();
      fetchSplashScreens();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("photos.deleteError");
      toast.error(errorMessage);
      console.error(error);
    }
  };

  // Modal handlers
  const handleOpen = (splash: SplashScreenData) => {
    // setModalType(type);
    setOpen(true);
    setCurrentSplashId(splash.id);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSplashId(null);
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
    fetchSplashScreens();
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
            {t("photos.confirmDeleteTitle")}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {t("photos.confirmDeleteMessage")}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={handleClose}>{t("photos.cancel")}</Button>
            <Button onClick={deleteSplash} color="error" variant="contained">
              {t("photos.delete")}
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
                  {/* حقول العنوان باللغة العربية */}
                  <Grid item>
                    <FieldLabel>{t("photos.titleLabelAr")}</FieldLabel>
                    <TextField
                      fullWidth
                      {...register('title_ar', { required: true })}
                      variant="outlined"
                      size="small"
                      inputProps={{ dir: 'rtl' }}
                      error={!!errors.title_ar}
                      helperText={errors.title_ar && t("photos.fieldRequired")}
                    />
                  </Grid>
                  {/* حقول العنوان باللغة الإنجليزية */}
                  <Grid item>
                    <FieldLabel>{t("photos.titleLabelEn")}</FieldLabel>
                    <TextField
                      fullWidth
                      {...register('title_en', { required: true })}
                      variant="outlined"
                      size="small"
                      inputProps={{ dir: 'ltr' }}
                      error={!!errors.title_en}
                      helperText={errors.title_en && t("photos.fieldRequired")}
                    />
                  </Grid>
                  {/* حقول الوصف باللغة العربية */}
                  <Grid item>
                    <FieldLabel>{t("photos.descriptionLabelAr")}</FieldLabel>
                    <TextField
                      fullWidth
                      {...register('details_ar', { required: true })}
                      variant="outlined"
                      size="small"
                      inputProps={{ dir: 'rtl' }}
                      error={!!errors.details_ar}
                      helperText={errors.details_ar && t("photos.fieldRequired")}
                    />
                  </Grid>
                  {/* حقول الوصف باللغة الإنجليزية */}
                  <Grid item>

                    <FieldLabel>{t("photos.descriptionLabelEn")}</FieldLabel>
                    <TextField
                      fullWidth
                      {...register('details_en', { required: true })}
                      variant="outlined"
                      size="small"
                      inputProps={{ dir: 'ltr' }}
                      error={!!errors.details_en}
                      helperText={errors.details_en && t("photos.fieldRequired")}
                    />
                  </Grid>
                  {/* حقل رفع الصورة */}
                  <Grid item>
                    <FieldLabel>{t("photos.uploadImage")}</FieldLabel>
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
              {t("photos.resetButton")}
            </StyledButton>
            <StyledButton
              color="primary"
              type="submit"
            >
              {btnState === 'add' ? t("photos.add") : t("photos.update")}
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
                <TableCell align='center'>{t("photos.tableHeader.title")}</TableCell>
                <TableCell align="center">{t("photos.tableHeader.subtitle")}</TableCell>
                <TableCell align="center">{t("photos.tableHeader.image")}</TableCell>
                <TableCell align="center">{t("photos.tableHeader.id")}</TableCell>
                <TableCell align="center">{t("photos.tableHeader.actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allPicsArray
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((splash) => (
                  <TableRow key={splash.id}>
                    <TableCell align='center'>
                      {i18n.language === 'ar' ? splash.title_ar : splash.title_en}
                    </TableCell>
                    <TableCell align="center">

                      {i18n.language === 'ar' ? splash.details_ar : splash.details_en}

                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={splash.image}
                        width={80}
                        height={80}
                        alt="Splash screen"
                        style={{ objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {splash.id}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Button
                          onClick={() => handleOpen(splash)}
                          color="error"
                          size="small"
                        >
                          {t("photos.delete")}
                        </Button>
                        <Button
                          onClick={() => prepareUpdateForm(splash)}
                          color="primary"
                          size="small"
                        >
                          {t("photos.update")}
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
            count={allPicsArray.length}
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

export default Photos;
