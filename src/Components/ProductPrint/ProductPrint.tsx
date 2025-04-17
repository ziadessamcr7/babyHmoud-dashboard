// import { Box, Collapse, Grid2, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
// import React, { useState } from 'react'
// import DeleteIcon from '@mui/icons-material/Delete';
// import LockIcon from '@mui/icons-material/Lock';
// import BorderColorIcon from '@mui/icons-material/BorderColor';

// const ProductPrint = () => {



//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(2);

//     const handleChangePage = (_event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };


//     const Item = styled(Paper)(({ theme }) => ({
//         backgroundColor: '#fff',
//         ...theme.typography.body2,
//         padding: theme.spacing(1),
//         textAlign: 'start',
//         color: theme.palette.text.secondary,
//         ...theme.applyStyles('dark', {
//             backgroundColor: '#1A2027',
//         }),
//     }));




//     interface HistoryData {
//         date: string;
//         customerId: string;
//         amount: number;
//         ayHaga: number;
//         ayHaga2: number;
//     }

//     interface RowData {
//         name: string;
//         calories: number;
//         fat: number;
//         carbs: number;
//         protein: number;
//         price: number;
//         history: HistoryData[];
//         id: number;
//     }

//     const createData = (
//         name: string,
//         calories: number,
//         fat: number,
//         carbs: number,
//         protein: number,
//         price: number,
//         id: number
//     ): RowData => {
//         return {
//             name,
//             calories,
//             fat,
//             carbs,
//             protein,
//             price,
//             history: [
//                 { date: '', customerId: '11091700', amount: 3, ayHaga: 555, ayHaga2: 'Apple iPhone 16' },
//             ],
//             id
//         };
//     };



//     const ClientsData: React.FC<{ row: RowData }> = ({ row }) => {
//         const [open, setOpen] = useState(false);

//         return (
//             <>
//                 <TableRow>
//                     <TableCell align="center">
//                         {/* <IconButton size="small" onClick={() => setOpen(!open)}>
//                                             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                                         </IconButton> */}
//                     </TableCell>
//                     <TableCell align='center'>
//                         <span style={{
//                             display: 'flex',

//                             padding: '7px',
//                             // color: 'rgba(255, 198, 0, 1)',
//                             fontWeight: 'bold',
//                             flexDirection: 'column'

//                         }}>
//                             <small>
//                                 {row.name}
//                             </small>
//                         </span>


//                     </TableCell>
//                     <TableCell style={{
//                         width: '18%'
//                     }} align="center">
//                         {row.calories}
//                     </TableCell>
//                     <TableCell align="center">

//                         <img src="/assets/imgs/cat-img.png"
//                             width={80}
//                             height={80}
//                             alt="" />

//                     </TableCell>

//                     <TableCell align="center">
//                         <p style={{ margin: '0' }} >من 0-3 شهور</p>
//                         <p style={{ margin: '0' }} >  من 3-6 شهور </p>
//                         <p style={{ margin: '0' }} > من 6-9 شهور </p>

//                     </TableCell>
//                     <TableCell align="center">


//                         <p style={{ margin: '0' }} > احمر </p>
//                         <p style={{ margin: '0' }} >  ازرق </p>
//                         <p style={{ margin: '0' }} > ابيض </p>


//                     </TableCell>
//                     <TableCell style={{ fontWeight: 'bolder' }} align="center">
//                         <p style={{ margin: '0' }} > كايرو </p>
//                         <p style={{ margin: '0' }} >  Irancell </p>
//                         <p style={{ margin: '0' }} > Poppins </p>

//                     </TableCell>

//                     <TableCell style={{ fontWeight: 'bolder' }} align="center">

//                         <DeleteIcon />
//                         <LockIcon sx={{ margin: '0 10px' }} />
//                         <BorderColorIcon />

//                     </TableCell>
//                 </TableRow>

//                 <TableRow>
//                     <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
//                         <Collapse in={open} timeout="auto" unmountOnExit>
//                             <Box sx={{ margin: 1 }}>
//                                 <Table size="small">
//                                     <TableHead>
//                                         <TableRow  >
//                                             <TableCell sx={{
//                                                 color: 'rgba(139, 144, 154, 1)',
//                                                 display: 'flex',
//                                                 justifyContent: 'center'
//                                             }} align="center">PRINT <img src="/assets/imgs/fluent_print-24-filled.svg" alt="" /> </TableCell>
//                                             <TableCell sx={{
//                                                 color: 'rgba(139, 144, 154, 1)'
//                                             }} align="center">TOTAL</TableCell>
//                                             <TableCell sx={{
//                                                 color: 'rgba(139, 144, 154, 1)'
//                                             }} align="center">DISC</TableCell>
//                                             <TableCell sx={{
//                                                 color: 'rgba(139, 144, 154, 1)'
//                                             }} align="center">QTY</TableCell>
//                                             <TableCell sx={{
//                                                 color: 'rgba(139, 144, 154, 1)'
//                                             }} align="center">PRICE</TableCell>
//                                             <TableCell sx={{
//                                                 color: 'rgba(139, 144, 154, 1)'
//                                             }} align="center">NAME</TableCell>
//                                             <TableCell sx={{
//                                                 color: 'rgba(139, 144, 154, 1)'
//                                             }} align="center">SKU</TableCell>
//                                             <TableCell sx={{
//                                                 color: 'rgba(139, 144, 154, 1)'
//                                             }} align="center">#</TableCell>
//                                         </TableRow>
//                                     </TableHead>

