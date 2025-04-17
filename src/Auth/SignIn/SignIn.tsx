import { Box, Grid2, Paper, styled } from '@mui/material';
import './SignIn.css'
import { Link } from 'react-router-dom';

const SignIn = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'start',
        boxShadow: 'none',
        borderRadius: 'none',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
            borderRadius: 'none'
        }),
    }));


    return (
        <>

            <Box sx={{
                flexGrow: 1, height: '100vh',
                padding: '0',

                backgroundColor: 'salmon'
            }}>
                <Grid2 container spacing={0}>
                    <Grid2 size={6}>
                        <Item className='signIn' >

                            <img src="/assets/imgs/signIn-logo.svg" height={150} alt="" />

                            <form
                                style={{
                                    width: '60%',
                                    padding: '50px',
                                    margin: 'auto',
                                    boxShadow: '#e1d5d5 0px 0px 15px',
                                    borderRadius: '10px'
                                }}

                            >

                                <h1>تسجيل الدخول</h1>

                                <input type="text"
                                    placeholder='اسم المستخدم'
                                />

                                <input type="password"
                                    placeholder='كلمة المرور'
                                />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <input type="checkbox" />
                                        <small> ابقني مسجلا الدخول </small>
                                    </div>

                                    <Link style={{ color: 'black' }} to={'/forget-password'}> هل نسيت كلمة المرور؟ </Link>
                                </div>

                                <button
                                    style={{
                                        marginTop: '7px'
                                    }}
                                >
                                    تسجيل لدخول
                                </button>
                            </form>

                        </Item>
                    </Grid2>
                    <Grid2 size={6}>
                        <Item className='bgImg'>

                        </Item>
                    </Grid2>

                </Grid2>
            </Box>

        </>
    )
}

export default SignIn