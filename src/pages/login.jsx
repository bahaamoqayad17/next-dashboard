import { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LangMenu from "../components/dashboard/LangMenu";
import Image from "next/image";

const Page = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState("email");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid Email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      singIn(formik.values);
    },
  });
  const handleTabChange = (event, value) => {
    setTab(value);
  };

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Login`}</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1 auto",
        }}
      >
        <Grid container sx={{ flex: "1 1 auto" }}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              backgroundColor: "neutral.50",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                p: 3,
              }}
            >
              {/* <NextLink href="/login" passHref>
                <a><img src="Png.png" width="50" height="50" /></a>
              </NextLink> */}
            </Box>
            <Box
              sx={{
                flex: "1 1 auto",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  maxWidth: 500,
                  px: 3,
                  py: "100px",
                  width: "100%",
                }}
              >
                <div>
                  <Typography sx={{ mb: 1 }} variant="h4">
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      alignItems={"center"}
                      sx={{ my: 2 }}
                    >
                      <p style={{ margin: 0 }}>{t("welcome")}</p>
                      <LangMenu />
                    </Box>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mb: 3 }}
                    variant="body2"
                  >
                    {t("Sign up on the internal platform")}
                  </Typography>
                  <Tabs onChange={handleTabChange} sx={{ mb: 3 }} value={tab}>
                    <Tab label={t("login")} value="email" />
                  </Tabs>
                  {tab === "email" && (
                    <div>
                      <TextField
                        margin="normal"
                        error={Boolean(
                          formik.touched.email && formik.errors.email
                        )}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label={t("email")}
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(
                          formik.touched.password && formik.errors.password
                        )}
                        fullWidth
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        label={t("password")}
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                        variant="outlined"
                      />
                      {formik.errors.submit && (
                        <Typography
                          color="error"
                          sx={{ mt: 2 }}
                          variant="body2"
                        >
                          {formik.errors.submit}
                        </Typography>
                      )}
                      <Button
                        fullWidth
                        size="large"
                        sx={{ mt: 3 }}
                        onClick={() => formik.handleSubmit()}
                        variant="contained"
                      >
                        {t("login")}
                      </Button>
                    </div>
                  )}
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              alignItems: "center",
              background:
                "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              "& img": {
                maxWidth: "100%",
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Image src="/login.svg" alt="test" width="700" height="700" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;