//                                 </Table>
//                             </Box>
//                         </Collapse>
//                     </TableCell>
//                 </TableRow>
//             </>
//         );
//     };


//     const rows: RowData[] = [
//         createData('اطقم مواليد', 'منتج جذاب لطفلك يتمتع بمرونة بمرونة جذاب', 6.0, 'احمد محمد رضا', 'منذ دقيقتين', 3.99, 989),
//         createData('اطقم مواليد', 'منتج جذاب لطفلك يتمتع بمرونة بمرونة جذاب', 16.0, 'احمد محمد رضا', 'منذ دقيقتين', 3.79, 989),
//         createData('اطقم مواليد', 'منتج جذاب لطفلك يتمتع بمرونة بمرونة جذاب', 3.7, 'احمد محمد رضا', 'منذ دقيقتين', 2.5, 989),
//         createData('اطقم مواليد', 'منتج جذاب لطفلك يتمتع بمرونة بمرونة جذاب', 16.0, 'احمد محمد رضا', 'منذ دقيقتين', 1.5, 989),
//     ];


//     const [image, setImage] = useState('')




//     const handelImgUpload = (event: any) => {
//         const file = event.target.files[0];
//         if (file) {
//             const imageUrl: any = URL.createObjectURL(file);
//             setImage(imageUrl);


//         }
//     }



//     return (
//         <Box sx={{
//             flexGrow: 1,
//             backgroundColor: 'salmon',
//             margin: '10px'
//         }}>
//             <Grid2 container spacing={2}>

//                 {/* 1st row */}

//                 <Grid2 size={4}>
//                     <Item>

//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             اسم المنتج*
//                         </label>
//                         <input
//                             style={{
//                                 width: '100%',
//                                 marginTop: '10px',
//                                 padding: '7px',
//                                 borderRadius: '4px',
//                                 border: '1px solid black'
//                             }}
//                             type="text" name="" id=""
//                             placeholder='الاسم'
//                         />

//                     </Item>
//                 </Grid2>

//                 <Grid2 size={4}>
//                     <Item >

//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             سعر المنتج*
//                         </label>
//                         <input
//                             style={{
//                                 width: '100%',
//                                 marginTop: '10px',
//                                 padding: '7px',
//                                 borderRadius: '4px',
//                                 border: '1px solid black'
//                             }}
//                             type="text" name="" id=""
//                             placeholder='0.00'
//                         />

//                     </Item>
//                 </Grid2>

//                 <Grid2 size={4}>
//                     <Item>

//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             وصف المنتج*
//                         </label>
//                         <input
//                             style={{
//                                 width: '100%',
//                                 marginTop: '10px',
//                                 padding: '7px',
//                                 borderRadius: '4px',
//                                 border: '1px solid black'
//                             }}
//                             type="text" name="" id=""
//                             placeholder='الوصف'
//                         />

//                     </Item>
//                 </Grid2>

//                 {/* 1st row ends here  */}


//                 {/* 2nd row */}

//                 <Grid2 size={4}>
//                     {/* <Item>size=8</Item> */}
//                     <Item>


//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             الالوان الموجودة*
//                         </label>
//                         <select
//                             style={{
//                                 width: '100%',
//                                 padding: '5px',
//                                 margin: '7px 0'
//                             }}
//                             name="" id="">

//                             <option value="">
//                                 احمر
//                             </option>
//                             <option value="">
//                                 احمر
//                             </option>
//                             <option value="">
//                                 احمر
//                             </option>

//                         </select>

//                     </Item>
//                 </Grid2>

//                 <Grid2 size={8}>
//                     {/* <Item>size=8</Item> */}
//                     <label
//                         style={{
//                             display: 'block',
//                             marginBottom: '7px'

