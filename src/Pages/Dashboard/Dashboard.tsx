
import './Dashboard.css'
import {
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  MoreVert,
  KeyboardArrowUp,
  KeyboardArrowDown
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data for charts
const revenueData = [
  { name: 'Jan', expected: 300000, actual: 240000 },
  { name: 'Feb', expected: 310000, actual: 250000 },
  { name: 'Mar', expected: 270000, actual: 150000 },
  { name: 'Apr', expected: 330000, actual: 270000 },
  { name: 'May', expected: 260000, actual: 220000 },
  { name: 'Jun', expected: 350000, actual: 290000 },
  { name: 'Jul', expected: 360000, actual: 300000 },
];

const ordersData = [
  { name: 'Jan', orders: 18000 },
  { name: 'Feb', orders: 19000 },
  { name: 'Mar', orders: 20000 },
  { name: 'Apr', orders: 22000 },
  { name: 'May', orders: 23000 },
  { name: 'Jun', orders: 24000 },
  { name: 'Jul', orders: 25700 },
];

const profitData = [
  { name: 'Jan', profit: 38000 },
  { name: 'Feb', profit: 40000 },
  { name: 'Mar', profit: 42000 },
  { name: 'Apr', profit: 43000 },
  { name: 'May', profit: 46000 },
  { name: 'Jun', profit: 48000 },
  { name: 'Jul', profit: 50000 },
];


const supportData = [
  { name: 'Jan', tickets: 14000 },
  { name: 'Feb', tickets: 15000 },
  { name: 'Mar', tickets: 14500 },
  { name: 'Apr', tickets: 13500 },
  { name: 'May', tickets: 12800 },
  { name: 'Jun', tickets: 12200 },
  { name: 'Jul', tickets: 12000 },
];

const dailyUsersData = [
  { name: '1', users: 8000 },
  { name: '2', users: 10000 },
  { name: '3', users: 12222 },
  { name: '4', users: 15900 },
  { name: '5', users: 16300 },
  { name: '6', users: 16400 },
  { name: '7', users: 16200 },
  { name: '8', users: 16500 },
  { name: '9', users: 16400 },
  { name: '10', users: 16200 },
  { name: '11', users: 16100 },
  { name: '12', users: 16300 },
  { name: '13', users: 15000 },
  { name: '14', users: 16600 },
  { name: '15', users: 16300 },
  { name: '16', users: 16200 },
  { name: '17', users: 16400 },
  { name: '18', users: 16500 },
  { name: '19', users: 16600 },
  { name: '20', users: 16400 },
  { name: '21', users: 16500 },
  { name: '22', users: 16300 },
  { name: '23', users: 16200 },
  { name: '24', users: 16500 },
  { name: '25', users: 16400 },
  { name: '26', users: 16500 },
  { name: '27', users: 16300 },
  { name: '28', users: 16400 },
  { name: '29', users: 16500 },
  { name: '30', users: 16500 },
];

const weeklyData = [
  { name: 'السبت', value: 30000 },
  { name: 'الأحد', value: 25000 },
  { name: 'الإثنين', value: 35000 },
  { name: 'الثلاثاء', value: 40000 },
  { name: 'الأربعاء', value: 45000 },
  { name: 'الخميس', value: 38000 },
  { name: 'الجمعة', value: 32000 },
];

const countryData = [
  { name: 'مصر', value: 25.8, users: 30000, color: '#f44336' },
  { name: 'الكويت', value: 40.9, users: 30000, color: '#4caf50' },
  { name: 'السعودية', value: 11.9, users: 30000, color: '#4caf50' },
  { name: 'الأردن', value: 25.8, users: 30000, color: '#2196f3' },
];

const todayOrdersData = [
  { time: '12am', orders: 50 },
  { time: '4am', orders: 10 },
  { time: '8am', orders: 80 },
  { time: '12pm', orders: 20 },
  { time: '4pm', orders: 60 },
  { time: '8pm', orders: 20 },
  { time: '11pm', orders: 90 },
];

const pieData = [
  { name: 'نظام ولاء المواقع', value: 4567, color: '#1976d2' },
  { name: 'استبيان الموقع', value: 3167, color: '#29b6f6' },
  { name: 'اطعم تاجر', value: 1845, color: '#66bb6a' },
];

const recentTransactions = [
  { id: '#5089', date: '25 مارس 2025', amount: '$1200', status: 'تم الدفع' },
  { id: '#5089', date: '25 مارس 2025', amount: '$1200', status: 'تم الدفع' },
  { id: '#5089', date: '25 مارس 2025', amount: '$1200', status: 'تم الدفع' },
  { id: '#5089', date: '25 مارس 2025', amount: '$1200', status: 'تم الدفع' },
  { id: '#5089', date: '25 مارس 2025', amount: '$1200', status: 'تم الدفع' },
  { id: '#5089', date: '25 مارس 2025', amount: '$1200', status: 'تم الدفع' },
];

const bestProducts = [
  { product: 'أطعم الموالد', sales: 506, stock: 'Stock', price: '$999.29' },
  { product: 'أطعم الموالد', sales: 506, stock: 'Stock', price: '$999.29' },
  { product: 'أطعم الموالد', sales: 506, stock: 'Stock', price: '$999.29' },
  { product: 'أطعم الموالد', sales: 506, stock: 'out', price: '$999.29' },
  { product: 'أطعم الموالد', sales: 506, stock: 'Stock', price: '$999.29' },
];

const popularProducts = [
  { name: 'بطاقة استقبال', sku: '#FXZ 4567', price: '$999.29' },
  { name: 'لاقوس', sku: '#FXZ 4567', price: '$999.29' },
  { name: 'نشاط مواليد', sku: '#FXZ 4567', price: '$999.29' },
  { name: 'خيس نوم', sku: '#FXZ 4567', price: '$999.29' },
  { name: 'حذاقية', sku: '#FXZ 4567', price: '$999.29' },
  { name: 'بطاقة استقبال', sku: '#FXZ 4567', price: '$999.29' },
];

const currentOrders = [
  { id: '#65454.15', customer: 'محمد علي حسني', status: 'تم التنفيذ', price: '$999.29' },
  { id: '#65454.15', customer: 'محمد علي حسني', status: 'تم التنفيذ', price: '$999.29' },
  { id: '#65454.15', customer: 'محمد علي حسني', status: 'تم التنفيذ', price: '$999.29' },
  { id: '#65454.15', customer: 'محمد علي حسني', status: 'تم التنفيذ', price: '$999.29' },
];


const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value
}: any) => {
  // Calculate the position for the label
  const RADIAN = Math.PI / 52;
  // You can adjust these values to position the labels where you want
  const radius = outerRadius * 1.4;  // Adjust this multiplier to move labels further from or closer to the pie
  const x = cx + radius * Math.cos(-midAngle * RADIAN + 1);
  const y = cy + radius * Math.sin(-midAngle * RADIAN + 1);

  return (
    <text
      x={x}
      y={y}
      fill={pieData[index].color}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="16"
    >
      {`${name}: ${value}`}
    </text>
  );
};

