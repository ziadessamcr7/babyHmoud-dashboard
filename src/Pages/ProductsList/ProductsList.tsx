import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CustomizedForm = () => {
  // تخزين النماذج المجلوبة من الـ API
  const [forms, setForms] = useState([]);
  // تخزين بيانات النموذج الحالي (للإنشاء أو التعديل)
  const [activeForm, setActiveForm] = useState({
    name: '',
    description: '',
    fields: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // رابط الـ API للنماذج
  const apiUrl = 'https://babyhumod.shop/api/forms';

  // جلب النماذج عند تحميل المكوّن
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error('خطأ أثناء جلب النماذج:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث القيم الأساسية للنموذج (الاسم، الوصف)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActiveForm((prev) => ({ ...prev, [name]: value }));
  };

  // تحديث قيمة حقل معين داخل مصفوفة الحقول
  const handleFieldChange = (index, fieldName, value) => {
    const newFields = [...activeForm.fields];
    newFields[index] = { ...newFields[index], [fieldName]: value };
    setActiveForm((prev) => ({ ...prev, fields: newFields }));
  };

  // عند تغيير نوع الحقل، نهيئ بيانات الحقل الجديد
  // في حالة "نص منسق" يتم إنشاء مفتاح "options" فارغ بحيث يدخل المستخدم الـ JSON كاملاً
  const handleTypeChange = (index, newType) => {
    const newFields = [...activeForm.fields];
    if (newType === 'styled_text') {
      newFields[index] = {
        type: 'styled_text',
        label: newFields[index].label || '',
        options: ''
      };
    } else if (newType === 'dropdown') {
      newFields[index] = {
        type: 'dropdown',
        label: newFields[index].label || '',
        options: ''
      };
    } else {
      newFields[index] = { type: 'text', label: newFields[index].label || '' };
    }
    setActiveForm((prev) => ({ ...prev, fields: newFields }));
  };

  // إضافة حقل جديد (افتراضيًا من نوع "نص")
  const addField = () => {
    setActiveForm((prev) => ({
      ...prev,
      fields: [...prev.fields, { type: 'text', label: '' }]
    }));
  };

  // حذف حقل معين من النموذج
  const removeField = (index) => {
    const newFields = [...activeForm.fields];
    newFields.splice(index, 1);
    setActiveForm((prev) => ({ ...prev, fields: newFields }));
  };

  // عند إرسال النموذج (إنشاء أو تحديث)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // تجهيز البيانات قبل الإرسال؛
    // بالنسبة للحقل من نوع "نص منسق" نستخدم القيمة المدخلة كما هي (يتوقع أن يدخل المستخدم JSON كامل)
    const payload = {
      name: activeForm.name,
      description: activeForm.description,
      fields: activeForm.fields.map((field) => {
        if (field.type === 'dropdown') {
          return {
            type: field.type,
            label: field.label,
            options:
              typeof field.options === 'string'
                ? field.options.split(',').map(opt => opt.trim()).filter(opt => opt !== '')
                : field.options
          };
        }
        if (field.type === 'styled_text') {
          let optionsObj = {};
          try {
            optionsObj = JSON.parse(field.options);
          } catch (error) {
            console.error('صيغة JSON غير صالحة للحقل styled_text', error);
          }
          return {
            type: field.type,
            label: field.label,
            allowed_fonts: optionsObj.allowed_fonts || [],
            allowed_colors: optionsObj.allowed_colors || []
          };
        }

        return { type: field.type, label: field.label, options: null };
      })
    };

    console.log("Payload:", payload);

    try {
      let response;
      if (isEditing && activeForm.id) {
        response = await fetch(`${apiUrl}/${activeForm.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      const result = await response.json();
      console.log('تم حفظ النموذج:', result);
      fetchForms();
      resetForm();
    } catch (error) {
      console.error('خطأ أثناء حفظ النموذج:', error);
    }
  };

  // إعادة تعيين النموذج إلى القيم الافتراضية
  const resetForm = () => {
    setActiveForm({
      name: '',
      description: '',
      fields: []
    });
    setIsEditing(false);
  };

  // تعبئة بيانات النموذج عند النقر على زر التعديل
  const handleEditForm = (form) => {
    const formattedFields = form.fields.map((field) => {
      if (field.type === 'dropdown' && field.options) {
        try {
          const opts = typeof field.options === 'string' ? JSON.parse(field.options) : field.options;
          if (Array.isArray(opts)) {
            return { ...field, options: opts.join(', ') };
          }
          return field;
        } catch (error) {
          return field;
        }
      }
      if (field.type === 'styled_text' && field.options) {
        // نعرض القيمة كما هي للمستخدم ليعدلها
        return { ...field };
      }
      return field;
    });
    setActiveForm({ ...form, fields: formattedFields });
    setIsEditing(true);
  };

  // حذف نموذج من خلال الـ API
  const handleDeleteForm = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا النموذج؟')) {
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        console.log('تم حذف النموذج:', result);
        fetchForms();
      } catch (error) {
        console.error('خطأ أثناء حذف النموذج:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        النموذج المخصص للمنتجات
      </Typography>

      {/* نموذج الإنشاء/التعديل */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="اسم النموذج"
            name="name"
            value={activeForm.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="الوصف"
            name="description"
            value={activeForm.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            الحقول
          </Typography>
          {activeForm.fields.map((field, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Select
                value={field.type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
                sx={{ mr: 2, width: '150px' }}
              >
                <MenuItem value="text">نص</MenuItem>
                <MenuItem value="dropdown">قائمة منسدلة</MenuItem>
                <MenuItem value="styled_text">نص منسق</MenuItem>
              </Select>
              <TextField
                label="التسمية"
                value={field.label}
                onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                sx={{ mr: 2, flex: 1 }}
                required
              />
              {field.type === 'dropdown' && (
                <TextField
                  label="خيارات (مفصولة بفواصل)"
                  value={field.options || ''}
                  onChange={(e) => handleFieldChange(index, 'options', e.target.value)}
                  sx={{ mr: 2, flex: 1 }}
                  required
                />
              )}
              {field.type === 'styled_text' && (
                <TextField
                  label="خيارات (أدخل JSON كاملاً)"
                  value={field.options || ''}
                  onChange={(e) => handleFieldChange(index, 'options', e.target.value)}
                  sx={{ mr: 2, flex: 1 }}
                  required
                  placeholder='{"allowed_fonts": ["Arial", "Helvetica", "Times New Roman"], "allowed_colors": ["#000000", "#FF0000", "#00FF00"]}'
                />
              )}
              <IconButton onClick={() => removeField(index)}>
                <RemoveCircleOutlineIcon color="error" />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addField}
            sx={{ mb: 2 }}
          >
            إضافة حقل
          </Button>
          <Box sx={{ mt: 2 }}>
            <Button sx={{ marginLeft: '8px' }} variant="contained" type="submit">
              {isEditing ? 'تحديث النموذج' : 'إنشاء النموذج'}
            </Button>
            <Button variant="outlined" onClick={resetForm} sx={{ ml: 2 }}>
              إعادة التعيين
            </Button>
          </Box>
        </form>
      </Paper>

      {/* عرض النماذج الحالية */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        النماذج الحالية
      </Typography>
      {isLoading ? (
        <Typography>جار التحميل...</Typography>
      ) : (
        forms.map((form) => (
          <Paper
            key={form.id}
            sx={{
              p: 2,
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant="h6">{form.name}</Typography>
              <Typography variant="body2">{form.description}</Typography>
            </Box>
            <Box>
              <IconButton onClick={() => handleEditForm(form)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteForm(form.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default CustomizedForm;
