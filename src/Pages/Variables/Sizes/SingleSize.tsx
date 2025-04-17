import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  styled,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// تعريف واجهة الحجم
interface Size {
  id: number;
  name: string;
}

// أنماط عامة للمودال
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
interface SizeModalProps {
  open: boolean;
  onClose: () => void;
  type: "create" | "edit";
  size?: Size;
  onSubmit: (data: { name: string }) => void;
}
const SizeModal: React.FC<SizeModalProps> = ({ open, onClose, type, size, onSubmit }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>();

  useEffect(() => {
    if (type === "edit" && size) {
      setValue("name", size.name);
    } else {
      reset();
    }
  }, [type, size, setValue, reset]);

  const handleFormSubmit = (data: { name: string }) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="size-modal-title">
      <Box sx={modalStyle}>
        <Typography id="size-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          {type === "create" ? t("إضافة حجم جديد") : t("تعديل الحجم")}
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t("اسم الحجم")}
            </Typography>
            <input
              type="text"
              {...register("name", { required: true })}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            {errors.name && (
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
        <Typography variant="body1">{t("هل أنت متأكد من حذف هذا الحجم؟")}</Typography>
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

// صف الجدول الخاص بكل حجم
const SizeRow: React.FC<{
  size: Size;
  onEdit: (size: Size) => void;
  onDelete: (size: Size) => void;
}> = ({ size, onEdit, onDelete }) => {
  const { t } = useTranslation();
  return (
    <TableRow key={size.id}>
      <TableCell align="center">{size.name}</TableCell>
      <TableCell align="center">{size.id}</TableCell>
      <TableCell align="center">
        <Button onClick={() => onEdit(size)}>
          <img src="/assets/imgs/edit.svg" alt={t("تعديل")} />
        </Button>
        <Button onClick={() => onDelete(size)}>
          <img src="/assets/imgs/trash.svg" alt={t("حذف")} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

// المكون الرئيسي لإدارة الأحجام
const SingleSizes: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [sizes, setSizes] = useState<Size[]>([]);

  // بيانات مودال الإضافة/التعديل
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  // بيانات مودال الحذف
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // جلب الأحجام من الـ API
  const fetchSizes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://babyhumod.shop/api/sizes");
      setSizes(response.data);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  // فتح مودال إضافة حجم جديد
  const openCreateModal = () => {
    setModalType("create");
    setSelectedSize(null);
    setSizeModalOpen(true);
  };

  // فتح مودال تعديل حجم
  const openEditModal = (size: Size) => {
    setModalType("edit");
    setSelectedSize(size);
    setSizeModalOpen(true);
  };

  // إغلاق مودال الإضافة/التعديل
  const closeSizeModal = () => {
    setSizeModalOpen(false);
  };

  // إضافة/تعديل الحجم
  const handleSizeSubmit = async (data: { name: string }) => {
    if (modalType === "create") {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        await axios.post("https://babyhumod.shop/api/sizes", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(t("تم الإضافة بنجاح"));
        fetchSizes();
        closeSizeModal();
      } catch (error) {
        console.error("Error adding size:", error);
        toast.error(t("حدث خطأ أثناء الإضافة"));
      }
    } else if (modalType === "edit" && selectedSize) {
      try {
        await axios.put(`https://babyhumod.shop/api/sizes/${selectedSize.id}`, {
          name: data.name,
        });
        toast.success(t("تم التعديل بنجاح"));
        fetchSizes();
        closeSizeModal();
      } catch (error) {
        console.error("Error updating size:", error);
        toast.error(t("حدث خطأ أثناء التعديل"));
      }
    }
  };

  // فتح مودال الحذف
  const openDeleteModal = (size: Size) => {
    setSelectedSize(size);
    setDeleteModalOpen(true);
  };

  // إغلاق مودال الحذف
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // تأكيد الحذف
  const confirmDelete = async () => {
    if (!selectedSize) return;
    try {
      await axios.delete(`https://babyhumod.shop/api/sizes/${selectedSize.id}`);
      toast.success(t("تم الحذف بنجاح"));
      fetchSizes();
    } catch (error) {
      console.error("Error deleting size:", error);
      toast.error(t("حدث خطأ أثناء الحذف"));
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <>
      {/* زر إضافة حجم جديد */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 3 }}>
        <Button variant="contained" onClick={openCreateModal}>
          {t("إضافة حجم جديد")}
        </Button>
      </Box>

      {/* مودال الإضافة/التعديل */}
      <SizeModal
        open={sizeModalOpen}
        onClose={closeSizeModal}
        type={modalType}
        size={selectedSize || undefined}
        onSubmit={handleSizeSubmit}
      />

      {/* مودال الحذف */}
      <DeleteModal open={deleteModalOpen} onClose={closeDeleteModal} onDelete={confirmDelete} />

      {/* جدول عرض الأحجام */}
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
                    {t("اسم الحجم")}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "rgba(139, 144, 154, 1)" }}>
                    {t("Size ID")}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "rgba(139, 144, 154, 1)" }}>
                    {t("الإجراءات")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((size) => (
                  <SizeRow key={size.id} size={size} onEdit={openEditModal} onDelete={openDeleteModal} />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10]}
              component="div"
              count={sizes.length}
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

export default SingleSizes;
