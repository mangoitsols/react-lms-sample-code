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
import Preview from '@/common/PreviewAttachments/previewAttachment';
// Helper Import
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sessionUpdateValidation } from '@/validation_schema/sessionValidation';
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
import Sessions from "../../../../../styles/session.module.css"
import { ToastContainer } from 'react-toastify';
// API services
import { HandleCourseGet } from '@/services/course';
import { HandleModuleGet } from '@/services/module';
import { HandleSessionUpdate, HandleSessionGetByID } from '@/services/session';
import { Attachment, Description, Image, Movie, PictureAsPdf } from '@mui/icons-material';



export default function UpdateSession() {
   const router: any = useRouter();
   const [despcriptionContent, setdespcriptionContent] = useState("");
   const [updateSession, setUpdateSession] = useState<sessionType | any>([]);
   const [getCourses, setCourses] = useState<courseType | any>();
   const [getSession, setSession] = useState<sessionType | any>();
   const [getModules, setModules] = useState<moduleType | any>();
   const [file, setFile] = useState<string | any>('')
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
   } = useForm<sessionType | any>({
      resolver: yupResolver(sessionUpdateValidation),
   });
// console.log('getvalue', getValues())
   const handleContentChange = (value: string, identifier: string) => {
      if (value === '<p><br></p>') {
         setError(identifier, { message: 'Description is a required field' });
      } else {
         setError(identifier, { message: '' })
         setValue(identifier, value);
      }
      setdespcriptionContent(value);
   };

   const onSubmit = async (event: any) => {   
      const id = router.query.id   
      // const reqData = { ...event, 'attachment': file }
      if (errors.description?.message === '' || (typeof errors === 'object' && errors !== null)) {
         const reqData: any = {
            description: event.description,
            module_id: event.module_id,
            course_id: event.course_id,
            title: event.title,
            attachment: file
         }

         const formData = new FormData()
         for (var key in reqData) {
            formData.append(key, reqData[key]);
         }

         setLoading(true);
         setLoadingButton(false)
         try {
            const res = await HandleSessionUpdate(id, formData)
            getSessionData()
            setLoading(false);
            setTimeout(() => {
               router.push('/admin/courses/allsessions/')
            }, 1000)
         } catch (e) {
            console.log(e)
            setLoadingButton(true)
         }
      } else {
         setError('description', { message: 'Description is a required field' });
      }
   };

   const handleUpdate = (e: any) => {
      setUpdateSession(e.target.value)
   }

   const getSessionData = async () => {
      const id = router.query.id
      if (id) {
         HandleSessionGetByID(id).then((session) => {
            setSession(session.data)
            const fields = [
               "title",
               "module_id",
               "course_id",
               "description",
               "attachment"
            ];
            fields.forEach((field) => setValue(field, session.data[field]));
         })
            .catch((error) => {
               setErrors(error.message);
            });
      }

      if (error) {
         return <Typography >{error}</Typography >;
      }

      if (!getSession) {
         return <Typography >Loading...</Typography >;
      }
   }

   const getCourseData = () => {
      HandleCourseGet('', '').then((courses) => {
         setCourses(courses.data)
      })
   };

   const getModuleData = () => {
      HandleModuleGet('', '').then((modules) => {
         setModules(modules.data)
      })
   }

   useEffect(() => {
      let localData: any;
      if (typeof window !== "undefined") {
         localData = window.localStorage.getItem("userData");
      }
      if (localData) {
         getSessionData();
         getCourseData();
         getModuleData();
      }
   }, [router.query]);

   function ErrorShowing(errorMessage: any) {
      return (
         <Typography variant="body2" color={"error"} gutterBottom>
            {errorMessage}{" "}
         </Typography>
      );
   }

   const handleChange = (e: any) => {
      const file = e.target.files[0];
      if (e.target.name === "attachment") {
         const reader = new FileReader();
         reader.onload = (e: any) => {
            setFile(file);
            setValue("file", file);
         }
         if (file) {
            reader.readAsDataURL(file);
         }
      }
   }

   console.log("errors", errors)
   return (
      <>
         <Navbar />
         <Box className={styles.combineContentAndSidebar}>
            <SideBar />

            <Box className={styles.siteBodyContainer}>
               {/* breadcumbs */}
               <BreadcrumbsHeading
                  First="Home"
                  Middle="Session"
                  Text="SESSION"
                  Link="admin/courses/allsessions/updatesession"
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
                                 <Typography>EDIT SESSION</Typography>
                                 <Grid item xs={12} sm={12} md={12} lg={12} className={Sessions.sessionNameGride} >

                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                       <InputLabel>
                                          Session Name
                                       </InputLabel>
                                       <TextField
                                          {...register("title")}
                                          value={updateSession.title}
                                          onChange={handleUpdate}
                                       />
                                       {errors && errors.title
                                          ? ErrorShowing(errors?.title?.message)
                                          : ""}
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                       <InputLabel>Course of session</InputLabel>
                                       <Controller
                                          name="course_id"
                                          control={control}
                                          defaultValue=''
                                          render={({ field }) => (
                                             <FormControl fullWidth>
                                                <Select {...field} displayEmpty>
                                                   {getCourses?.map((course: any) => {
                                                      return (<MenuItem key={course.course.id} value={course.course.id}>{capitalizeFirstLetter(course?.course.title)}</MenuItem>)
                                                   })}
                                                </Select>
                                             </FormControl>
                                          )}
                                       />
                                       {errors && errors.course_id
                                          ? ErrorShowing(errors?.course_id?.message)
                                          : ""}
                                    </Grid>
                                 </Grid>

                                 <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                                    <InputLabel>Module of session</InputLabel>
                                    <Controller
                                       name="module_id"
                                       control={control}
                                       defaultValue=""
                                       render={({ field }) => (
                                          <FormControl fullWidth>
                                             <Select {...field} displayEmpty>
                                                {getModules?.map((module: any) => {
                                                   return (<MenuItem key={module.module.id} value={module.module.id}>{capitalizeFirstLetter(module?.module.title)}</MenuItem>)
                                                })}
                                             </Select>
                                          </FormControl>
                                       )}
                                    />
                                    {errors && errors.module_id ? ErrorShowing(errors?.module_id?.message) : ""}
                                 </Grid>
                                 <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                                    <InputLabel>Description</InputLabel>
                                    <RichEditor
                                       {...register("description")}
                                       value={despcriptionContent ? despcriptionContent : getSession?.description}
                                       onChange={(e) =>
                                          handleContentChange(e, "description")
                                       }
                                    />
                                    {errors && errors.description ? ErrorShowing(errors?.description?.message) : ""}
                                    {/* {despcriptionContent ? '' : errors && errors.description ? ErrorShowing(errors?.description?.message) : ""} */}
                                 </Grid>

                                 <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                                    <InputLabel>Attachment</InputLabel>
                                    <Box className={Sessions.sessionAttachmentBox}>
                                       <Box component='span'>
                                          {getSession !== undefined && <Preview name={getSession.attachment} />}

                                       </Box>
                                       <Box component='span'>
                                          <InputLabel className={Sessions.updateSessionAttachments}>
                                             <input
                                                type="file"
                                                {...register('attachment')}
                                                onChange={handleChange}
                                                hidden
                                             />
                                             <Typography>  {!file.name ? "Upload" : file.name}</Typography>
                                          </InputLabel>

                                       </Box>
                                    </Box>
                                    {file ? '' : errors && errors.file ? ErrorShowing(errors?.file?.message) : ""}
                                 </Grid>
                                 <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"right"} >
                                    {!isLoadingButton ? <Button type="submit" size="large" variant="contained">
                                       UPDATE SESSION
                                    </Button> : <LoadingButton loading={isLoadingButton} className={Sessions.updateLoadingButton}
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


