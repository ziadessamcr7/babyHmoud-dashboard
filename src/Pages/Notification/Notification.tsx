import { Box, Button, Grid, Paper, styled, TextField, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import './Notification.css'

interface NotificationData {
  title: string;
  message: string;
}

interface NotificationHistory {
  id: number;
  title: string;
  message: string;
  type: string;
  type_id: string;
  sent_at: string;
  recipient_count: number;
  success_count: number;
  failure_count: number;
}

export const Notification = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NotificationData>();
  const [notifications, setNotifications] = useState<NotificationHistory[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  // Remove all image-related code
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    textAlign: 'start',
    padding: '0',
    boxShadow: 'none',
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
    marginBottom: theme.spacing(5),
    borderRadius: theme.spacing(0),
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)'
  }));

  const InputField = memo(({ label, name, register, required }: any) => (
    <Grid item xs={12}>
      <Item>
        <FieldLabel>{label}</FieldLabel>
        <TextField
          fullWidth
          {...register(name, { required })}
          variant="outlined"
          size="small"
          inputProps={{ dir: 'rtl' }}
        />
      </Item>
    </Grid>
  ));

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

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const submit = async (data: NotificationData) => {
    try {
      const response = await axios.post('https://babyhumod.shop/public/notfication.php', {
        title: data.title,
        message: data.message
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        enqueueSnackbar('تم إرسال الإشعار بنجاح', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 3000,
        });
        reset();
        fetchNotifications();
      }
    } catch (error) {
      enqueueSnackbar('حدث خطأ أثناء إرسال الإشعار', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('https://babyhumod.shop/public/all.php');
      if (response.data.success) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      enqueueSnackbar('حدث خطأ أثناء جلب سجل الإشعارات', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
        <StyledPaper>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Item>
                <Grid container spacing={2} direction="column">
                  <InputField label="العنوان" name="title" register={register} required />
                  <InputField label="الرسالة" name="message" register={register} required />
                </Grid>
              </Item>
            </Grid>
          </Grid>



          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <StyledButton
              type="button"
              onClick={handleReset}
              color="secondary"
            >
              إعادة الضبط
            </StyledButton>

            <StyledButton
              color="primary"
              type="submit"
            >
              تنفيذ
            </StyledButton>
          </Box>

        </StyledPaper>

      </Box>

      {/* Notifications History Table */}
      <StyledPaper sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'right', mb: 2 }}>
          سجل الإشعارات السابقة
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>العنوان</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>الرسالة</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>تاريخ الإرسال</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>عدد المستلمين</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>نجاح</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>فشل</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{notification.title}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{notification.message}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{notification.sent_at}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{notification.recipient_count}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'green' }}>{notification.success_count}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'red' }}>{notification.failure_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </StyledPaper>
    </Box>
  );
};