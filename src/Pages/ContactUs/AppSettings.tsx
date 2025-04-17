import { useEffect, useState, memo } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Grid2,
    Paper,
    Avatar,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Modal
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AppSettings.css'
import { useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import PrivacyPolicy from './PrivacyPolicy';
import Countries from './Countries';
import { useTranslation } from 'react-i18next';

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)'
}));

const ImagePlaceholder = styled(Box)(({ theme }) => ({
    width: 180,
    height: 220,
    backgroundColor: '#f8f9fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2)
}));

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

const FieldLabel = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    fontWeight: 'medium',
    textAlign: 'right',
    direction: 'rtl',
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    borderRadius: 0,
    boxShadow: 'none',
    color: theme.palette.text.secondary,
}));

// Memoized Input Field component to prevent unnecessary re-renders
const InputField = memo(({ label, name, value, onChange }: any) => (
    <Grid2>
        <Item>
            <FieldLabel>{label}</FieldLabel>
            <TextField
                fullWidth
                name={name}
                value={value}
                onChange={onChange}
                variant="outlined"
                size="small"
                inputProps={{ dir: 'rtl' }}
            />
        </Item>
    </Grid2>
));

const InputFieldTwo = memo(({ label, name, register, required, file, placeholder }: any) => (
    <Grid2>
        <Item>
            <FieldLabel>{label}</FieldLabel>
            <TextField
                fullWidth
                {...register(name, { required })}
                variant="outlined"
                size="small"
                inputProps={{ dir: 'rtl' }}
                type={file}
                placeholder={placeholder}
            />
        </Item>
    </Grid2>
));

const AppSettings = () => {

    const { t } = useTranslation();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [previewImage, setPreviewImage] = useState<string | null>(null); // ⬅️ تخزين الصورة المختارة



    const [formData, setFormData] = useState({
        phone_number: '',
        facebook: '',
        whatsapp: '',
        snapchat: '',
        email: '',
        instagram: '',
        website: '',
        tiktok: ''
    });


    const [isLoading, setIsLoading] = useState(true);

    // Optimized change handler
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit1 = async (e: any) => {
        e.preventDefault();
        console.log('Form data being submitted:', formData);

        try {
            const response = await axios.put("https://babyhumod.shop/api/contact-info", formData);
            console.log('response', response.data);
            toast.success('تم الاضافة بنجاح');
        } catch (error) {
            console.error("Error:", error);
            toast.error('حدث خطأ أثناء الحفظ');
        }
    };

    const handleReset = () => {
        setFormData({
            phone_number: '',
            facebook: '',
            whatsapp: '',
            snapchat: '',
            email: '',
            instagram: '',
            website: '',
            tiktok: ''
        });
    };

    const getContactUsData = () => {
        setIsLoading(true)
        axios.get(`https://babyhumod.shop/api/contact-info`)
            .then((response) => {
                console.log('API Response:', response.data);
                setFormData({
                    phone_number: response.data.phone_number || '',
                    facebook: response.data.facebook || '',
                    whatsapp: response.data.whatsapp || '',
                    snapchat: response.data.snapchat || '',
                    email: response.data.email || '',
                    instagram: response.data.instagram || '',
                    website: response.data.website || '',
                    tiktok: response.data.tiktok || ''
                });

                setIsLoading(false)

            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false)

            });
    };



    const getAboutUsData = () => {
        axios.get(`https://babyhumod.shop/api/pages`)
            .then((response) => {
                console.log('ana ml about:', response.data);

                setValue('about', response.data.about)
                setValue('terms', response.data.terms)


            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }


    const [activeCategory, setActiveCategory] = useState('contactUs')
    const [countries, setCountries] = useState([])
    const [open, setOpen] = useState(false);





    const handleImg = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setValue('image', file);
            setPreviewImage(URL.createObjectURL(file)); // ⬅️ تحديث المعاينة بالصورة الجديدة

        }
    };


    const submitAboutUsData = (data: any) => {

        console.log(data);

        setIsLoading(true);
        axios.put(`https://babyhumod.shop/api/pages`, data)
            .then((response) => {
                console.log('done editinggg :', response.data);
                toast.success('تم التعديل بنجاح')


                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });


    }


    const getCountriesData = () => {
        setIsLoading(true);
        axios.get(`https://babyhumod.shop/api/countries`)
            .then((response) => {
                console.log('ana geeeeet:', response.data);
                setCountries(response.data)
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [modalType, setModalType] = useState<string>("");
    const [countryId, setCountryId] = useState<number>(0);

    const handleOpen = (type: string, country: any) => {
        // console.log(country, 'ssssfrrrrsss');

        setModalType(type);
        setOpen(true);

        if (type === 'delete') {
            setCountryId(country.id);
            // setClientId(client.id);
            // setValue('first_name', client.first_name);
            // setValue('last_name', client.last_name);
            // setValue('birth_date', client.birth_date);
        }


    };

    const deleteCountry = () => {
        console.log(countryId);

        axios.delete(`https://babyhumod.shop/api/countries/${countryId}`)
            .then((response) => {
                console.log(response);
                handleClose()
                toast.success('تم المسح بنجاح')

                getCountriesData(); // إعادة تحميل قائمة العملاء بعد التحديث

            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response.data.error)
                handleClose()

            });

    }


    useEffect(() => {
        getContactUsData();
        getAboutUsData()
        getCountriesData()
    }, []);

    return (


        <>
            <Container className='AppSettings' maxWidth="lg" sx={{}}>
                <ul
                    style={{
                        listStyle: 'none',
                        textAlign: 'start',
                        display: 'flex',
                        width: '47%',
                        justifyContent: 'space-between',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >
                    <li
                        className={activeCategory === 'contactUs' ? 'active link' : 'link'}
                        onClick={() => setActiveCategory('contactUs')}


                    > {t("menu.contactUs")} </li>
                    {/* <li className={activeCategory === 'privacyPolicy' ? 'link active' : 'link'} onClick={() => setActiveCategory('privacyPolicy')} > الشروط و الاحكام </li> */}
                    <li className={activeCategory === 'privacyPolicy' ? 'link active' : 'link'} onClick={() => setActiveCategory('privacyPolicy')} > {t('menu.privacyPolicy')} </li>
                    <li className={activeCategory === 'countries' ? 'active link' : 'link'} onClick={() => setActiveCategory('countries')}> {t('menu.countries')} </li>
                </ul>


                {
                    isLoading === true ? <>

                        <div style={{
                            textAlign: 'center'
                        }}>
                            <BeatLoader margin={3} />
                        </div>

                    </> :

                        activeCategory === 'contactUs' ?
                            <ContactUs />

                            : activeCategory === 'privacyPolicy' ?
                                <PrivacyPolicy /> :

                                // activeCategory === 'aboutUs' ?
                                //     <AboutUs />
                                //     :

                                activeCategory === 'countries' ?
                                    <Countries />
                                    : ''

                }



            </Container>


        </>

    );
};

export default AppSettings;