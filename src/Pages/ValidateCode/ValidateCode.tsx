import { Box, Grid2, Paper, styled } from "@mui/material"
import { Link } from "react-router-dom";
import React from 'react';
import { PinInput } from 'react-input-pin-code'

const ValidateCode = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'start',
        color: theme.palette.text.primary,
        boxShadow: 'none', // إزالة الـ box-shadow
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    const [values, setValues] = React.useState(['', '', '', '', '']);


    return (
        <>
            <Box>
                <Grid2 sx={{
                    bgcolor: '#eceff1', height: '78vh',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'

                }} container spacing={2}>
                    <Grid2 size={5}>

                        <Item>
                            <form style={{
                                padding: '10px 10px 60px 10px'
                            }} >
                                <h3>
                                    رمز التحقق
                                </h3>
                                <p
                                    style={{
                                        margin: '35px 0'
                                    }}
                                >
                                    ادخل رمز التحقق المكون من 6 ارقام

                                </p>

                                <PinInput
                                    values={values}
                                    onChange={(value, index, values) => setValues(values || '')}
                                    size={'lg'}
                                    inputStyle={{
                                        backgroundColor: 'rgba(242, 246, 250, 1)'
                                    }}
                                    containerStyle={{
                                        justifyContent: 'center'
                                    }}
                                />

                                <Link
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        marginTop: '20px',
                                        padding: '7px',
                                        borderRadius: '7px',
                                        color: 'white',
                                        backgroundColor: 'rgba(101, 73, 41, 1)',
                                        border: 'none',
                                        textAlign: 'center',
                                        textDecoration: 'none'


                                    }}
                                    to={'validate-code'}
                                >
                                    ارسال الكود
                                </Link>
                            </form>
                        </Item>

                    </Grid2>
                </Grid2>
            </Box>

        </>
    )
}

export default ValidateCode