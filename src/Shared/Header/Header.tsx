import './Header.css';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TranslateIcon from '@mui/icons-material/Translate';

const Header = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '35px',
        backgroundColor: '#fff',
        padding: '17px 15px'
      }}
    >
      <Typography sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to={'notifications'}>
          <img
            src="/assets/imgs/Notification.svg"
            style={{ margin: '0px 15px' }}
            alt={t("header.notificationAlt")}
          />
        </Link>
        <Tooltip title={t("header.changeLanguage")}>
          <IconButton onClick={toggleLanguage}>
            <TranslateIcon />
          </IconButton>
        </Tooltip>
      </Typography>

      <h3 style={{ margin: 0, position: 'relative' }} className="profile-container">
        <img
          src="/assets/imgs/profile 1.svg"
          alt={t("header.profileAlt")}
          className="profile-img"
        />
        <div className="dropdown-menu">
          <Link to="/edit-profile">{t("header.editProfile")}</Link>
          <Link to="/logout">{t("header.logout")}</Link>
        </div>
      </h3>
    </Box>
  );
};

export default Header;
