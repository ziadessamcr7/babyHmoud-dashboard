// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      sidebar: {
        dashboard: "Dashboard",
        clients: "Clients",
        clientsAlt: "Clients image",
        orders: "Orders Management",
        ratings: "Ratings",
        categories: "Categories",
        products: "Products",
        dynamicForm: "Dynamic Form",
        addOns: "Add-Ons",
        connectProducts: "Connect Products",
        variables: "Variables",
        adminSettings: "Admin Settings",
        roles: "Roles",
        homeScreen: "Home Screen",
        settings: "Settings",
        logoAlt: "Logo",
        appName: "Baby humod",
        expand: "Expand",
        collapse: "Collapse",
        onBoardingScreens: 'On Boarding',
        banners: 'Banners'
      },
      header: {
        notificationAlt: "Notification",
        changeLanguage: "Change Language",
        profileAlt: "Profile",
        editProfile: "Edit Profile",
        logout: "Logout"
      },
      photos: {
        fetchError: "Error fetching splash screens",
        uploadError: "Please upload an image",
        addSuccess: "Splash screen added successfully",
        updateSuccess: "Splash screen updated successfully",
        addError: "Error adding splash screen",
        updateError: "Error updating splash screen",
        deleteSuccess: "Splash screen deleted successfully",
        deleteError: "Error deleting splash screen",
        confirmDeleteTitle: "Confirm Delete",
        confirmDeleteMessage: "Are you sure you want to delete this splash screen?",
        cancel: "Cancel",
        delete: "Delete",
        titleLabel: "Image Title",
        descriptionLabel: "Image Description",
        uploadImage: "Upload Image",
        fieldRequired: "This field is required",
        resetButton: "Reset",
        add: "Add",
        update: "Update",
        titleLabelAr: "Titile Arabic",
        titleLabelEn: "Titile English",
        descriptionLabelAr: "Desc Arabic",
        descriptionLabelEn: "Desc English",
        tableHeader: {

          title: "Title",
          subtitle: "Subtitle",
          image: "Image",
          id: "ID",
          actions: "Actions"
        }
      },
      contact: {
        phone_number: "Phone Number",
        facebook: "Facebook Link",
        whatsapp: "WhatsApp",
        snapchat: "Snapchat Link",
        email: "Email",
        instagram: "Instagram Link",
        website: "Visit Our Website",
        tiktok: "TikTok",
        reset: "Reset",
        submit: "Submit",
        fetchError: "Failed to fetch contact information",
        updateSuccess: "Contact information updated successfully",
        saveError: "An error occurred while saving data"
      },
      menu: {
        contactUs: "Contact Us",
        privacyPolicy: "Privacy Policy",
        aboutUs: "About Us",
        countries: "Countries & Governorates"
      },
      aboutUs: {
        arabicContent: "Arabic Content",
        englishContent: "English Content",
        privacy_policy: "Privacy Policy",
        privacy_policy_placeholder: "Enter the Privacy Policy in Arabic...",
        terms_of_services: "Terms of Services",
        terms_of_services_placeholder: "Enter the Terms of Services in Arabic...",
        refund_policy: "Refund Policy",
        refund_policy_placeholder: "Enter the Refund Policy in Arabic...",
        shipping_policy: "Shipping Policy",
        shipping_policy_placeholder: "Enter the Shipping Policy in Arabic...",
        privacy_policy_en: "Privacy Policy (English)",
        privacy_policy_en_placeholder: "Enter the Privacy Policy in English...",
        terms_of_services_en: "Terms of Services (English)",
        terms_of_services_en_placeholder: "Enter the Terms of Services in English...",
        refund_policy_en: "Refund Policy (English)",
        refund_policy_en_placeholder: "Enter the Refund Policy in English...",
        shipping_policy_en: "Shipping Policy (English)",
        shipping_policy_en_placeholder: "Enter the Shipping Policy in English...",
        reset: "Reset",
        submit: "Submit",
        fetchError: "Failed to fetch data",
        updateSuccess: "Updated successfully",
        updateError: "Error updating data"
      },
      categories: {
        fieldRequired: "This field is required",
        deleteSuccess: "Category deleted successfully",
        addSuccess: "Category added successfully",
        updateSuccess: "Category updated successfully",
        add: "Add",
        update: "Update",
        reset: "Reset",
        toggleStatusTitle: "Toggle Category Status",
        deleteConfirmationTitle: "Delete Confirmation",
        toggleStatusMessage: "Do you want to toggle the status?",
        deleteConfirmationMessage: "Are you sure you want to delete this category?",
        toggle: "Toggle",
        delete: "Delete",
        headerIconAlt: "Category Settings Icon",
        settingsTitle: "Category Settings",
        addCategoryArabic: "Add Category (Arabic) *",
        addCategoryEnglish: "Add Category (English)",
        categoryNameArabic: "Category Name in Arabic",
        categoryNameEnglish: "Category Name in English",
        categoryImage: "Category Image *",
        tableHeader: {
          titleSection: "Category Settings",
          name: "Category Name",
          image: "Category Image",
          actions: "Actions"
        },
        categoryAlt: "Category",
        lockedAlt: "Locked",
        unlockedAlt: "Unlocked",
        editAlt: "Edit"
      },
      allProducts: {
        chooseProduct: "choose Product",
        edit: "edit",
        unknownProduct: "unknownProduct",
        add: "Add",
        update: "update",
        fieldRequired: "This field is required",
        fetchError: "Error fetching products",
        fetchCategoriesError: "Error fetching categories",
        deleteSuccess: "Product deleted successfully",
        deleteError: "Error deleting product",
        addSuccess: "Product added successfully",
        updateSuccess: "Product updated successfully",
        submitError: "Error during operation",
        mainImageRequired: "Main image is required",
        deleteProductTitle: "Delete Product",
        deleteProductMessage: "Are you sure you want to delete this product?",
        close: "Close",
        delete: "Delete",
        headerIconAlt: "Products Settings Icon",
        productsSettings: "Products Settings",
        productNameArabic: "Product Name (Arabic)",
        productNameArabicPlaceholder: "Enter product name in Arabic",
        productNameEnglish: "Product Name (English)",
        productNameEnglishPlaceholder: "Enter product name in English",
        productPrice: "Product Price",
        productPricePlaceholder: "Enter product price",
        productWeight: "Product Weight (Kg)",
        productWeightPlaceholder: "Enter product weight",
        productDescriptionArabic: "Product Description (Arabic)",
        productDescriptionArabicPlaceholder: "Enter product description in Arabic",
        productDescriptionEnglish: "Product Description (English)",
        productDescriptionEnglishPlaceholder: "Enter product description in English",
        productCategory: "Product Category",
        chooseCategory: "Choose a category",
        mainImage: "Main Image",
        subImages: "Sub Images",
        reset: "Reset",
        processing: "Processing...",
        tableHeader: {
          productName: "product name",
          titleSection: "Products List",
          name: "Product Name",
          price: "Price",
          weight: "Weight",
          description: "Description",
          image: "Image",
          category: "Category",
          actions: "Actions"
        },
        deleteAlt: "Delete",
        editAlt: "Edit",
        searchPlaceholder: "Search..."
      },

      ordersManagment: {
        clientName: 'Client Name',
        country: 'Country',
        phoneNumber: 'Phone',
        shippingWay: 'Shipping method',
        totalPrice: 'Total price'
      },

      ratings: {
        name: 'Rating',
        comment: 'Comment',
        rate: 'Rate'
      },


      clientsEditModal: {
        editClientData: 'Client Data',
        firstName: 'First Name',
        lastName: 'Last Name',
        BirthDate: 'Birth Date',
        editBtn: 'Edit'
      },

      clientsDeleteModal: {
        deleteClient: 'Delete Client',
        areYouSureMsg: 'Are you sure you want to delete that client?',
        delete: 'Delete'

      },

      clientsViewModal: {
        hour: 'Hour',
        date: 'Date',
        noData: 'No data',
        didTheyBuy: 'Did they buy'
      },

      commentCaseModal: {

        title: 'Hide Rate',
        subtitle: 'Do you want to hide this comment',
        btn: 'Hide'
      },


      commentDeleteModal: {
        title: 'Delete Rate',
        subtitle: 'Do you to delete this comment',
        btn: 'Delete'
      },

      dynamicForm: {
        mainTitle: 'Custom Product Form',
        formName: 'Form Name',
        formDescription: 'Description',
        fromFields: 'Fields',
        AddField: 'Add Field',
        createForm: 'Create Form',
        updateForm: 'Update Form',
        resetBtn: 'Reset',
        currentForms: 'Current Forms',
        text: 'Text',
        dropDownList: 'Dropdown List',
        formattedText: 'Formatted Text',
        naming: 'Label',
        choosingJson: 'Options (Enter full JSON)',
        choosingCommas: 'Options (Comma-separated)'
      },

      connectProducts: {
        producList: 'Products List',
        productName: 'Name',
        productPrice: 'Price',
        productDescription: 'Description',
        productImg: 'Image ',
        productCategory: 'Category',
      },


      groupColors: {
        groupName: 'Group Name',
        chooseColor: 'Choose Color',
        addBtn: 'Add',
        colors: 'Colors',
        colorGroupId: 'Color Group ID'
      },

      notifications: {
        title: 'Title',
        message: 'Message',
        addBtn: 'Add',
        resetBtn: 'Reset',
        date: 'Send Date',
        numOfRec: 'Number of Recipients',
        listOfNotifications: 'Previous Notifications Log',
        success: 'Success',
        failure: 'Failure'
      },

      banners: {
        title: 'Title',
        desc: 'Description',
        orderNum: 'Order Number',
        addImg: 'Add Img',
        addBtn: 'Add',
        updateBtn: 'Update',
        resetBtn: 'Reset',
        subTitle: 'Sub Title',
        img: 'Image'
      },

      bannersDel: {
        title: 'Confrim Delete',
        subtitle: 'Are you sure you want to delete?',
        close: 'close',
        delete: 'delete'
      },



      "country": {
        "name_ar": "Country Name (AR)",
        "name_en": "Country Name (EN)",
        "edit": "Edit Country",
        "add": "Add Country",
        "list": "Added Countries",
        "provinces": "Provinces"
      },
      "province": {
        "name_ar": "Province Name (AR)",
        "name_en": "Province Name (EN)",
        "add": "Add Province"
      },
      "shipping_methods": {
        "title": "Shipping Methods",
        "name": "Method Name",
        "name_en": "Method Name (EN)",
        "description": "Description",
        "description_en": "Description (EN)",
        "type": "Shipping Type",
        "local": "Local",
        "international": "International",
        "price": "Price",
        "international_prices": "International Shipping Prices",
        "add": "Add Shipping Method"
      },
      "action": {
        "add": "Add",
        "update": "Update",
        "edit": "Edit",
        "delete": "Delete",
        "reset": "Reset",
        "actions": "Actions"
      },
      "error": {
        "required": "This field is required",
        "fetch_countries": "An error occurred while fetching countries",
        "fetch_shipping_methods": "An error occurred while fetching shipping methods",
        "submit_form": "An error occurred while saving",
        "delete_country": "An error occurred while deleting"
      },
      "unit": {
        "kilo": "kg"
      },
      "success": {
        "add_country": "Country added successfully",
        "update_country": "Country updated successfully",
        "delete_country": "Country deleted successfully"
      },
      "إضافة لون جديد": "Add New Color",
      "تعديل اللون": "Edit Color",
      "اسم اللون": "Color Name",
      "وصف اللون بالعربي": "Arabic Color Description",
      "وصف اللون بالإنجليزي": "English Color Description",
      "هذا الحقل مطلوب": "This field is required",
      "إلغاء": "Cancel",
      "إضافة": "Add",
      "تعديل": "Edit",
      "تأكيد الحذف": "Confirm Delete",
      "هل أنت متأكد من حذف هذا اللون؟": "Are you sure you want to delete this color?",
      "حذف": "Delete",
      "تم الإضافة بنجاح": "Added successfully",
      "حدث خطأ أثناء الإضافة": "Error while adding",
      "تم التعديل بنجاح": "Edited successfully",
      "حدث خطأ أثناء التعديل": "Error while editing",
      "تم الحذف بنجاح": "Deleted successfully",
      "حدث خطأ أثناء الحذف": "Error while deleting",
      "الوصف": "Description",
      "Color ID": "Color ID",
      "الإجراءات": "Actions",
      "إضافة حجم جديد": "Add New Size",
      "تعديل الحجم": "Edit Size",
      "اسم الحجم": "Size Name",
      "هذا الحقل مطلوب": "This field is required",
      "إلغاء": "Cancel",
      "إضافة": "Add",
      "تعديل": "Edit",
      "تأكيد الحذف": "Confirm Delete",
      "هل أنت متأكد من حذف هذا الحجم؟": "Are you sure you want to delete this size?",
      "حذف": "Delete",
      "تم الإضافة بنجاح": "Added successfully",
      "حدث خطأ أثناء الإضافة": "Error while adding",
      "تم التعديل بنجاح": "Edited successfully",
      "حدث خطأ أثناء التعديل": "Error while editing",
      "تم الحذف بنجاح": "Deleted successfully",
      "حدث خطأ أثناء الحذف": "Error while deleting",
      "Size ID": "Size ID",
      "الإجراءات": "Actions",
      "إضافة مجموعة حجم جديدة": "Add New Size Group",
      "تعديل مجموعة الحجم": "Edit Size Group",
      "اسم المجموعة": "Group Name",
      "هذا الحقل مطلوب": "This field is required",
      "إلغاء": "Cancel",
      "إضافة": "Add",
      "تعديل": "Edit",
      "تأكيد الحذف": "Confirm Delete",
      "هل أنت متأكد من حذف هذه المجموعة؟": "Are you sure you want to delete this group?",
      "حذف": "Delete",
      "تم تحديث المقاسات بنجاح": "Sizes updated successfully",
      "حدث خطأ أثناء تحديث المقاسات": "Error while updating sizes",
      "تعديل المقاسات للمجموعة": "Edit Group Sizes",
      "حفظ التعديلات": "Save Changes",
      "Group ID": "Group ID",
      "الإجراءات": "Actions",
      "تم الإضافة بنجاح": "Added successfully",
      "حدث خطأ أثناء الإضافة": "Error while adding",
      "تم التعديل بنجاح": "Edited successfully",
      "حدث خطأ أثناء التعديل": "Error while editing",
      "تم الحذف بنجاح": "Deleted successfully",
      "حدث خطأ أثناء الحذف": "Error while deleting",
      "حدث خطأ أثناء جلب مجموعات الأحجام": "Error fetching size groups",
      "حدث خطأ أثناء جلب الأحجام": "Error fetching sizes",
      "الالوان الفردية": "Single Colors",
      "مجموعات الالوان": "Group Colors",
      "الاحجام الفردية": "Single Sizes",
      "مجموعات الاحجام": "Group Sizes",
      "اسم الحجم بالإنجليزي": "English Size Name"
    }
  },
  ar: {
    translation: {
      sidebar: {
        dashboard: "لوحة التحكم",
        clients: "العملاء",
        clientsAlt: "صورة العملاء",
        orders: "إدراة الطلبات",
        ratings: "التقييمات",
        categories: "الأقسام",
        products: "منتجات",
        dynamicForm: "الفورم الديناميكيه",
        addOns: "الإضافات",
        connectProducts: "ربط المنتجات",
        variables: "المتغيرات",
        adminSettings: "إعدادات المشرف",
        roles: "الأدوار",
        homeScreen: "شاشة البداية",
        settings: "الإعدادات",
        logoAlt: "الشعار",
        appName: "Baby humod",
        expand: "توسيع",
        collapse: "طي",
        onBoardingScreens: 'شاشات البداية',
        banners: 'البانرات'
      },
      header: {
        notificationAlt: "إشعار",
        changeLanguage: "تغيير اللغة",
        profileAlt: "الصورة الشخصية",
        editProfile: "تعديل الصفحة الشخصية",
        logout: "تسجيل الخروج"
      },
      photos: {
        fetchError: "حدث خطأ أثناء جلب بيانات شاشة البداية",
        uploadError: "يرجى رفع صورة",
        addSuccess: "تم إضافة شاشة البداية بنجاح",
        updateSuccess: "تم تعديل شاشة البداية بنجاح",
        addError: "حدث خطأ أثناء إضافة شاشة البداية",
        updateError: "حدث خطأ أثناء تعديل شاشة البداية",
        deleteSuccess: "تم حذف شاشة البداية بنجاح",
        deleteError: "حدث خطأ أثناء حذف شاشة البداية",
        confirmDeleteTitle: "تأكيد الحذف",
        confirmDeleteMessage: "هل أنت متأكد أنك تريد حذف هذه شاشة البداية؟",
        cancel: "إلغاء",
        delete: "حذف",
        titleLabel: "عنوان الصورة",
        descriptionLabel: "وصف الصورة",
        uploadImage: "رفع صورة",
        fieldRequired: "هذه الخانة مطلوبة",
        resetButton: "إعادة الضبط",
        add: "إضافة",
        update: "تعديل",
        titleLabelAr: "العنوان بالعربي",
        titleLabelEn: "العنوان بالانجليزي",
        descriptionLabelAr: "الوصف بالعربي",
        descriptionLabelEn: "الوصف بالانجليزي",
        tableHeader: {
          title: "العنوان",
          subtitle: "العنوان الفرعي",
          image: "الصورة",
          id: "المعرف",
          actions: "الإجراءات"
        }
      },
      contact: {
        phone_number: "رقم الهاتف",
        facebook: "لينك فيسبوك",
        whatsapp: "راسلنا عبر واتساب",
        snapchat: "لينك سناب شات",
        email: "ارسل لنا عبر البريد الالكتروني",
        instagram: "لينك انستاجرام",
        website: "قم بزيارة موقعنا عبر الانترنت",
        tiktok: "تيكتوك",
        reset: "إعادة الضبط",
        submit: "تنفيذ",
        fetchError: "فشل جلب البيانات",
        updateSuccess: "تم التحديث بنجاح",
        saveError: "حدث خطأ أثناء الحفظ"
      },
      menu: {
        contactUs: "تواصل معنا",
        privacyPolicy: "الشروط و الاحكام",
        aboutUs: "السياسات",
        countries: "الدول والمحافظات"
      },
      aboutUs: {
        arabicContent: "المحتوى العربي",
        englishContent: "المحتوى الإنجليزي",
        privacy_policy: "سياسة الخصوصية",
        privacy_policy_placeholder: "أدخل سياسة الخصوصية...",
        terms_of_services: "شروط الخدمة",
        terms_of_services_placeholder: "أدخل شروط الخدمة...",
        refund_policy: "سياسة الاسترداد",
        refund_policy_placeholder: "أدخل سياسة الاسترداد...",
        shipping_policy: "سياسة الشحن",
        shipping_policy_placeholder: "أدخل سياسة الشحن...",
        privacy_policy_en: "Privacy Policy (إنجليزي)",
        privacy_policy_en_placeholder: "أدخل سياسة الخصوصية باللغة الإنجليزية...",
        terms_of_services_en: "Terms of Services (إنجليزي)",
        terms_of_services_en_placeholder: "أدخل شروط الخدمة باللغة الإنجليزية...",
        refund_policy_en: "Refund Policy (إنجليزي)",
        refund_policy_en_placeholder: "أدخل سياسة الاسترداد باللغة الإنجليزية...",
        shipping_policy_en: "Shipping Policy (إنجليزي)",
        shipping_policy_en_placeholder: "أدخل سياسة الشحن باللغة الإنجليزية...",
        reset: "إعادة الضبط",
        submit: "تنفيذ",
        fetchError: "حدث خطأ أثناء جلب البيانات",
        updateSuccess: "تم التعديل بنجاح",
        updateError: "حدث خطأ أثناء التعديل"
      },
      categories: {
        fieldRequired: "هذا الحقل مطلوب",
        deleteSuccess: "تم حذف القسم بنجاح",
        addSuccess: "تم إضافة القسم بنجاح",
        updateSuccess: "تم تعديل القسم بنجاح",
        add: "اضافة",
        update: "تعديل",
        reset: "اعادة الضبط",
        toggleStatusTitle: "تبديل حالة القسم",
        deleteConfirmationTitle: "تأكيد الحذف",
        toggleStatusMessage: "هل تريد تبديل الحالة؟",
        deleteConfirmationMessage: "هل انت متأكد من حذف هذا القسم؟",
        toggle: "تبديل",
        delete: "حذف",
        headerIconAlt: "ايقونة اعدادت القسم",
        settingsTitle: "اعدادات الاقسام",
        addCategoryArabic: "اضافة قسم (عربي) *",
        addCategoryEnglish: "اضافة قسم (إنجليزي)",
        categoryNameArabic: "اسم القسم بالعربي",
        categoryNameEnglish: "اسم القسم بالإنجليزي",
        categoryImage: "صورة القسم *",
        tableHeader: {
          titleSection: "اعدادات الاقسام",
          name: "اسم القسم",
          image: "صورة القسم",
          actions: "الإجراءات"
        },
        categoryAlt: "القسم",
        lockedAlt: "مغلق",
        unlockedAlt: "مفتوح",
        editAlt: "تعديل"
      },
      allProducts: {
        chooseProduct: "اختر المنتج",
        add: "اضافه",
        edit: "تعديل",
        unknownProduct: "منتج غير معروف",
        update: "تحديث",
        fieldRequired: "هذا الحقل مطلوب",
        fetchError: "حدث خطأ أثناء جلب المنتجات",
        fetchCategoriesError: "حدث خطأ أثناء جلب التصنيفات",
        deleteSuccess: "تم حذف المنتج بنجاح",
        deleteError: "حدث خطأ أثناء حذف المنتج",
        addSuccess: "تم إضافة المنتج بنجاح",
        updateSuccess: "تم تحديث المنتج بنجاح",
        submitError: "حدث خطأ أثناء العملية",
        mainImageRequired: "الصورة الرئيسية مطلوبة",
        deleteProductTitle: "حذف المنتج",
        deleteProductMessage: "هل انت متأكد من حذف هذا المنتج؟",
        close: "إغلاق",
        delete: "حذف",
        headerIconAlt: "ايقونة اعدادات المنتجات",
        productsSettings: "اعدادات المنتجات",
        productNameArabic: "اسم المنتج (عربي)",
        productNameArabicPlaceholder: "أدخل اسم المنتج بالعربي",
        productNameEnglish: "اسم المنتج (إنجليزي)",
        productNameEnglishPlaceholder: "أدخل اسم المنتج بالإنجليزي",
        productPrice: "سعر المنتج",
        productPricePlaceholder: "أدخل سعر المنتج",
        productWeight: "وزن المنتج (بالكيلو)",
        productWeightPlaceholder: "أدخل وزن المنتج",
        productDescriptionArabic: "وصف المنتج (عربي)",
        productDescriptionArabicPlaceholder: "أدخل وصف المنتج بالعربي",
        productDescriptionEnglish: "وصف المنتج (إنجليزي)",
        productDescriptionEnglishPlaceholder: "أدخل وصف المنتج بالإنجليزي",
        productCategory: "تصنيف المنتج",
        chooseCategory: "اختر تصنيف",
        mainImage: "الصورة الرئيسية",
        subImages: "الصور الفرعية",
        reset: "اعادة تعيين",
        processing: "جاري المعالجة...",
        tableHeader: {
          productName: "اسم المنتج",
          titleSection: "قائمة المنتجات",
          name: "اسم المنتج",
          price: "السعر",
          weight: "الوزن",
          description: "الوصف",
          image: "الصورة",
          category: "التصنيف",
          actions: "الإجراءات"
        },
        deleteAlt: "حذف",
        editAlt: "تعديل",
        searchPlaceholder: "بحث..."
      },

      ordersManagment: {
        clientName: 'اسم العميل',
        country: 'الدولة',
        phoneNumber: 'رقم الهاتف',
        shippingWay: 'طريقة الشحن',
        totalPrice: 'السعر الإجمالي'
      },

      ratings: {
        name: 'التقييم',
        comment: 'التعليق',
        rate: 'الدرجة'
      },

      clientsEditModal: {
        editClientData: 'تعديل بيانات العميل',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        BirthDate: 'تاريخ الميلاد',
        editBtn: 'تعديل'
      },

      clientsDeleteModal: {
        deleteClient: 'حذف العميل',
        areYouSureMsg: 'هل أنت متأكد أنك تريد حذف هذا العميل؟',
        delete: 'حذف'
      },

      clientsViewModal: {
        hour: 'الساعة',
        date: 'التاريخ',
        noData: 'لا توجد بيانات',
        didTheyBuy: 'هل قام بالشراء'
      },

      commentCaseModal: {
        title: 'إخفاء التقييم',
        subtitle: 'هل تريد إخفاء هذا التعليق؟',
        btn: 'إخفاء'
      },

      commentDeleteModal: {
        title: 'حذف التقييم',
        subtitle: 'هل تريد حذف هذا التعليق؟',
        btn: 'حذف'
      },

      dynamicForm: {
        mainTitle: 'النموذج المخصص للمنتجات',
        formName: 'اسم النموذج',
        formDescription: 'الوصف',
        fromFields: 'الحقول',
        AddField: 'اضافة حقل',
        createForm: 'إنشاء نموذج',
        updateForm: 'تعديل نموذج',
        resetBtn: 'إعادة تعيين',
        currentForms: 'النماذج الحالية',
        text: 'نص',
        dropDownList: 'قائمة منسدلة',
        formattedText: 'نص منسق',
        dropDownList: 'formDescription',
        naming: 'التسمية',
        choosingJson: 'خيارات (أدخل JSON كاملاً)',
        choosingCommas: 'خيارات (مفصولة بفواصل)'
      },

      connectProducts: {
        producList: 'قائمة المنتجات',
        productName: 'الاسم',
        productPrice: 'السعر',
        productDescription: 'الوصف',
        productImg: 'الصورة ',
        productCategory: 'القسم',
      },

      groupColors: {
        groupName: 'اسم المجموعة',
        chooseColor: 'اختر اللون',
        addBtn: 'إضافة',
        colors: 'الألوان',
        colorGroupId: 'معرّف مجموعة الألوان'
      },

      notifications: {
        title: 'العنوان',
        message: 'الرسالة',
        addBtn: 'اضافة',
        resetBtn: 'اعادة ضبط',
        date: 'تاريخ الإرسال',
        numOfRec: 'عدد المستلمين',
        listOfNotifications: 'سجل الاشعارات السابقة',
        success: 'نجاح',
        failure: 'فشل'
      },

      banners: {
        title: 'العنوان',
        desc: 'الوصف',
        orderNum: 'رقم الترتيب',
        img: 'الصورة',
        addImg: 'اضافة صورة',
        addBtn: 'إضافة',
        updateBtn: 'تعديل',
        resetBtn: 'إعادة تعيين',
        subTitle: 'العنوان الفرعي'
      },

      bannersDel: {
        title: 'حذف البانر',
        subtitle: 'هل انت متأكد من الحذف؟',
        close: 'اغلاق',
        delete: 'حذف'
      },


      "country": {
        "name_ar": "اسم الدولة",
        "name_en": "اسم الدولة بالإنجليزي",
        "edit": "تعديل الدولة",
        "add": "إضافة دولة",
        "list": "الدول المضافة",
        "provinces": "المحافظات"
      },
      "province": {
        "name_ar": "اسم المحافظة",
        "name_en": "اسم المحافظة (إنجليزي)",
        "add": "إضافة محافظة"
      },
      "shipping_methods": {
        "title": "طرق الشحن",
        "name": "اسم الطريقة",
        "name_en": "اسم الطريقة (إنجليزي)",
        "description": "الوصف",
        "description_en": "الوصف (إنجليزي)",
        "type": "نوع الشحن",
        "local": "محلي",
        "international": "دولي",
        "price": "السعر",
        "international_prices": "أسعار الشحن الدولي",
        "add": "إضافة طريقة شحن"
      },
      "action": {
        "add": "إضافة",
        "update": "تحديث",
        "edit": "تعديل",
        "delete": "حذف",
        "reset": "إعادة الضبط",
        "actions": "الإجراءات"
      },
      "error": {
        "required": "هذا الحقل مطلوب",
        "fetch_countries": "حدث خطأ أثناء جلب الدول",
        "fetch_shipping_methods": "حدث خطأ أثناء جلب طرق الشحن",
        "submit_form": "حدث خطأ أثناء الحفظ",
        "delete_country": "حدث خطأ أثناء الحذف"
      },
      "unit": {
        "kilo": "كيلو"
      },
      "success": {
        "add_country": "تم إضافة الدولة بنجاح",
        "update_country": "تم التحديث بنجاح",
        "delete_country": "تم حذف الدولة بنجاح"
      },
      "إضافة لون جديد": "إضافة لون جديد",
      "تعديل اللون": "تعديل اللون",
      "اسم اللون": "اسم اللون",
      "وصف اللون بالعربي": "وصف اللون بالعربي",
      "وصف اللون بالإنجليزي": "وصف اللون بالإنجليزي",
      "هذا الحقل مطلوب": "هذا الحقل مطلوب",
      "إلغاء": "إلغاء",
      "إضافة": "إضافة",
      "تعديل": "تعديل",
      "تأكيد الحذف": "تأكيد الحذف",
      "هل أنت متأكد من حذف هذا اللون؟": "هل أنت متأكد من حذف هذا اللون؟",
      "حذف": "حذف",
      "تم الإضافة بنجاح": "تم الإضافة بنجاح",
      "حدث خطأ أثناء الإضافة": "حدث خطأ أثناء الإضافة",
      "تم التعديل بنجاح": "تم التعديل بنجاح",
      "حدث خطأ أثناء التعديل": "حدث خطأ أثناء التعديل",
      "تم الحذف بنجاح": "تم الحذف بنجاح",
      "حدث خطأ أثناء الحذف": "حدث خطأ أثناء الحذف",
      "الوصف": "الوصف",
      "Color ID": "معرف اللون",
      "الإجراءات": "الإجراءات",
      "إضافة حجم جديد": "إضافة حجم جديد",
      "تعديل الحجم": "تعديل الحجم",
      "اسم الحجم": "اسم الحجم",
      "هذا الحقل مطلوب": "هذا الحقل مطلوب",
      "إلغاء": "إلغاء",
      "إضافة": "إضافة",
      "تعديل": "تعديل",
      "تأكيد الحذف": "تأكيد الحذف",
      "هل أنت متأكد من حذف هذا الحجم؟": "هل أنت متأكد من حذف هذا الحجم؟",
      "حذف": "حذف",
      "تم الإضافة بنجاح": "تم الإضافة بنجاح",
      "حدث خطأ أثناء الإضافة": "حدث خطأ أثناء الإضافة",
      "تم التعديل بنجاح": "تم التعديل بنجاح",
      "حدث خطأ أثناء التعديل": "حدث خطأ أثناء التعديل",
      "تم الحذف بنجاح": "تم الحذف بنجاح",
      "حدث خطأ أثناء الحذف": "حدث خطأ أثناء الحذف",
      "Size ID": "معرف الحجم",
      "الإجراءات": "الإجراءات",
      "إضافة مجموعة حجم جديدة": "إضافة مجموعة حجم جديدة",
      "تعديل مجموعة الحجم": "تعديل مجموعة الحجم",
      "اسم المجموعة": "اسم المجموعة",
      "هذا الحقل مطلوب": "هذا الحقل مطلوب",
      "إلغاء": "إلغاء",
      "إضافة": "إضافة",
      "تعديل": "تعديل",
      "تأكيد الحذف": "تأكيد الحذف",
      "هل أنت متأكد من حذف هذه المجموعة؟": "هل أنت متأكد من حذف هذه المجموعة؟",
      "حذف": "حذف",
      "تم تحديث المقاسات بنجاح": "تم تحديث المقاسات بنجاح",
      "حدث خطأ أثناء تحديث المقاسات": "حدث خطأ أثناء تحديث المقاسات",
      "تعديل المقاسات للمجموعة": "تعديل المقاسات للمجموعة",
      "حفظ التعديلات": "حفظ التعديلات",
      "Group ID": "معرف المجموعة",
      "الإجراءات": "الإجراءات",
      "تم الإضافة بنجاح": "تم الإضافة بنجاح",
      "حدث خطأ أثناء الإضافة": "حدث خطأ أثناء الإضافة",
      "تم التعديل بنجاح": "تم التعديل بنجاح",
      "حدث خطأ أثناء التعديل": "حدث خطأ أثناء التعديل",
      "تم الحذف بنجاح": "تم الحذف بنجاح",
      "حدث خطأ أثناء الحذف": "حدث خطأ أثناء الحذف",
      "حدث خطأ أثناء جلب مجموعات الأحجام": "حدث خطأ أثناء جلب مجموعات الأحجام",
      "حدث خطأ أثناء جلب الأحجام": "حدث خطأ أثناء جلب الأحجام",
      "الالوان الفردية": "الالوان الفردية",
      "مجموعات الالوان": "مجموعات الالوان",
      "الاحجام الفردية": "الاحجام الفردية",
      "مجموعات الاحجام": "مجموعات الاحجام",
      "اسم الحجم بالإنجليزي": "اسم الحجم بالإنجليزي"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
