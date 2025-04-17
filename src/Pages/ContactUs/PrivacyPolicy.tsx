import { styled, Paper, Typography, Button, Grid, Box, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import { memo, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';






// Styled components
const StyledPaper = styled(Paper)(({ theme }: any) => ({
    padding: theme.spacing(4),
    margin: theme.spacing(4, 0),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

const FieldLabel = styled(Typography)(({ theme }: any) => ({
    marginBottom: theme.spacing(1),
    fontWeight: 600,
    textAlign: 'right',
    direction: 'rtl',
}));

const StyledButton = styled(Button)(({ theme, color }: any) => ({
    padding: theme.spacing(1, 5),
    borderRadius: theme.spacing(0.5),
    fontWeight: 700,
    margin: theme.spacing(1),
    border: color === 'primary' ? 'none' : `1px solid ${theme.palette.primary.main}`,
    backgroundColor: color === 'primary' ? theme.palette.primary.main : 'transparent',
    color: color === 'primary' ? 'white' : theme.palette.primary.main,
    '&:hover': {
        backgroundColor: color === 'primary' ? theme.palette.primary.dark : 'rgba(0, 0, 0, 0.04)',
    },
}));

// Memoized Form Field component for performance
const FormField = memo(({ label, name, register, errors, placeholder, multiline = false, rows = 4 }: any) => (
    <Grid item xs={12}>
        <Box mb={2}>
            <label htmlFor={name}>
                <FieldLabel>
                    {label}
                </FieldLabel>
            </label>
            <TextField
                id={name}
                fullWidth
                placeholder={placeholder}
                multiline={multiline}
                rows={multiline ? rows : 1}
                error={!!errors[name]}
                helperText={errors[name] ? 'هذا الحقل مطلوب' : ''}
                {...register(name, { required: true })}
                variant="outlined"
                size="small"
                inputProps={{ dir: 'rtl' }}
            />
        </Box>
    </Grid>
));
FormField.displayName = "FormField";


const PrivacyPolicy = () => {

    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch existing data from the API (set both Arabic and English values)
    const getAboutUsData = useCallback(() => {
        setIsLoading(true);
        axios.get("https://babyhumod.shop/api/pages")
            .then((response) => {
                const data = response.data;
                // تعيين القيم الموجودة من API للنسخة العربية والإنجليزية
                setValue('privacy_policy', data.privacy_policy || '');
                setValue('privacy_policy_en', data.privacy_policy_en || '');
                setValue('terms_of_services', data.terms_of_services || '');
                setValue('terms_of_services_en', data.terms_of_services_en || '');
                setValue('refund_policy', data.refund_policy || '');
                setValue('refund_policy_en', data.refund_policy_en || '');
                setValue('shipping_policy', data.shipping_policy || '');
                setValue('shipping_policy_en', data.shipping_policy_en || '');
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                toast.error(t('aboutUs.fetchError'));
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [setValue, t]);

    useEffect(() => {
        getAboutUsData();
    }, [getAboutUsData]);

    // Submit the updated data to the API
    const submitAboutUsData = useCallback((data: any) => {
        setIsSubmitting(true);
        axios.put("https://babyhumod.shop/api/pages", data, {
            headers: { "Content-Type": "application/json" }
        })
            .then(() => {
                toast.success(t('aboutUs.updateSuccess'));
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                toast.error(t('aboutUs.updateError'));
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }, [t]);

    // Reset the form and refetch data
    const handleReset = () => {
        reset();
        getAboutUsData();
    };



    return (
        <StyledPaper>
            <form onSubmit={handleSubmit(submitAboutUsData)} noValidate>
                {(isLoading || isSubmitting) && (
                    <Box display="flex" justifyContent="center" my={2}>
                        <CircularProgress />
                    </Box>
                )}
                <Grid container spacing={3}>
                    {/* القسم الخاص بالمحتوى العربي */}
                    <Grid item xs={12}>
                        <Typography variant="h6" align="right">
                            {t("aboutUs.arabicContent")}
                        </Typography>
                    </Grid>
                    <FormField
                        label={t("aboutUs.privacy_policy")}
                        name="privacy_policy"
                        register={register}
                        errors={errors}
                        placeholder={t("aboutUs.privacy_policy_placeholder")}
                        multiline
                        rows={4}
                    />
                    <FormField
                        label={t("aboutUs.terms_of_services")}
                        name="terms_of_services"
                        register={register}
                        errors={errors}
                        placeholder={t("aboutUs.terms_of_services_placeholder")}
                        multiline
                        rows={4}
                    />
                    <FormField
                        label={t("aboutUs.refund_policy")}
                        name="refund_policy"
                        register={register}
                        errors={errors}
                        placeholder={t("aboutUs.refund_policy_placeholder")}
                        multiline
                        rows={4}
                    />
                    <FormField
                        label={t("aboutUs.shipping_policy")}
                        name="shipping_policy"
                        register={register}
                        errors={errors}
                        placeholder={t("aboutUs.shipping_policy_placeholder")}
                        multiline
                        rows={4}
                    />
                    {/* القسم الخاص بالمحتوى الإنجليزي */}
                    <Grid item xs={12}>
                        <Typography variant="h6" align="right">
                            {t("aboutUs.englishContent")}
                        </Typography>
                    </Grid>
                    <FormField
                        label={t("aboutUs.privacy_policy_en")}
                        name="privacy_policy_en"
                        register={register}
                        errors={errors}
                        placeholder={t("aboutUs.privacy_policy_en_placeholder")}
                        multiline
                        rows={4}
                    />
                    <FormField
                        label={t("aboutUs.terms_of_services_en")}
                        name="terms_of_services_en"
                        register={register}
                        errors={errors}
                        placeholder={t("aboutUs.terms_of_services_en_placeholder")}
                        multiline
                        rows={4}
                    />
                    <FormField
                        label={t("aboutUs.refund_policy_en")}
                        name="refund_policy_en"
                        register={register}
                        errors={errors}
                        placeholder={t("aboutUs.refund_policy_en_placeholder")}
                        multiline
                        rows={4}
                    />
                    <FormField
                        label={t("aboutUs.shipping_policy_en")}
                        name="shipping_policy_en"
                        register={register}
                        errors={errors}
                        placeholder={t("aboutUs.shipping_policy_en_placeholder")}
                        multiline
                        rows={4}
                    />
                </Grid>
                <Box display="flex" justifyContent="center" mt={3}>
                    <StyledButton type="button" onClick={handleReset} color="secondary">
                        {t("aboutUs.reset")}
                    </StyledButton>
                    <StyledButton type="submit" color="primary">
                        {t("aboutUs.submit")}
                    </StyledButton>
                </Box>
            </form>
        </StyledPaper>
    );

}

export default PrivacyPolicy