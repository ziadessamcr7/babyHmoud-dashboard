import { useState } from 'react';
import './Variables.css';
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