//                         }}
//                         htmlFor="">
//                         الالوان الموجودة*
//                     </label>
//                     <Item sx={{
//                         display: 'flex'
//                     }}>
//                         <Grid2 size={4}>
//                             <input
//                                 placeholder='1'
//                                 style={{ width: '100%', padding: '7px', border: 'none' }} type="text" />
//                         </Grid2>
//                         <Grid2 size={4}>
//                             <input
//                                 placeholder='2'
//                                 style={{ width: '100%', padding: '7px', border: 'none' }} type="text" />
//                         </Grid2>
//                         <Grid2 size={4}>
//                             <input
//                                 placeholder='3'
//                                 style={{ width: '100%', padding: '7px', border: 'none' }} type="text" />
//                         </Grid2>

//                     </Item>
//                 </Grid2>

//                 {/* 2nd row ends here  */}


//                 {/* 3rd row  */}

//                 <Grid2 size={4}>
//                     {/* <Item>size=8</Item> */}
//                     <Item>


//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             اسم المولود*
//                         </label>
//                         <input type="text"
//                             placeholder='الاسم'
//                             style={{
//                                 width: '100%',
//                                 padding: '7px',
//                                 marginTop: '5px'
//                             }}

//                         />

//                     </Item>
//                 </Grid2>


//                 <Grid2 size={4}>
//                     {/* <Item>size=8</Item> */}
//                     <Item>


//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             لون استيكر الطباعة*
//                         </label>
//                         <select name="" id=""
//                             style={{
//                                 width: '100%',
//                                 padding: '7px',
//                                 marginTop: '5px'
//                             }}
//                         >

//                             <option value="">اصفر</option>
//                             <option value="">اصفر</option>
//                             <option value="">اصفر</option>

//                         </select>

//                     </Item>
//                 </Grid2>

//                 <Grid2 size={4}>
//                     {/* <Item>size=8</Item> */}
//                     <Item>


//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             اختر نوع الخط*
//                         </label>
//                         <select name="" id=""
//                             style={{
//                                 width: '100%',
//                                 padding: '7px',
//                                 marginTop: '5px'
//                             }}
//                         >

//                             <option value="">اختر الخط</option>
//                             <option value="">اختر الخط</option>
//                             <option value="">اختر الخط</option>

//                         </select>

//                     </Item>
//                 </Grid2>


//                 {/* 3rd row ends here */}


//                 {/* 4th row starts here */}


//                 <Grid2 size={12}>

//                     <h1 style={{ textAlign: 'center' }}>  الاسم الاختياري (Optional) </h1>
//                 </Grid2>

//                 <Grid2 size={4}>
//                     {/* <Item>size=8</Item> */}
//                     <Item>


//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             اسم المولود بالانجليزي*
//                         </label>
//                         <input type='text'
//                             style={{
//                                 width: '100%',
//                                 padding: '7px',
//                                 marginTop: '5px'
//                             }}
//                             placeholder='الاسم'
//                         />

//                     </Item>
//                 </Grid2>



//                 <Grid2 size={4}>
//                     {/* <Item>size=8</Item> */}
//                     <Item>


//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             لون استيكر الطباعة*
//                         </label>
//                         <select name="" id=""
//                             style={{
//                                 width: '100%',
//                                 padding: '7px',
//                                 marginTop: '5px'
//                             }}
//                         >

//                             <option value="">اخضر</option>
//                             <option value=""> اخضر </option>
//                             <option value=""> اخضر </option>

//                         </select>

//                     </Item>
//                 </Grid2>



//                 <Grid2 size={4}>
//                     {/* <Item>size=8</Item> */}
//                     <Item>


//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             اختر نوع الخط*
//                         </label>
//                         <select name="" id=""
//                             style={{
//                                 width: '100%',
//                                 padding: '7px',
//                                 marginTop: '5px'
//                             }}
//                         >

//                             <option value="">اختر الخط</option>
//                             <option value="">اختر الخط</option>
//                             <option value="">اختر الخط</option>

//                         </select>

//                     </Item>
//                 </Grid2>

//                 {/* 4th row ends here  */}


//                 {/* 5th  row  */}


//                 <Grid2 size={4}>
//                     <Item>

//                         <label
//                             style={{
//                                 display: 'block'
//                             }}
//                             htmlFor="">
//                             اضافة قسم*
//                         </label>
//                         <input
//                             style={{
//                                 width: '100%',
//                                 marginTop: '10px',
//                                 padding: '7px',
//                                 borderRadius: '4px',
//                                 border: '1px solid black'
//                             }}
//                             type="text" name="" id=""
//                             placeholder='قسم جديد'
//                         />