// Dashboard component
const Dashboard = () => {
  return (
    <Container maxWidth="xl" dir="rtl">
      <Box sx={{ flexGrow: 1, p: 0 }}>
        {/* Top stats */}
        <Grid container spacing={3}>
          {/* Sales */}
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  اجمالي المبيعات والطلبات
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر 7 أيام
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h4" component="span" sx={{ fontWeight: 'bold', mr: 2 }}>
                  $350K
                </Typography>
                <Typography variant="h6" component="span" color="primary">
                  $235K
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main" component="span">
                  +48%
                </Typography>
                <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                  آخر 7 أيام
                </Typography>
              </Box>
              <Box sx={{ height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <Line type="monotone" dataKey="expected" stroke="#2196f3" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="actual" stroke="#1de9b6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          {/* Active Users */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  المستخدمين النشطين
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر 7 أيام
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                  16.5K
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArrowDownward sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="error.main" component="span">
                  -3%
                </Typography>
                <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                  آخر 7 أيام
                </Typography>
              </Box>
              <Box sx={{ height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyUsersData}>
                    <Line type="monotone" dataKey="users" stroke="#f44336" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          {/* Orders */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  اجمالي الطلبات
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر 7 أيام
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                  25.7K
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main" component="span">
                  +6%
                </Typography>
                <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                  آخر 7 أيام
                </Typography>
              </Box>
              <Box sx={{ height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ordersData}>
                    <Line type="monotone" dataKey="orders" stroke="#4caf50" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          {/* Profit */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  اجمالي الربح
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر 7 أيام
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                  50K
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main" component="span">
                  +12%
                </Typography>
                <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                  آخر 7 أيام
                </Typography>
              </Box>
              <Box sx={{ height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitData}>
                    <Line type="monotone" dataKey="profit" stroke="#4caf50" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          {/* Support Tickets */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  تكلفة الدعم
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر 7 أيام
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                  12K
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main" component="span">
                  +2%
                </Typography>
                <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                  آخر 7 أيام
                </Typography>
              </Box>
              <Box sx={{ height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={supportData}>
                    <Line type="monotone" dataKey="tickets" stroke="#f44336" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>


        </Grid>

        {/* Middle section */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Reports section */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  التقارير
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  آخر 7 أيام
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3} md={2.4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">250k</Typography>
                    <Typography variant="body2" color="text.secondary">إيراد</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3} md={2.4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">3.5k</Typography>
                    <Typography variant="body2" color="text.secondary">كل المنتجات</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3} md={2.4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">2.5k</Typography>
                    <Typography variant="body2" color="text.secondary">داخل المخزن</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3} md={2.4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">0.5k</Typography>
                    <Typography variant="body2" color="text.secondary">خارج المخزن</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3} md={2.4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">24k</Typography>
                    <Typography variant="body2" color="text.secondary">العملاء</Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ height: 300, mt: 4 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8b4513" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          {/* Countries */}
          <Grid item xs={12} md={4}>




            <Card sx={{ p: 2 }}>

              {/* Users 30 days */}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  المستخدمين آخر 30 يوم
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                  16.5K
                </Typography>
                <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                  مستخدم آخر 30 يوم
                </Typography>
              </Box>

              <Box sx={{ height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyUsersData}>
                    <Bar dataKey="users" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>

              {/* Users 30 days end here */}


              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  الدول
                </Typography>
              </Box>

              <List>
                {countryData.map((country) => (
                  <ListItem key={country.name}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                        {country.value > 15 ? (
                          <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                        ) : (
                          <ArrowDownward sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                        )}
                        <Typography variant="body2" fontWeight="bold" component="span">
                          {country.value}%
                        </Typography>
                      </Box>

                      <Box sx={{ width: '40%' }}>
                        <Box sx={{ backgroundColor: '#e0e0e0', height: 8, borderRadius: 4, width: '100%' }}>
                          <Box
                            sx={{
                              backgroundColor: country.color,
                              height: 8,
                              borderRadius: 4,
                              width: `${country.value * 2}%`
                            }}
                          />
                        </Box>
                      </Box>

                      <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', width: '30%' }}>
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {country.users}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {country.name}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>

            </Card>
          </Grid>
        </Grid>

        {/* Bottom section */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Pie Chart */}
          {/* <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  الفئة الأكثر مبيعا
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  اجمالي الربح 20.2%
                </Typography>
              </Box>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>

                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={100}
                      paddingAngle={0}
                      dataKey="value"
                      label={renderCustomizedLabel}

                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid> */}

          {/* Recent Transactions */}
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  المعاملات الأخيرة
                </Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>تاريخ الإصدار</TableCell>
                      <TableCell>المستخدم</TableCell>
                      <TableCell>الإجراءات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentTransactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.status}
                            color="success"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>

        {/* Product sections */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Best Products */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  أفضل المنتجات مبيعا
                </Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>المنتج</TableCell>
                      <TableCell>كل الطلبات</TableCell>
                      <TableCell>الحالة</TableCell>
                      <TableCell>السعر</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bestProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.product}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>
                          <Chip
                            label={product.stock}
                            color={product.stock === 'Stock' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          {/* Popular Products */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  المنتجات الأكثر شيوعا
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  اجمالي الربح 20.2%
                </Typography>
              </Box>
              <List>
                {popularProducts.map((product, index) => (
                  <ListItem key={index} divider={index !== popularProducts.length - 1}>
                    <ListItemText
                      primary={
                        <Typography variant="body1">{product.name}</Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">{product.sku}</Typography>
                      }
                    />
                    <Typography variant="body2">{product.price}</Typography>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>

        {/* Orders sections */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Current Orders */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  الطلبات الحالية
                </Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>السعر</TableCell>
                      <TableCell>الحالة</TableCell>
                      <TableCell>المستخدم</TableCell>
                      <TableCell>ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentOrders.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{order.price}</TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            color="success"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          {/* Today's Orders */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  طلبات اليوم
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                  16.5K
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main" component="span">
                  +6%
                </Typography>
                <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                  مقارنة باليوم أمس
                </Typography>
              </Box>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={todayOrdersData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#1976d2" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Typography variant="caption" color="text.secondary">
                الطلبات ميزو الوقت
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;