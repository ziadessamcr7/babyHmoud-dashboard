import React, { useState } from "react";

const CustomizedForm: React.FC = () => {
    const [formFields, setFormFields] = useState<{ id: number; type: string; value: string }[]>([]);
    const [fieldId, setFieldId] = useState(1);

    // دالة لإنشاء حقل جديد
    const addField = (type: string) => {
        setFormFields([...formFields, { id: fieldId, type, value: "" }]);
        setFieldId(fieldId + 1);
    };

    // دالة لحذف حقل معين
    const removeField = (id: number) => {
        setFormFields(formFields.filter((field) => field.id !== id));
    };

    // دالة لتحديث القيم المدخلة
    const handleChange = (id: number, value: string) => {
        setFormFields(
            formFields.map((field) =>
                field.id === id ? { ...field, value } : field
            )
        );
    };

    return (

        <>
            <h1
                style={{
                    margin: '50px 0'
                }}
            >
                el inputs eli haib2a fiha el data eli gaya mn el website hatb2a hena

            </h1>

            <div style={{
                margin: "auto",
                width: "100%",
                justifyContent: "space-between",
            }}>


                <h2>نموذج مخصص</h2>

                {/* الأزرار لإضافة الحقول */}
                <div

                    style={{
                        marginBottom: "15px",
                        display: 'flex',
                        width: "65%",
                        backgroundColor: 'red',
                        justifyContent: "space-between",
                        margin: "auto",


                    }}>
                    <button onClick={() => addField("text")}>إضافة حقل نصي</button>
                    <button onClick={() => addField("email")}>إضافة حقل بريد إلكتروني</button>
                    <button onClick={() => addField("file")}>إضافة حقل رفع ملف</button>
                    <button onClick={() => addField("select")}>إضافة قائمة اختيار</button>
                    <button onClick={() => addField("textarea")}>إضافة منطقة نص</button>
                </div>

                {/* عرض الحقول التي تمت إضافتها */}
                <form
                    style={{
                        margin: '30px auto',
                        width: '70%',

                    }}
                >
                    {formFields.map((field) => (
                        <div key={field.id} style={{ marginBottom: "10px" }}>
                            {field.type === "text" && (
                                <input
                                    type="text"
                                    placeholder="أدخل نصاً"
                                    value={field.value}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    style={{ padding: "5px", width: "100%" }}
                                />
                            )}

                            {field.type === "email" && (
                                <input
                                    type="email"
                                    placeholder="أدخل بريدك الإلكتروني"
                                    value={field.value}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    style={{ padding: "5px", width: "100%" }}
                                />
                            )}

                            {field.type === "file" && (
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        handleChange(field.id, e.target.files ? e.target.files[0].name : "")
                                    }
                                    style={{ padding: "5px", width: "100%" }}
                                />
                            )}

                            {field.type === "select" && (
                                <select
                                    value={field.value}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    style={{ padding: "5px", width: "100%" }}
                                >
                                    <option value="">اختر خيارًا</option>
                                    <option value="option1">الخيار الأول</option>
                                    <option value="option2">الخيار الثاني</option>
                                    <option value="option3">الخيار الثالث</option>
                                </select>
                            )}

                            {field.type === "textarea" && (
                                <textarea
                                    placeholder="أدخل نصًا طويلاً"
                                    value={field.value}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    style={{ padding: "5px", width: "100%", height: "80px" }}
                                />
                            )}

                            {/* زر الحذف لكل حقل */}
                            <button
                                onClick={() => removeField(field.id)}
                                style={{
                                    marginTop: "5px",
                                    backgroundColor: "red",
                                    color: "#fff",
                                    border: "none",
                                    padding: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                حذف
                            </button>
                        </div>
                    ))}
                </form>
            </div>
        </>

    );
};

export default CustomizedForm;