//                         <label
//                             style={{
//                                 display: 'block',
//                                 marginTop: '20px'
//                             }}
//                             htmlFor="">
//                             صورة القسم*
//                         </label>
//                         <input
//                             style={{
//                                 width: '100%',
//                                 marginTop: '10px',
//                                 padding: '7px',
//                                 borderRadius: '4px',
//                                 border: '1px solid black'
//                             }}
//                             type="file" name="" id=""
//                             placeholder='قسم جديد'
//                             accept="image/*"
//                             onChange={(e) => handelImgUpload(e)}
//                         />



//                     </Item>
//                 </Grid2>

//                 <Grid2 size={4}>
//                     <Item sx={{
//                         textAlign: 'end'
//                     }} >

//                         <img src={image || '/assets/imgs/image-place-holder 1.svg'}
//                             style={{
//                                 width: '50%',
//                                 height: '150px',
//                             }}
//                             alt="" />

//                     </Item>
//                 </Grid2>

//                 <Grid2 size={4}>
//                     <Item
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'end',
//                             height: '100%'


//                         }}
//                     >

//                         <button
//                             style={{
//                                 border: '1px solid brown',
//                                 padding: '10px',
//                                 width: '110px',
//                                 borderRadius: '7px',
//                                 backgroundColor: 'rgba(101, 73, 41, 1)',
//                                 color: 'white'


//                             }}
//                         >تنفيذ</button>


//                         <button
//                             style={{
//                                 border: '1px solid rgba(101, 73, 41, 1)',
//                                 padding: '10px',
//                                 width: '110px',
//                                 borderRadius: '7px',
//                                 margin: '0 10px ',
//                                 backgroundColor: 'transparent'

//                             }}
//                         >اعادة الضبط</button>

//                     </Item>
//                 </Grid2>

//                 {/* 5th row ends here */}


//                 <Grid2 size={12}>

//                     <Box sx={{
//                         backgroundColor: '#09c',
//                         margin: '0 10px'
//                     }}>

//                         <Typography sx={{
//                             // backgroundColor: 'white',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between'

//                         }}>

//                             <div
//                                 style={{
//                                     display: 'flex',
//                                     alignItems: 'center'
//                                 }}
//                             >
//                                 <span
//                                     style={{
//                                         margin: '0 10px'
//                                     }}
//                                 >
//                                     قائمة المنتجات
//                                 </span>
//                                 <h3
//                                     style={{
//                                         width: '35px',
//                                         height: '35px',
//                                         display: 'flex',
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                         backgroundColor: 'rgba(245, 245, 221, 1)',
//                                         borderRadius: '50%'
//                                     }}
//                                 >14</h3>
//                             </div>

//                             <div>
//                                 <input type="text"
//                                     placeholder='بحث'
//                                 />
//                             </div>



//                         </Typography>


//                     </Box>

//                 </Grid2>


//                 <Grid2 size={12}>
//                     <Box sx={{
//                         padding: '0 20px'
//                     }}>
//                         <TableContainer component={Paper}>
//                             <Table>
//                                 <TableHead >
//                                     <TableRow>
//                                         <TableCell />
//                                         <TableCell sx={{
//                                             color: 'rgba(139, 144, 154, 1)'
//                                         }} align='center'> اسم المنتج </TableCell>
//                                         <TableCell sx={{
//                                             color: 'rgba(139, 144, 154, 1)'
//                                         }} align="center"> وصف المنتج </TableCell>
//                                         <TableCell sx={{
//                                             color: 'rgba(139, 144, 154, 1)'
//                                         }} align="center"> صورة المنتج </TableCell>
//                                         <TableCell sx={{
//                                             color: 'rgba(139, 144, 154, 1)'
//                                         }} align="center">  المقاسات </TableCell>
//                                         <TableCell sx={{
//                                             color: 'rgba(139, 144, 154, 1)'
//                                         }} align="center"> الألوان </TableCell>
//                                         <TableCell sx={{
//                                             color: 'rgba(139, 144, 154, 1)'
//                                         }} align="center">  الخطوط </TableCell>
//                                         <TableCell sx={{
//                                             color: 'rgba(139, 144, 154, 1)'
//                                         }} align="center">   </TableCell>


//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
//                                         <ClientsData key={row.id} row={row} />
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                             <TablePagination
//                                 rowsPerPageOptions={[2, 5, 10]}
//                                 component="div"
//                                 count={rows.length}
//                                 rowsPerPage={rowsPerPage}
//                                 page={page}
//                                 onPageChange={handleChangePage}
//                                 onRowsPerPageChange={handleChangeRowsPerPage}
//                                 sx={{
//                                     direction: 'ltr'
//                                 }}
//                             />
//                         </TableContainer>
//                     </Box>

//                 </Grid2>


//             </Grid2>
//         </Box>
//     )
// }

// export default ProductPrint