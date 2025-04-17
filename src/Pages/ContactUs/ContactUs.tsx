import React, { useCallback, useEffect, useState, memo } from 'react';
import { Box, Grid, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  borderRadius: 0,
  boxShadow: 'none',
  color: theme.palette.text.secondary,
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

const FieldLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 500,
  textAlign: 'right',
  direction: 'rtl',
}));

// Optimized InputField component with memoization
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const InputField = memo(({ label, name, value, onChange }: InputFieldProps) => (
  <Grid item xs={12}>
    <Item>
      <FieldLabel component="label" htmlFor={name}>
        {label}
      </FieldLabel>
      <TextField
        id={name}
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        variant="outlined"
        size="small"
        inputProps={{ dir: 'rtl' }}
      />
    </Item>
  </Grid>
));
InputField.displayName = "InputField";

// Loading overlay component
const LoadingOverlay = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255,255,255,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    }}
  >
    <CircularProgress />
  </Box>
);

const ContactUs: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    phone_number: '',
    facebook: '',
    whatsapp: '',
    snapchat: '',
    email: '',
    instagram: '',
    website: '',
    tiktok: ''
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch contact info data
  const fetchContactInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://babyhumod.shop/api/contact-info");
      setFormData({
        phone_number: data.phone_number || '',
        facebook: data.facebook || '',
        whatsapp: data.whatsapp || '',
        snapchat: data.snapchat || '',
        email: data.email || '',
        instagram: data.instagram || '',
        website: data.website || '',
        tiktok: data.tiktok || ''
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(t('contact.fetchError'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setFormData({
      phone_number: '',
      facebook: '',
      whatsapp: '',
      snapchat: '',
      email: '',
      instagram: '',
      website: '',
      tiktok: ''
    });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log('Submitting data:', formData);
      const response = await axios.put("https://babyhumod.shop/api/contact-info", formData);
      console.log('Response:', response.data);
      toast.success(t('contact.updateSuccess'));
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(t('contact.saveError'));
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, t]);

  return (
    <Box sx={{ position: 'relative', mt: 1 }}>
      {(isLoading || isSubmitting) && <LoadingOverlay />}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <StyledPaper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <InputField
                  label={t("contact.phone_number")}
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
                <InputField
                  label={t("contact.snapchat")}
                  name="snapchat"
                  value={formData.snapchat}
                  onChange={handleChange}
                />
                <InputField
                  label={t("contact.instagram")}
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                />
                <InputField
                  label={t("contact.website")}
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <InputField
                  label={t("contact.facebook")}
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                />
                <InputField
                  label={t("contact.whatsapp")}
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
                <InputField
                  label={t("contact.email")}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField
                  label={t("contact.tiktok")}
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <StyledButton type="button" onClick={handleReset} color="secondary">
              {t("contact.reset")}
            </StyledButton>
            <StyledButton type="submit" color="primary">
              {t("contact.submit")}
            </StyledButton>
          </Box>
        </StyledPaper>
      </Box>
    </Box>
  );
};

export default ContactUs;
