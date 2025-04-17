// Countries.tsx
import React, { useEffect, useState } from "react";
import {
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
  TextField,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// تحديث الواجهات لتشمل الحقول الإضافية للإنجليزية

interface CityField {
  id?: number;
  value: string;
  value_en: string;
}

interface ShippingMethodField {
  id?: number;
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  price: number; // السعر الأساسي في حالة الشحن المحلي
  type: "محلي" | "دولي";
  internationalCosts?: string[]; // في حالة الدولي نحفظ 10 أسعار كـ string
}

interface ShippingMethod {
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  shipping_cost: string; // في حالة الدولي تكون سلسلة JSON، وفي المحلي تكون قيمة مفردة
  shipping_method: "محلي" | "دولي";
  country_id: number;
}

interface Country {
  id: number;
  name: string;       // الاسم بالعربي
  name_en: string;    // الاسم بالإنجليزي
  code: string;       // كود الدولة
  currency_price: number; // سعر عملة الدولة
  cities: string[];   // هذه البيانات قد لا تحتوي على الـ id عند الاسترجاع مع الدولة
  payMethods: ShippingMethod[];
}

interface FormValues {
  country_name: string;    // الاسم بالعربي للدولة
  country_name_en: string; // الاسم بالإنجليزي للدولة
  country_code: string;    // كود الدولة
  currency_price: string;  // سعر عملة الدولة
  cities: CityField[];
  payMethods: ShippingMethodField[];
}

// واجهة لبيانات طرق الشحن كما تُعيدها الـ API (الكائن الكامل)
interface ApiShippingMethod {
  id: number;
  name: string;
  name_en: string;
  shipping_method: "محلي" | "دولي";
  description: string;
  description_en: string;
  shipping_cost: string;
  country_id: number;
  created_at: string;
  updated_at: string;
}

// واجهة لبيانات المدينة كما تُعيدها الـ API
interface ApiCity {
  id: number;
  name: string;
  name_en: string;
  country_id: number;
  created_at: string;
  updated_at: string;
}

// Styled Components دون تغيير أسماءها
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
}));

const StyledButton = styled(Button)(({ theme, color }) => ({
  padding: theme.spacing(1, 4),
  borderRadius: theme.spacing(0.5),
  fontWeight: "bold",
  margin: theme.spacing(1),
  border: color === "primary" ? "none" : "1px solid #8B5A2B",
  backgroundColor: color === "primary" ? "#8B5A2B" : "transparent",
  color: color === "primary" ? "white" : "#8B5A2B",
  "&:hover": {
    backgroundColor: color === "primary" ? "#6d4522" : "rgba(139, 90, 43, 0.04)",
  },
}));

