// ***** React Import
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
// MUI Import
import { Box, Button, Card, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, NativeSelect, Select, TextField, Typography } from "@mui/material";
// External Components
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import Navbar from "../../../../../common/LayoutNavigations/navbar";
import RichEditor from "@/common/RichTextEditor/textEditor";
// Helper Import
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseValidations } from '@/validation_schema/courseValidation';
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from '@/common/CircularProcess/circularProgressBar';
import SpinnerProgress from '@/common/CircularProgressComponent/spinnerComponent';
import { capitalizeFirstLetter } from '@/common/CapitalFirstLetter/capitalizeFirstLetter';
// Types Import
import { sessionType } from '@/types/sessionType';
import { courseType } from '@/types/courseType';
import { moduleType } from '@/types/moduleType';
// CSS Import
import styles from "../../../../../styles/sidebar.module.css";
import Sessions from "../../../../styles/session.module.css";
import courseStyle from "../../../../../styles/course.module.css";
import { ToastContainer } from 'react-toastify';
// API services
import { HandleCourseGet, HandleCourseGetByID, HandleCourseUpdate } from '@/services/course';
import { Attachment, Description, Image, Movie, PictureAsPdf } from '@mui/icons-material';
import { type } from 'os';
import { HandleModuleGetByID, HandleModuleUpdate } from '@/services/module';
import { moduleValidations } from '@/validation_schema/moduleValidation';



export default function UpdateModule() {
  const router: any = useRouter();
  const [getShortDespcriptionContent, setShortDespcriptionContent] = useState("");
  const [getUpdateModule, setUpdateModule] = useState<moduleType | any>([]);
  const [getModule, setModule] = useState<moduleType | any>();
  const [getCourses, setCourses] = useState<courseType | any>();
  const [getCourseId, setCourseId] = useState<any>("");

  const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setErrors] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    setValue, getValues,
    control,
    formState: { errors }, setError
  } = useForm<moduleType | any>({
    resolver: yupResolver(moduleValidations),
  });
  // console.log('getvalue', getValues())

  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      getModuleData();
      getCourseData();
    }
  }, [router.query]);

  const handleContentChange = (value: string, identifier: string) => {
    if (identifier === 'description') {
      if (value === '<p><br></p>') {
        setError(identifier, { message: 'Description is a required field' });
      } else {
        setError(identifier, { message: '' })
        setValue(identifier, value);
      }
      setShortDespcriptionContent(value);
    }

  };

  const onSubmit = async (event: any) => {
    const id = router.query.id
    // const reqData = { ...event }
    if (errors.description?.message === '' || (typeof errors === 'object' && errors !== null)) {
      // const reqData: any = {
      //   description: event.description,
      //   title: event.title,

      // }

      // const formData = new FormData()
      // for (var key in reqData) {
      //   formData.append(key, reqData[key]);
      // }

      setLoading(true);
      setLoadingButton(false)
      try {
        const res = await HandleModuleUpdate(id, event)
        getModuleData()
        setLoading(false);
        setTimeout(() => {
          router.push('/admin/courses/allmodules/')
        }, 1000)
      } catch (e) {
        console.log(e)
        setLoadingButton(true)
      }
    } else {
      setError('description', { message: 'Description is a required field' });
    }
  };

  console.log("getCourseId",getCourseId)
  const handleUpdate = (e: any) => {
    // if(e.target.name === 'title'){
    setModule({ ...getModule, title: e.target.value })
    // }
  }

  // const handleChange = (e: any) => {
  //   // setModule({...getModule, [e.target.name]: e.target.value })
  //   setCourseId(e)
  //   // console.log('eveee',e)
  // };

  const getModuleData = async () => {
    const id = router.query.id
    if (id) {
      HandleModuleGetByID(id).then((module) => {
        setModule(module.data)
        setCourseId(module.data?.course_id)
        const fields = [
          "course_id",
          "title",
          "course",
          "status",
          "description",
        ];
        fields.forEach((field) => setValue(field, module.data[field]));
        // setCourseId(module.data?.course_id)
      })
        .catch((error) => {
          setErrors(error.message);
        });
    }
    // console.log('Course', getCourse)
    if (error) {
      return <Typography >{error}</Typography >;
    }

    if (!getModule) {
      return <Typography >Loading...</Typography >;
    }
  }


  const getCourseData = () => {
    HandleCourseGet('', '').then((courses) => {
      setCourses(courses.data)
    })
  };


 

  
  function ErrorShowing(errorMessage: any) {
    return (
      <Typography variant="body2" color={"error"} gutterBottom>
        {errorMessage}{" "}
      </Typography>
    );
  }
  // console.log("oppsss", getCourses)
  // let idd=getModule && getModule?.course_id;
  console.log("oppAAAs", getCourseId)
 
