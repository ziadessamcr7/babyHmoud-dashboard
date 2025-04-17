import { Box, Grid2, Paper } from '@mui/material'
import { styled } from '@mui/material';

const Roles = () => {


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'rgba(241, 241, 241, 0.5)',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        boxShadow: 'none',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    const users = [
        {
            imgUrl: '/assets/imgs/photo.svg',
            userName: 'احمد محمد رضا',
            userRole: 'الدور',
            phoneNum: 'رقم الهاتف',
        },
        {
            imgUrl: '/assets/imgs/photo.svg',
            userName: 'احمد محمد رضا',
            userRole: 'الدور',
            phoneNum: 'رقم الهاتف',
        },
        {
            imgUrl: '/assets/imgs/photo.svg',
            userName: 'احمد محمد رضا',
            userRole: 'الدور',
            phoneNum: 'رقم الهاتف',
        },
        {
            imgUrl: '/assets/imgs/photo.svg',
            userName: 'احمد محمد رضا',
            userRole: 'الدور',
            phoneNum: 'رقم الهاتف',
        },

    ]


    return (


        <>
            <Box sx={{ flexGrow: 1, width: '75%', margin: 'auto', alignItems: 'center', bgcolor: 'white', padding: '7px' }}>

                {
                    users.map((user, idx) => {
                        return <Grid2 key={idx} sx={{ bgcolor: 'rgba(241, 241, 241, 0.5)', alignItems: 'center', margin: '20px 0' }} size={8} container spacing={0}>

                            <Grid2 size={1}>
                                <Item>

                                    <img src={user.imgUrl}
                                        style={{
                                            width: '100%'
                                        }}

                                        alt="" />

                                </Item>
                            </Grid2>

                            <Grid2 size={3}>
                                <Item>
                                    {user.userName}
                                </Item>
                            </Grid2>

                            <Grid2 size={2}>
                                <Item>
                                    {user.userRole}
                                </Item>
                            </Grid2>

                            <Grid2 size={3}>
                                <Item>
                                    {user.phoneNum}
                                </Item>
                            </Grid2>

                            <Grid2 size={3}>
                                <Item>
                                    <img src="/assets/imgs/lock.svg" alt="" />
                                    <img src="/assets/imgs/edit.svg" alt="" />
                                    <img src="/assets/imgs/trash.svg" alt="" />
                                </Item>
                            </Grid2>

                        </Grid2>
                    })
                }


            </Box>

        </>
    )
}

export default Roles