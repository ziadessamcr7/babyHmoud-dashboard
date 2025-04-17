import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  styled
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // تأكد من دعم مشروعك لـ Grid2
import axios from "axios";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// تعريف واجهة اللون مع الحقول الجديدة
interface Color {
  id: number;
  name: string;
  description_ar: string;
  description_en: string;
}

// أنماط عامة
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: theme.palette.text.primary,
  boxShadow: "none",
}));

// مودال الإضافة/التعديل
interface ColorModalProps {
  open: boolean;
  onClose: () => void;
  type: "create" | "edit";
  color?: Color;
  onSubmit: (data: { name: string; description_ar: string; description_en: string }) => void;
}
const ColorModal: React.FC<ColorModalProps> = ({ open, onClose, type, color, onSubmit }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<{ name: string; description_ar: string; description_en: string }>();

  useEffect(() => {
    if (type === "edit" && color) {
      setValue("name", color.name);
      setValue("description_ar", color.description_ar);
      setValue("description_en", color.description_en);
    } else {
      reset();
    }
  }, [type, color, setValue, reset]);

  const handleFormSubmit = (data: { name: string; description_ar: string; description_en: string }) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="color-modal-title">
      <Box sx={modalStyle}>
        <Typography id="color-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          {type === "create" ? t("إضافة لون جديد") : t("تعديل اللون")}
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t("اسم اللون")}
            </Typography>
            <input
              type="text"
              {...register("name", { required: true })}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
            {errors.name && (
              <Typography color="error" variant="caption">
                {t("هذا الحقل مطلوب")}
              </Typography>
            )}
          </Box>
          {/* حقل وصف اللون بالعربي */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t("وصف اللون بالعربي")}
            </Typography>
            <input
              type="text"
              {...register("description_ar", { required: true })}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
            {errors.description_ar && (
              <Typography color="error" variant="caption">
                {t("هذا الحقل مطلوب")}
              </Typography>
            )}
          </Box>
          {/* حقل وصف اللون بالإنجليزي */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t("وصف اللون بالإنجليزي")}
            </Typography>
            <input
              type="text"
              {...register("description_en", { required: true })}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
            {errors.description_en && (
              <Typography color="error" variant="caption">
                {t("هذا الحقل مطلوب")}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={onClose}>{t("إلغاء")}</Button>
            <Button type="submit" variant="contained">
              {type === "create" ? t("إضافة") : t("تعديل")}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

// مودال الحذف
interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onDelete }) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="delete-modal-title">
      <Box sx={modalStyle}>
        <Typography id="delete-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          {t("تأكيد الحذف")}
        </Typography>
        <Typography variant="body1">{t("هل أنت متأكد من حذف هذا اللون؟")}</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
          <Button onClick={onClose}>{t("إلغاء")}</Button>
          <Button variant="contained" onClick={onDelete}>
            {t("حذف")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// صف الجدول الخاص بكل لون مع عرض الوصف بناءً على اللغة الحالية
const ColorRow: React.FC<{
  color: Color;
  onEdit: (color: Color) => void;
  onDelete: (color: Color) => void;
}> = ({ color, onEdit, onDelete }) => {
  const { t, i18n } = useTranslation();
  return (
    <TableRow key={color.id}>
      <TableCell align="center">{color.name}</TableCell>
      <TableCell align="center">
        {i18n.language === "ar" ? color.description_ar : color.description_en}
      </TableCell>
      <TableCell align="center">{color.id}</TableCell>
      <TableCell align="center">
        <Button onClick={() => onEdit(color)}>
          <img src="/assets/imgs/edit.svg" alt={t("تعديل")} />
        </Button>
        <Button onClick={() => onDelete(color)}>
          <img src="/assets/imgs/trash.svg" alt={t("حذف")} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

// المكون الرئيسي لإدارة الألوان
const SingleColors: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState<Color[]>([]);

  // بيانات المودال الخاص بالإضافة/التعديل
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [colorModalType, setColorModalType] = useState<"create" | "edit">("create");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  // بيانات المودال الخاص بالحذف
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // جلب الألوان من الـ API
  const fetchColors = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://babyhumod.shop/api/colors");
      setColors(response.data);
    } catch (error) {
      console.error("Error fetching colors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  // فتح مودال إضافة لون جديد
  const openCreateModal = () => {
    setColorModalType("create");
    setSelectedColor(null);
    setColorModalOpen(true);
  };

  // فتح مودال تعديل لون
  const openEditModal = (color: Color) => {
    setColorModalType("edit");
    setSelectedColor(color);
    setColorModalOpen(true);
  };

  // إغلاق مودال الإضافة/التعديل
  const closeColorModal = () => {
    setColorModalOpen(false);
  };

  // إضافة/تعديل اللون مع الحقول الجديدة
  const handleColorSubmit = async (data: { name: string; description_ar: string; description_en: string }) => {
    if (colorModalType === "create") {
      // إضافة لون جديد
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description_ar", data.description_ar);
        formData.append("description_en", data.description_en);
        await axios.post("https://babyhumod.shop/api/colors", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success(t("تم الإضافة بنجاح"));
        fetchColors();
        closeColorModal();
      } catch (error) {
        console.error("Error adding color:", error);
        toast.error(t("حدث خطأ أثناء الإضافة"));
      }
    } else if (colorModalType === "edit" && selectedColor) {
      // تعديل لون
      try {
        await axios.put(`https://babyhumod.shop/api/colors/${selectedColor.id}`, {
          name: data.name,
          description_ar: data.description_ar,
          description_en: data.description_en,
        });
        toast.success(t("تم التعديل بنجاح"));
        fetchColors();
        closeColorModal();
      } catch (error) {
        console.error("Error updating color:", error);
        toast.error(t("حدث خطأ أثناء التعديل"));
      }
    }
  };

  // فتح مودال الحذف
  const openDeleteModal = (color: Color) => {
    setSelectedColor(color);
    setDeleteModalOpen(true);
  };

  // إغلاق مودال الحذف
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // تأكيد الحذف
  const confirmDelete = async () => {
    if (!selectedColor) return;
    try {
      await axios.delete(`https://babyhumod.shop/api/colors/${selectedColor.id}`);
      toast.success(t("تم الحذف بنجاح"));
      fetchColors();
    } catch (error) {
      console.error("Error deleting color:", error);
      toast.error(t("حدث خطأ أثناء الحذف"));
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <>
      {/* زر إضافة لون جديد */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 3 }}>
        <Button variant="contained" onClick={openCreateModal}>
          {t("إضافة لون جديد")}
        </Button>
      </Box>

      {/* مودال الإضافة/التعديل */}
      <ColorModal
        open={colorModalOpen}
        onClose={closeColorModal}
        type={colorModalType}
        color={selectedColor || undefined}
        onSubmit={handleColorSubmit}
      />

      {/* مودال الحذف */}
      <DeleteModal open={deleteModalOpen} onClose={closeDeleteModal} onDelete={confirmDelete} />

      {/* جدول عرض الألوان */}
      {isLoading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <BeatLoader margin={3} />
        </Box>
      ) : (
        <Box sx={{ px: 3, mt: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: "rgba(139, 144, 154, 1)" }}>
                    {t("اسم اللون")}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "rgba(139, 144, 154, 1)" }}>
                    {t("الوصف")}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "rgba(139, 144, 154, 1)" }}>
                    {t("Color ID")}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "rgba(139, 144, 154, 1)" }}>
                    {t("الإجراءات")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {colors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((color) => (
                    <ColorRow
                      key={color.id}
                      color={color}
                      onEdit={openEditModal}
                      onDelete={openDeleteModal}
                    />
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10]}
              component="div"
              count={colors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ direction: "ltr" }}
            />
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default SingleColors;
