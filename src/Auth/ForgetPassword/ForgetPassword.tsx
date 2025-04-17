import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    InputBase
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import { Link } from 'react-router-dom';


interface StyledProps {
    selected: boolean;
}

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
    padding: theme.spacing(4),
    borderRadius: 16,
    maxWidth: 600,
    margin: '0 auto',
    overflow: 'visible'
}));

const StyledOption = styled(Paper)<StyledProps>(({ theme, selected }) => ({
    padding: theme.spacing(1.5),
    borderRadius: 12,
    marginBottom: theme.spacing(2),
    border: selected ? '2px solid #000' : '1px solid #eee',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'visible'
}));

const CircleIcon = styled(Box)<StyledProps>(({ selected }) => ({
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: selected ? '#000' : '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: selected ? 'white' : 'black',
}));

const PhoneInputContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: '0 8px',
    marginTop: 8
}));

const ForgetPassword = () => {
    const [recoveryMethod, setRecoveryMethod] = useState('email');

    const handleMethodChange = (method: any) => {
        setRecoveryMethod(method);
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
                        variant="h4"
                        component="h1"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 'bold', marginBottom: 2 }}
                    >
                        هل نسيت كلمة السر
                    </Typography>

                    <Typography
                        variant="body1"
                        align="center"
                        color="text.secondary"
                        sx={{ marginBottom: 4 }}
                    >
                        الرجاء تحديد خيار إرسال رابط إعادة تعيين كلمة المرور
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {/* Email Option */}
                        {/* <StyledOption
                            elevation={0}
                            selected={recoveryMethod === 'email'}
                            onClick={() => handleMethodChange('email')}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    إعادة التعيين عبر البريد الإلكتروني
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                    سنقوم بإرسال رابط إعادة تعيين كلمة المرور الخاصة بك
                                </Typography>

                                {recoveryMethod === 'email' && (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        placeholder="عنوان البريد الإلكتروني"
                                        sx={{
                                            mt: 2,
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: '#f5f5f5',
                                                borderRadius: '8px',
                                            }
                                        }}
                                    />
                                )}
                            </Box>
                            <CircleIcon selected={recoveryMethod === 'email'}>
                                <img src="/assets/imgs/Message.png" alt="Email" width="20" height="20" />
                            </CircleIcon>
                        </StyledOption> */}

                        {/* WhatsApp Option */}
                        <StyledOption
                            elevation={0}
                            selected={recoveryMethod === 'whatsapp'}
                            onClick={() => handleMethodChange('whatsapp')}
                            sx={{ alignItems: 'start' }}
                        >
                            <CircleIcon sx={{ marginLeft: '10px' }} selected={recoveryMethod === 'whatsapp'}>
                                <img src="/assets/imgs/Message.png" alt="WhatsApp" width="20" height="20" />
                            </CircleIcon>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    إعادة التعيين عبر الواتساب
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                    سنقوم بإرسال رابط إعادة ضبط هاتفك
                                </Typography>

                                {recoveryMethod === 'whatsapp' && (
                                    <PhoneInputContainer>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                        </Box>
                                        <InputBase
                                            placeholder="01061498977"
                                            fullWidth
                                            sx={{ ml: 1 }}
                                        />
                                    </PhoneInputContainer>

                                )}
                            </Box>

                        </StyledOption>

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
                                mt: 2,
                            }}
                        >
                            إرسال رابط إعادة تعيين كلمة المرور
                        </Button>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button
                                sx={{
                                    minWidth: '40px',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    padding: 0
                                }}
                            >
                                <Link to={'/sign-in'}>  <img src="/assets/imgs/back-arrow.svg" alt="Back" width="20" height="20" /> </Link>
                                {/* استبدل أيقونة MUI بصورة */}

                            </Button>
                        </Box>
                    </form>
                </StyledPaper>
            </Box>
        </ThemeProvider>
    );
};

export default ForgetPassword;