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
    styled
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import FormatSizeIcon from '@mui/icons-material/FormatSize';

// واجهة مجموعة الأحجام (Group Size)
interface GroupSize {
    id: number;
    name: string;
    // من خلال علاقة الـ API تكون المقاسات ضمن العلاقة "sizes"
    sizes?: Size[];
}

// واجهة الحجم الفردي
interface Size {
    id: number;
    name: string;
}

// أنماط المودال العامة
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

// مودال إضافة/تعديل مجموعة حجم
interface GroupSizeModalProps {
    open: boolean;
    onClose: () => void;
    type: "create" | "edit";
    group?: GroupSize;
    onSubmit: (data: { name: string }) => void;
}
const GroupSizeModal: React.FC<GroupSizeModalProps> = ({ open, onClose, type, group, onSubmit }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<{ name: string }>();

    useEffect(() => {
        if (type === "edit" && group) {
            setValue("name", group.name);
        } else {
            reset();
        }
    }, [type, group, setValue, reset]);

    const handleFormSubmit = (data: { name: string }) => {
        onSubmit(data);
        reset();
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="group-modal-title">
            <Box sx={modalStyle}>
                <Typography id="group-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    {type === "create" ? t("إضافة مجموعة حجم جديدة") : t("تعديل مجموعة الحجم")}
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            {t("اسم المجموعة")}
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
                <Typography variant="body1">{t("هل أنت متأكد من حذف هذه المجموعة؟")}</Typography>
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

// مودال تعديل المقاسات داخل مجموعة حجم (Edit Group Sizes Modal)
interface EditGroupSizesModalProps {
    open: boolean;
    onClose: () => void;
    groupId: number;
    availableSizes: Size[];
    preSelectedSizeIds: number[];
    onSizesUpdated: () => void;
}
const EditGroupSizesModal: React.FC<EditGroupSizesModalProps> = ({
    open,
    onClose,
    groupId,
    availableSizes,
    preSelectedSizeIds,
    onSizesUpdated,
}) => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset } = useForm<{ selectedSizes: string[] }>({
        defaultValues: { selectedSizes: preSelectedSizeIds.map(String) }
    });

    useEffect(() => {
        reset({ selectedSizes: preSelectedSizeIds.map(String) });
    }, [preSelectedSizeIds, reset]);

    const onSubmit = async (data: { selectedSizes: string[] }) => {
        try {
            await axios.put(`https://babyhumod.shop/api/size-groups/${groupId}/sizes`, {
                size_ids: data.selectedSizes.map((id) => Number(id))
            });
            toast.success(t("تم تحديث المقاسات بنجاح"));
            onSizesUpdated();
            reset();
            onClose();
        } catch (error) {
            console.error("Error updating group sizes", error);
            toast.error(t("حدث خطأ أثناء تحديث المقاسات"));
        }
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="edit-sizes-modal-title">
            <Box sx={modalStyle}>
                <Typography id="edit-sizes-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    {t("تعديل المقاسات للمجموعة")}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 2 }}>
                        {availableSizes.map((size) => (
                            <Box key={size.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <input
                                    type="checkbox"
                                    value={size.id}
                                    {...register("selectedSizes")}
                                    style={{ marginRight: "8px" }}
                                />
                                <Typography>{size.name}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        <Button onClick={onClose}>{t("إلغاء")}</Button>
                        <Button type="submit" variant="contained">
                            {t("حفظ التعديلات")}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

// صف الجدول الخاص بكل مجموعة حجم
interface GroupSizeRowProps {
    group: GroupSize;
    onEdit: (group: GroupSize) => void;
    onDelete: (group: GroupSize) => void;
    onEditSizes: (group: GroupSize) => void;
}
const GroupSizeRow: React.FC<GroupSizeRowProps> = ({ group, onEdit, onDelete, onEditSizes }) => {
    const { t } = useTranslation();
    return (
        <TableRow key={group.id}>
            <TableCell align="center">{group.name}</TableCell>
            <TableCell align="center">{group.id}</TableCell>
            <TableCell align="center">
                <Button onClick={() => onEdit(group)}>
                    <img src="/assets/imgs/edit.svg" alt={t("تعديل")} />
                </Button>
                <Button onClick={() => onDelete(group)}>
                    <img src="/assets/imgs/trash.svg" alt={t("حذف")} />
                </Button>
                <Button onClick={() => onEditSizes(group)} sx={{ ml: 1 }}>
                    {/* <img src="/assets/imgs/plus.svg" alt={t("تعديل المقاسات")} /> */}
                    <FormatSizeIcon sx={{ fontSize: 25, color: '#388e3c' }} />
                </Button>
            </TableCell>
        </TableRow>
    );
};

// المكون الرئيسي لإدارة مجموعات الأحجام
const GroupSizePage: React.FC = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [groupSizes, setGroupSizes] = useState<GroupSize[]>([]);
    const [availableSizes, setAvailableSizes] = useState<Size[]>([]);
    const [btnState, setBtnState] = useState("addBtn");
    const [groupSizeId, setGroupSizeId] = useState(0);

    // مودالات الإضافة/التعديل والحذف وتعديل المقاسات
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"create" | "edit">("create");
    const [selectedGroup, setSelectedGroup] = useState<GroupSize | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editSizesModalOpen, setEditSizesModalOpen] = useState(false);

    // Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const { register, handleSubmit, reset, setValue } = useForm<{ name: string }>();

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // جلب مجموعات الأحجام من API
    const fetchGroupSizes = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://babyhumod.shop/api/size-groups");
            setGroupSizes(response.data);
        } catch (error) {
            console.error("Error fetching group sizes:", error);
            toast.error(t("حدث خطأ أثناء جلب مجموعات الأحجام"));
        } finally {
            setIsLoading(false);
        }
    };

    // جلب الأحجام الفردية من API
    const fetchAvailableSizes = async () => {
        try {
            const response = await axios.get("https://babyhumod.shop/api/sizes");
            setAvailableSizes(response.data);
        } catch (error) {
            console.error("Error fetching sizes:", error);
            toast.error(t("حدث خطأ أثناء جلب الأحجام"));
        }
    };

    useEffect(() => {
        fetchGroupSizes();
        fetchAvailableSizes();
    }, []);

    // فتح مودال إضافة مجموعة حجم جديدة
    const openCreateModal = () => {
        setModalType("create");
        setSelectedGroup(null);
        setGroupModalOpen(true);
    };

    // فتح مودال تعديل مجموعة حجم
    const openEditModal = (group: GroupSize) => {
        setModalType("edit");
        setSelectedGroup(group);
        setGroupSizeId(group.id);
        setValue("name", group.name);
        setGroupModalOpen(true);
    };

    const closeGroupModal = () => setGroupModalOpen(false);

    const handleGroupSubmit = async (data: { name: string }) => {
        if (modalType === "create") {
            try {
                const formData = new FormData();
                formData.append("name", data.name);
                await axios.post("https://babyhumod.shop/api/size-groups", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success(t("تم الإضافة بنجاح"));
                fetchGroupSizes();
                closeGroupModal();
                reset();
            } catch (error) {
                console.error("Error adding group:", error);
                toast.error(t("حدث خطأ أثناء الإضافة"));
            }
        } else if (modalType === "edit" && selectedGroup) {
            try {
                await axios.put(`https://babyhumod.shop/api/size-groups/${selectedGroup.id}`, {
                    name: data.name,
                });
                toast.success(t("تم التعديل بنجاح"));
                fetchGroupSizes();
                closeGroupModal();
                reset();
            } catch (error) {
                console.error("Error updating group:", error);
                toast.error(t("حدث خطأ أثناء التعديل"));
            }
        }
    };

    // فتح مودال الحذف
    const openDeleteModal = (group: GroupSize) => {
        setSelectedGroup(group);
        setGroupSizeId(group.id);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => setDeleteModalOpen(false);

    const deleteGroup = async () => {
        try {
            await axios.delete(`https://babyhumod.shop/api/size-groups/${groupSizeId}`);
            toast.success(t("تم الحذف بنجاح"));
            fetchGroupSizes();
        } catch (error) {
            console.error("Error deleting group:", error);
            toast.error(t("حدث خطأ أثناء الحذف"));
        } finally {
            closeDeleteModal();
        }
    };

    // فتح مودال تعديل المقاسات داخل مجموعة حجم
    const openEditSizesModal = (group: GroupSize) => {
        setSelectedGroup(group);
        setGroupSizeId(group.id);
        setEditSizesModalOpen(true);
    };

    const closeEditSizesModal = () => setEditSizesModalOpen(false);

    // عند اكتمال تحديث المقاسات، نقوم بتحديث القائمة
    const handleSizesUpdated = () => {
        fetchGroupSizes();
    };

    return (
        <>
            {/* زر إضافة مجموعة حجم جديدة */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", m: 3 }}>
                <Button variant="contained" onClick={openCreateModal}>
                    {t("إضافة مجموعة حجم جديدة")}
                </Button>
            </Box>

            {/* مودال الإضافة/التعديل للمجموعات */}
            <GroupSizeModal
                open={groupModalOpen}
                onClose={closeGroupModal}
                type={modalType}
                group={selectedGroup || undefined}
                onSubmit={handleGroupSubmit}
            />

            {/* مودال الحذف */}
            <DeleteModal
                open={deleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={deleteGroup}
            />

            {/* مودال تعديل المقاسات داخل المجموعة */}
            {selectedGroup && (
                <EditGroupSizesModal
                    open={editSizesModalOpen}
                    onClose={closeEditSizesModal}
                    groupId={selectedGroup.id}
                    availableSizes={availableSizes}
                    preSelectedSizeIds={selectedGroup.sizes ? selectedGroup.sizes.map(s => s.id) : []}
                    onSizesUpdated={handleSizesUpdated}
                />
            )}

            {/* جدول عرض مجموعات الأحجام */}
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
                                        {t("اسم المجموعة")}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: "rgba(139, 144, 154, 1)" }}>
                                        {t("Group ID")}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: "rgba(139, 144, 154, 1)" }}>
                                        {t("الإجراءات")}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groupSizes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((group) => (
                                    <GroupSizeRow
                                        key={group.id}
                                        group={group}
                                        onEdit={openEditModal}
                                        onDelete={openDeleteModal}
                                        onEditSizes={openEditSizesModal}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[2, 5, 10]}
                            component="div"
                            count={groupSizes.length}
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

export default GroupSizePage;
