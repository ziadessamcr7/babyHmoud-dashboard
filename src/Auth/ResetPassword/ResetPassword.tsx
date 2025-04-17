import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import { Visibility, VisibilityOff, Email } from '@mui/icons-material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';



const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#000000',
        },
        background: {
            default: '#F8F5E4',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    width: 500,
    margin: '0 auto',
}));

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Handle password reset logic here
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        marginBottom: 4,
                        marginTop: 2
                    }}
                >
                    <img
                        src="/assets/imgs/logo 1.svg"
                        alt="Baby Humod Store"
                        height="120"
                        style={{ maxWidth: '100%', position: 'absolute', right: '0px' }}

                    />
                </Box>

                <StyledPaper elevation={2}>
                    <Typography
                        variant="h6"
                        component="h6"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 'bold', marginBottom: 1 }}
                    >
                        إعادة تعيين كلمة المرور
                    </Typography>

                    <Typography
                        variant="body1"
                        align="center"
                        color="text.secondary"
                        sx={{ marginBottom: 1 }}
                    >
                        قم بإنشاء كلمة المرور الجديدة الخاصة بك
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Typography
                            variant="body2"
                            align="right"
                            sx={{ marginBottom: 1, fontWeight: 'medium' }}
                        >
                            البريد الإلكتروني
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Email sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ marginBottom: 3 }}
                        />

                        <Typography
                            variant="body2"
                            align="right"
                            sx={{ marginBottom: 1, fontWeight: 'medium' }}
                        >
                            كلمة المرور الجديدة
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="new-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ marginBottom: 3 }}
                        />

                        <Typography
                            variant="body2"
                            align="right"
                            sx={{ marginBottom: 1, fontWeight: 'medium' }}
                        >
                            تأكيد كلمة المرور الجديدة
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            autoComplete="new-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ marginBottom: 4 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                padding: '12px',
                                backgroundColor: '#333',
                                '&:hover': {
                                    backgroundColor: '#000',
                                },
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontSize: '16px',
                            }}
                        >
                            Reset Password
                        </Button>
                    </form>
                </StyledPaper>
            </Box>
        </ThemeProvider>
    );
};

export default ResetPassword;