const Countries: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      country_name: "",
      country_name_en: "",
      country_code: "",      // قيمة افتراضية لحقل كود الدولة
      currency_price: "",    // قيمة افتراضية لحقل سعر العملة
      cities: [{ value: "", value_en: "" }],
      payMethods: [
        {
          name: "",
          name_en: "",
          description: "",
          description_en: "",
          price: 0,
          type: "محلي",
          internationalCosts: Array(10).fill(""),
        },
      ],
    },
  });

  const { fields: cityFields, append: appendCity, remove: removeCity } = useFieldArray({
    control,
    name: "cities",
  });
  const { fields: payMethodFields, append: appendPayMethod, remove: removePayMethod } = useFieldArray({
    control,
    name: "payMethods",
  });

  const [countries, setCountries] = useState<Country[]>([]);
  // تخزين المدن هنا كمصفوفة من الكائنات التي تحتوي على id واسم باللغتين
  const [citiesMap, setCitiesMap] = useState<{ [key: number]: ApiCity[] }>({});
  const [shippingMethods, setShippingMethods] = useState<ApiShippingMethod[]>([]);
  const [editingCountryId, setEditingCountryId] = useState<number | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // جلب الدول والبيانات المرافقة منها
  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://babyhumod.shop/api/countries");
      setCountries(response.data);

      const newCitiesMap: { [key: number]: ApiCity[] } = {};
      await Promise.all(
        response.data.map(async (country: Country) => {
          try {
            const res = await axios.get(`https://babyhumod.shop/api/cities/country/${country.id}`);
            newCitiesMap[country.id] = res.data; // تخزين المدن (بها id و name و name_en)
          } catch (error) {
            console.error(`Error fetching cities for country ${country.id}`, error);
            newCitiesMap[country.id] = [];
          }
        })
      );
      setCitiesMap(newCitiesMap);
    } catch (error) {
      console.error("Error fetching countries", error);
      toast.error(t("error.fetch_countries"));
    } finally {
      console.log('finally');

    }
  };

  const fetchShippingMethods = async () => {
    try {
      const res = await axios.get("https://babyhumod.shop/api/shipping-methods");
      setShippingMethods(res.data);
    } catch (error) {
      console.error("Error fetching shipping methods", error);
      toast.error(t("error.fetch_shipping_methods"));
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchShippingMethods();
  }, []);

  const onSubmit = async (data: FormValues) => {
    const payload = {
      name: data.country_name,
      name_en: data.country_name_en,
      code: data.country_code,                   // تضمين كود الدولة
      currency_price: data.currency_price,        // تضمين سعر عملة الدولة
    };

    try {
      if (editingCountryId) {
        // تحديث بيانات الدولة الأساسية مع الحقول الجديدة
        await axios.put(`https://babyhumod.shop/api/countries/${editingCountryId}`, payload);
        // تحديث المدن:
        for (const city of data.cities) {
          if (city.id) {
            // تحديث مدينة موجودة
            await axios.put(`https://babyhumod.shop/api/cities/${city.id}`, { name: city.value, name_en: city.value_en });
          } else {
            // إنشاء مدينة جديدة
            await axios.post("https://babyhumod.shop/api/cities", {
              country_id: editingCountryId,
              name: city.value,
              name_en: city.value_en,
            });
          }
        }
        // تحديث طرق الشحن:
        for (const sm of data.payMethods) {
          const shippingCost =
            sm.type === "دولي" && sm.internationalCosts
              ? JSON.stringify(sm.internationalCosts)
              : String(sm.price);
          if (sm.id) {
            // تحديث طريقة شحن موجودة
            await axios.put(`https://babyhumod.shop/api/shipping-methods/${sm.id}`, {
              name: sm.name,
              name_en: sm.name_en,
              description: sm.description,
              description_en: sm.description_en,
              shipping_method: sm.type,
              shipping_cost: shippingCost,
              country_id: editingCountryId,
            });
          } else {
            // إنشاء طريقة شحن جديدة
            const formdata = new FormData();
            formdata.append("country_id", String(editingCountryId));
            formdata.append("name", sm.name);
            formdata.append("name_en", sm.name_en);
            formdata.append("description", sm.description);
            formdata.append("description_en", sm.description_en);
            formdata.append("shipping_cost", shippingCost);
            formdata.append("shipping_method", sm.type);
            await fetch("https://babyhumod.shop/api/shipping-methods", {
              method: "POST",
              body: formdata,
            });
          }
        }
        toast.success(t("success.update_country"));
        setEditingCountryId(null);
      } else {
        // إنشاء دولة جديدة مع الحقول الجديدة
        const response = await axios.post("https://babyhumod.shop/api/countries", payload);
        toast.success(t("success.add_country"));
        const createdCountryId = response.data.id;
        // إضافة المدن
        for (const city of data.cities) {
          if (city.value.trim() !== "") {
            await axios.post("https://babyhumod.shop/api/cities", {
              country_id: createdCountryId,
              name: city.value,
              name_en: city.value_en,
            });
          }
        }
        // إضافة طرق الشحن
        for (const sm of data.payMethods) {
          const shippingCost =
            sm.type === "دولي" && sm.internationalCosts
              ? JSON.stringify(sm.internationalCosts)
              : String(sm.price);
          const formdata = new FormData();
          formdata.append("country_id", String(createdCountryId));
          formdata.append("name", sm.name);
          formdata.append("name_en", sm.name_en);
          formdata.append("description", sm.description);
          formdata.append("description_en", sm.description_en);
          formdata.append("shipping_cost", shippingCost);
          formdata.append("shipping_method", sm.type);
          await fetch("https://babyhumod.shop/api/shipping-methods", {
            method: "POST",
            body: formdata,
          });
        }
      }
      fetchCountries();
      fetchShippingMethods();
      reset();
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error(t("error.submit_form"));
    }
  };

  // عند التعديل، نقوم بتعبئة النموذج بالبيانات الحالية للدولة، والمدن وطرق الشحن مع معرفاتهم
  const handleEdit = (country: Country) => {
    setEditingCountryId(country.id);
    const citiesForCountry: CityField[] = (citiesMap[country.id] || []).map((city) => ({
      id: city.id,
      value: city.name,
      value_en: city.name_en || "",
    }));
    const methods = shippingMethods.filter((sm) => sm.country_id === country.id);
    const payMethodsForForm: ShippingMethodField[] = methods.map((sm) => ({
      id: sm.id,
      name: sm.name,
      name_en: sm.name_en || "",
      description: sm.description,
      description_en: sm.description_en || "",
      price: sm.shipping_method === "محلي" ? parseFloat(sm.shipping_cost) : 0,
      type: sm.shipping_method,
      internationalCosts:
        sm.shipping_method === "دولي" ? JSON.parse(sm.shipping_cost) : Array(10).fill(""),
    }));
    reset({
      country_name: country.name,
      country_name_en: country.name_en,
      country_code: country.code,                   // استخدام قيمة كود الدولة من الكائن
      currency_price: String(country.currency_price), // استخدام قيمة سعر العملة
      cities: citiesForCountry.length ? citiesForCountry : [{ value: "", value_en: "" }],
      payMethods: payMethodsForForm.length
        ? payMethodsForForm
        : [
          {
            name: "",
            name_en: "",
            description: "",
            description_en: "",
            price: 0,
            type: "محلي",
            internationalCosts: Array(10).fill(""),
          },
        ],
    });
  };

  // عند الحذف، نقوم أولاً بحذف طرق الشحن ثم المدن ثم الدولة
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://babyhumod.shop/api/shipping-methods/country/${id}`);
      await axios.delete(`https://babyhumod.shop/api/cities/country/${id}`);
      await axios.delete(`https://babyhumod.shop/api/countries/${id}`);
      toast.success(t("success.delete_country"));
      fetchCountries();
      fetchShippingMethods();
    } catch (error) {
      console.error("Error deleting country", error);
      toast.error(t("error.delete_country"));
    }
  };

  const handleChangePage = (_: any, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // دالة لتوليد تسميات حقول أسعار الشحن الدولية
  const getWeightLabel = (index: number) => {
    const start = 0.5 + index * 0.5;
    const end = start + 0.5;
    return `${start} - ${end} ${t("unit.kilo")}`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "right" }}>
        {editingCountryId ? t("country.edit") : t("country.add")}
      </Typography>
      <StyledPaper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label={t("country.name_ar")}
            {...register("country_name", { required: t("error.required") })}
            error={!!errors.country_name}
            helperText={errors.country_name ? errors.country_name.message : ""}
            sx={{ mb: 2 }}
            inputProps={{ style: { textAlign: "right" } }}
          />
          <TextField
            fullWidth
            label={t("country.name_en")}
            {...register("country_name_en", { required: t("error.required") })}
            error={!!errors.country_name_en}
            helperText={errors.country_name_en ? errors.country_name_en.message : ""}
            sx={{ mb: 2 }}
            inputProps={{ style: { textAlign: "right" } }}
          />
          {/* حقول الدولة الجديدة */}
          <TextField
            fullWidth
            label="كود الدولة"
            {...register("country_code", { required: "هذا الحقل مطلوب" })}
            error={!!errors.country_code}
            helperText={errors.country_code ? errors.country_code.message : ""}
            sx={{ mb: 2 }}
            inputProps={{ style: { textAlign: "right" } }}
          />
          <TextField
            fullWidth
            label="سعر عملة الدولة"
            {...register("currency_price", { required: "هذا الحقل مطلوب" })}
            error={!!errors.currency_price}
            helperText={errors.currency_price ? errors.currency_price.message : ""}
            sx={{ mb: 2 }}
            inputProps={{ style: { textAlign: "right" } }}
          />
          <Typography variant="h6" sx={{ mt: 2, mb: 1, textAlign: "right" }}>
            {t("country.provinces")}
          </Typography>
          <Grid container spacing={2}>
            {cityFields.map((field, index) => (
              <Grid container item xs={12} key={field.id} alignItems="center">
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label={`${t("province.name_ar")} ${index + 1}`}
                    {...register(`cities.${index}.value`, { required: t("error.required") })}
                    inputProps={{ style: { textAlign: "right" } }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label={`${t("province.name_en")} ${index + 1}`}
                    {...register(`cities.${index}.value_en`, { required: t("error.required") })}
                    inputProps={{ style: { textAlign: "right" } }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => removeCity(index)} color="error">
                    {t("action.delete")}
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Button variant="outlined" onClick={() => appendCity({ value: "", value_en: "" })} sx={{ mt: 1, mb: 2 }}>
            {t("province.add")}
          </Button>
          <Typography variant="h6" sx={{ mt: 2, mb: 1, textAlign: "right" }}>
            {t("shipping_methods.title")}
          </Typography>
          <Grid container spacing={2}>
            {payMethodFields.map((field, index) => {
              const currentType = watch(`payMethods.${index}.type`);
              return (
                <Grid container item xs={12} key={field.id} spacing={1}>
                  <Grid item xs={3}>
                    <TextField
                      label={`${t("shipping_methods.name")} ${index + 1}`}
                      fullWidth
                      {...register(`payMethods.${index}.name`, { required: t("error.required") })}
                      inputProps={{ style: { textAlign: "right" } }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label={`${t("shipping_methods.name_en")} ${index + 1}`}
                      fullWidth
                      {...register(`payMethods.${index}.name_en`, { required: t("error.required") })}
                      inputProps={{ style: { textAlign: "right" } }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label={t("shipping_methods.description")}
                      fullWidth
                      {...register(`payMethods.${index}.description`, { required: t("error.required") })}
                      inputProps={{ style: { textAlign: "right" } }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label={t("shipping_methods.description_en")}
                      fullWidth
                      {...register(`payMethods.${index}.description_en`, { required: t("error.required") })}
                      inputProps={{ style: { textAlign: "right" } }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Controller
                      control={control}
                      name={`payMethods.${index}.type`}
                      render={({ field }) => (
                        <>
                          <FormLabel sx={{ textAlign: "right" }}>{t("shipping_methods.type")}</FormLabel>
                          <RadioGroup row {...field}>
                            <FormControlLabel value="محلي" control={<Radio />} label={t("shipping_methods.local")} />
                            <FormControlLabel value="دولي" control={<Radio />} label={t("shipping_methods.international")} />
                          </RadioGroup>
                        </>
                      )}
                    />
                  </Grid>
                  {currentType === "محلي" && (
                    <Grid item xs={2}>
                      <TextField
                        label={t("shipping_methods.price")}
                        type="number"
                        fullWidth
                        {...register(`payMethods.${index}.price`, { required: t("error.required") })}
                        inputProps={{ style: { textAlign: "right" } }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={1}>
                    <Button onClick={() => removePayMethod(index)} color="error">
                      {t("action.delete")}
                    </Button>
                  </Grid>
                  {currentType === "دولي" && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" sx={{ textAlign: "right", mt: 1 }}>
                        {t("shipping_methods.international_prices")}
                      </Typography>
                      <Grid container spacing={1}>
                        {Array.from({ length: 10 }).map((_, i) => (
                          <Grid item xs={6} key={i}>
                            <TextField
                              fullWidth
                              label={`${getWeightLabel(i)}`}
                              {...register(`payMethods.${index}.internationalCosts.${i}`, {
                                required: t("error.required"),
                              })}
                              inputProps={{ style: { textAlign: "right" } }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              );
            })}
          </Grid>
          <Button
            variant="outlined"
            onClick={() =>
              appendPayMethod({
                name: "",
                name_en: "",
                description: "",
                description_en: "",
                price: 0,
                type: "محلي",
                internationalCosts: Array(10).fill(""),
              })
            }
            sx={{ mt: 1, mb: 2 }}
          >
            {t("shipping_methods.add")}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <StyledButton variant="outlined" type="button" onClick={() => reset()}>
              {t("action.reset")}
            </StyledButton>
            <StyledButton variant="contained" type="submit" color="primary">
              {editingCountryId ? t("action.update") : t("action.add")}
            </StyledButton>
          </Box>
        </form>
      </StyledPaper>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        {t("country.list")}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">{t("country.name_ar")}</TableCell>
              <TableCell align="center">{t("country.name_en")}</TableCell>
              <TableCell align="center">{t("country.provinces")}</TableCell>
              <TableCell align="center">{t("shipping_methods.title")}</TableCell>
              <TableCell align="center">{t("action.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((country) => (
                <TableRow key={country.id}>
                  <TableCell align="center">{country.name}</TableCell>
                  <TableCell align="center">{country.name_en}</TableCell>
                  <TableCell align="center">
                    {citiesMap[country.id]
                      ? citiesMap[country.id]
                        .map((city) => `${city.name} / ${city.name_en}`)
                        .join(", ")
                      : ""}
                  </TableCell>
                  <TableCell align="center">
                    {shippingMethods
                      .filter((sm) => sm.country_id === country.id)
                      .map((sm) =>
                        sm.shipping_method === "دولي"
                          ? `${sm.name} / ${sm.name_en} (${t("shipping_methods.international")})`
                          : `${sm.name} / ${sm.name_en} (${sm.shipping_cost})`
                      )
                      .join(", ")}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEdit(country)}>{t("action.edit")}</Button>
                    <Button onClick={() => handleDelete(country.id)} color="error">
                      {t("action.delete")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={countries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ direction: 'ltr' }}
        />
      </TableContainer>
    </Box>
  );
};

export default Countries;