//  if(idd)
  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Module"
            Text="MODULE"
            Link="/admin/courses/allmodules"
          />
          {/* main content */}
          <Card>
            <CardContent>
              {!isLoading ?
                <Box
                  component="form"
                  method="POST"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                  onReset={reset}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={6} >
                      <Box component="img" src="/Images/pages/addFeature.jpg" width={'100%'} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6} >
                      <Typography>EDIT MODULE</Typography>
                      <Grid item xs={12} sm={12} md={12} lg={12} className={courseStyle.courseNameGride} >

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <InputLabel>
                            Module Name
                          </InputLabel>
                          <TextField
                            {...register("title")}
                            value={getModule?.title}
                            onChange={handleUpdate}
                          />
                          {errors && errors.title
                            ? ErrorShowing(errors?.title?.message)
                            : ""}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <InputLabel>Course of Module</InputLabel>
                          <Controller
                            name="course"
                            control={control}
                            defaultValue={getCourseId}                          
                            render={({ field }) => (
                              <FormControl fullWidth>
                                <Select {...field} onChange={(e) => setCourseId(e.target.value)} displayEmpty>
                                  <MenuItem disabled value="">
                                    Select Course
                                  </MenuItem>
                                  {getCourses?.map((course: any) => {
                                    return (<MenuItem key={course?.course.id} value={course?.course.id}>{capitalizeFirstLetter(course?.course.title)}</MenuItem>)
                                  })}
                                </Select>
                              </FormControl>
                            )}
                          />
                          {errors && errors.course
                            ? ErrorShowing(errors?.course?.message)
                            : ""}
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                        <InputLabel>Status</InputLabel>
                        <Controller
                          name="status"
                          control={control}
                          defaultValue={getModule?.status || ""}
                          // defaultValue=''
                          render={({ field }) => (
                            <FormControl fullWidth>
                              <Select {...field} displayEmpty>
                                <MenuItem value={'active'}>
                                  Active
                                </MenuItem>
                                <MenuItem value={'inactive'}>
                                  In-active
                                </MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        />
                        {errors && errors.status
                          ? ErrorShowing(errors?.status?.message)
                          : ""}
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                        <InputLabel>Description</InputLabel>
                        <RichEditor
                          {...register("description")}
                          value={getShortDespcriptionContent ? getShortDespcriptionContent : getModule?.description}
                          onChange={(value) =>
                            handleContentChange(value, "description")
                          }
                        />
                        {errors && errors.description ? ErrorShowing(errors?.description?.message) : ""}
                        {/* {getShortDespcriptionContent ? '' : errors && errors.description ? ErrorShowing(errors?.description?.message) : ""} */}
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"right"} >
                        {!isLoadingButton ? <Button type="submit" size="large" variant="contained">
                          UPDATE MODULE
                        </Button> : <LoadingButton loading={isLoadingButton} className={courseStyle.updateLoadingButton}
                          size="large" variant="contained" disabled >
                          <CircularProgressBar />
                        </LoadingButton>}
                      </Grid>
                    </Grid>

                  </Grid>
                </Box>
                : <SpinnerProgress />}
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* <Footer/> */}
      <ToastContainer />
    </>
  );
};

