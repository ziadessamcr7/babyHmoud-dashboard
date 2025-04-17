import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';
import './AppSettings.css';
import { useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import ContactUs from './ContactUs';
import PrivacyPolicy from './PrivacyPolicy';
import Countries from './Countries';
import { useTranslation } from 'react-i18next';

const AppSettings = () => {
    const { t } = useTranslation();
    const { setValue } = useForm();

    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<'contactUs' | 'privacyPolicy' | 'countries'>('contactUs');

    // Fetch contact information
    const getContactUsData = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('https://babyhumod.shop/api/contact-info');
            console.log('Contact Info:', data);
            // Example: If you want to use form context to set values, you can add that here.
        } catch (error) {
            console.error('Error fetching contact info:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch About Us / Privacy Policy content
    const getAboutUsData = async () => {
        try {
            const { data } = await axios.get('https://babyhumod.shop/api/pages');
            console.log('About / Terms:', data);
            setValue('about', data.about);
            setValue('terms', data.terms);
        } catch (error) {
            console.error('Error fetching about/terms:', error);
            setIsLoading(false);
        }
    };

    // Fetch countries list
    const getCountriesData = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('https://babyhumod.shop/api/countries');
            console.log('Countries:', data);
            // You can pass this data to the Countries component via props if needed.
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // On component mount
    useEffect(() => {
        getContactUsData();
        getAboutUsData();
        getCountriesData();
    }, []);

    return (
        <Container className="AppSettings" maxWidth="lg">
            {/* Navigation Tabs */}
            <ul
                style={{
                    listStyle: 'none',
                    textAlign: 'start',
                    display: 'flex',
                    width: '47%',
                    justifyContent: 'space-between',
                    fontSize: '16px',
                    cursor: 'pointer',
                    padding: 0,
                }}
            >
                <li
                    className={activeCategory === 'contactUs' ? 'active link' : 'link'}
                    onClick={() => setActiveCategory('contactUs')}
                >
                    {t('menu.contactUs')}
                </li>
                <li
                    className={activeCategory === 'privacyPolicy' ? 'active link' : 'link'}
                    onClick={() => setActiveCategory('privacyPolicy')}
                >
                    {t('menu.privacyPolicy')}
                </li>
                <li
                    className={activeCategory === 'countries' ? 'active link' : 'link'}
                    onClick={() => setActiveCategory('countries')}
                >
                    {t('menu.countries')}
                </li>
            </ul>

            {/* Content Section */}
            {isLoading ? (
                <div style={{ textAlign: 'center' }}>
                    <BeatLoader margin={3} />
                </div>
            ) : (
                <>
                    {activeCategory === 'contactUs' && <ContactUs />}
                    {activeCategory === 'privacyPolicy' && <PrivacyPolicy />}
                    {activeCategory === 'countries' && <Countries />}
                </>
            )}
        </Container>
    );
};

export default AppSettings;
