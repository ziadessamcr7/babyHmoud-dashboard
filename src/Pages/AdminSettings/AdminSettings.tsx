import { Box, Grid2, Paper, styled } from '@mui/material';
import './AdminSettings.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSettings = () => {


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


    const [activeBtn, setActiveBtn] = useState('myAccount')





    return (
        <>
            <ul style={{
                listStyle: 'none',
                display: 'flex'
            }} >
                <li
                    onClick={() => { setActiveBtn('myAccount') }}
                    style={{ margin: '0 7px', cursor: 'pointer', paddingBottom: '7px' }}
                    className={activeBtn === 'myAccount' ? 'activeBtn' : ''}
                > حسابي </li>
                <li
                    onClick={() => { setActiveBtn('changePass') }}
                    style={{ margin: '0 7px', cursor: 'pointer' }}
                    className={activeBtn === 'changePass' ? 'activeBtn' : ''}
                > تغيير كلمة السر </li>
            </ul>


            {
                activeBtn === 'myAccount' ?
                    <Box sx={{ flexGrow: 1, px: 3 }}>
                        <Grid2 sx={{ backgroundColor: '#fff' }} container spacing={2}>

                            <Grid2 size={12} >




                            </Grid2>

                            <Grid2 sx={{
                                paddingRight: '20px'
                            }} size={5}>
                                <Item>

                                    <div className='settings'>
                                        <form>
                                            <label>
                                                الاسم
                                            </label>
                                            <input type="text" placeholder='احمد' name="" id="" />

                                            <label>
                                                الادوار
                                            </label>
                                            <input type="text" placeholder='مسؤل' name="" id="" />

                                            <label>
                                                البريد الالكتروني
                                            </label>
                                            <input type="text" placeholder='ahmedelmanfy8@gmail.com' name="" id="" />

                                            <label>
                                                رقم الهاتف
                                            </label>
                                            <input type="text" placeholder='01061498977' name="" id="" />

                                            <label>
                                                العنوان
                                            </label>
                                            <input type="text" placeholder='جسر السويس شاررع احمد بن حنبل' name="" id="" />

                                            <label>
                                                المنطقة
                                            </label>
                                            <input type="text" placeholder='القاهرة' name="" id="" />



                                        </form>
                                    </div>

                                </Item>
                            </Grid2>

                            <Grid2 size={4}>
                                <Item>

                                    <div className=''
                                        style={{
                                            position: 'relative'
                                        }}
                                    >
                                        <img src="/assets/imgs/image-place-holder 1.svg" alt="" />
                                        <div className='iconsWrapper'>
                                            <img src="/assets/imgs/delete.svg"
                                                style={{
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '10px',
                                                    cursor: 'pointer'
                                                }}

                                                className='ms-1' alt="" />
                                            <img
                                                style={{
                                                    position: 'absolute',
                                                    right: '50px',
                                                    top: '10px',
                                                    cursor: 'pointer'

                                                }}
                                                src="/assets/imgs/uplload.svg" alt="" />

                                        </div>

                                    </div>

                                </Item>
                            </Grid2>

                            <Grid2 size={3}>

                                <Item>
                                    <button
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: 'rgba(101, 73, 41, 1)',
                                            borderRadius: '7px',
                                            color: 'white',
                                            border: 'none'
                                        }}
                                    >
                                        حفظ التعديلات
                                    </button>
                                </Item>

                            </Grid2>

                        </Grid2>
                    </Box> :
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
                                            تغيير كلمة السر
                                        </h3>
                                        <p
                                            style={{
                                                margin: '35px 0'
                                            }}
                                        >

                                            ادخل البريد الإلكتروني الخاص بك وسنرسل لك الكود الخاص بتغيير كلمة السر
                                        </p>

                                        <input type="text"
                                            style={{
                                                display: 'block',
                                                width: '100%',
                                                backgroundColor: 'rgba(242, 246, 250, 1)',
                                                border: 'none',
                                                padding: '7px'

                                            }}
                                            placeholder='Ahmedelmanfy8@gmail.com'

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
                                            ارسل
                                        </Link>
                                    </form>
                                </Item>

                            </Grid2>
                        </Grid2>
                    </Box>
            }




        </>
    )
}

export default AdminSettings