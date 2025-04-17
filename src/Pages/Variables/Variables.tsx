import React, { useEffect, useState } from 'react';
import './Variables.css';
import { Box, Grid2, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import SingleColors from './Colors/SingleColors';
import GroupColors from './Colors/GroupColors';
import SingleSize from './Sizes/SingleSize';
import GroupSize from './Sizes/GroupSize';
import { useTranslation } from 'react-i18next';

const Variables = () => {
    const { t } = useTranslation();
    const [activeBtn, setActiveBtn] = useState('singleColors');

    return (
        <>
            <ul style={{
                listStyle: 'none',
                display: 'flex'
            }}>
                <li
                    onClick={() => { setActiveBtn('singleColors') }}
                    style={{ margin: '0 7px', cursor: 'pointer', paddingBottom: '7px' }}
                    className={activeBtn === 'singleColors' ? 'activeBtn' : ''}
                >{t("الالوان الفردية")}</li>
                <li
                    onClick={() => { setActiveBtn('GroupColors') }}
                    style={{ margin: '0 7px', cursor: 'pointer' }}
                    className={activeBtn === 'GroupColors' ? 'activeBtn' : ''}
                >{t("مجموعات الالوان")}</li>
                <li
                    onClick={() => { setActiveBtn('SingleSize') }}
                    style={{ margin: '0 7px', cursor: 'pointer' }}
                    className={activeBtn === 'SingleSize' ? 'activeBtn' : ''}
                >{t("الاحجام الفردية")}</li>
                <li
                    onClick={() => { setActiveBtn('GroupSize') }}
                    style={{ margin: '0 7px', cursor: 'pointer' }}
                    className={activeBtn === 'GroupSize' ? 'activeBtn' : ''}
                >{t("مجموعات الاحجام")}</li>
            </ul>

            {
                activeBtn === 'singleColors' ? (
                    <SingleColors />
                ) : activeBtn === 'GroupColors' ? (
                    <GroupColors />
                ) : activeBtn === 'SingleSize' ? (
                    <SingleSize />
                ) : activeBtn === 'GroupSize' ? (
                    <GroupSize />
                ) : null
            }
        </>
    );
}

export default Variables;
