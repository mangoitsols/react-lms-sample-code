// React Import
import React, { useState, useEffect, Fragment } from "react";

// MUI Import
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ReactPlayer from "react-player/lazy";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

// Helper Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// External Components
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import Paper from "@mui/material/Paper";

import { useRouter } from "next/router";
import { HandleCourseByCourseId } from "@/services/course";
import { HandlePDF } from "@/services/pdfdownload";

import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import MenuBookIcon from "@mui/icons-material/MenuBook";

// CSS Import
import styles from "../../../../styles/sidebar.module.css";
import subs from "../../../../styles/subsciption.module.css";
import courseStyle from "../../../../styles/course.module.css";
import Image from "next/image";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { BASE_URL } from "@/config/config";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  marginBottom: "4px",
}));

export default function Couseview() {
  const [couseData, setCousedata] = useState<any>([]);
  const [files, setFiles] = useState<any>("");
  const [activeToggle, setActiveToggle] = useState<any>("");
  const [sessionData, setSessionData] = useState<any>([]);

  useEffect(() => {
    let localData: any;
    let getId: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      getId = JSON.parse(localData);
    }
    getCourseData();
  }, []);

  const router = useRouter();

  const getCourseData = async () => {
    const id = router?.query?.id;
    if (id) {
      HandleCourseByCourseId(id).then((data) => {
        setCousedata(data?.data);
      });
    }
  };

  const handlebtnClick = (rowData: any) => {
    setActiveToggle(rowData.id);
    setSessionData(rowData);
    if (rowData.attachment.includes("txt")) {
      console.log("txt", rowData.attachment);
      setFiles(rowData.attachment);
    } else if (rowData.attachment.includes("mp4")) {
      setFiles(rowData.attachment);
    } else if (rowData.attachment.includes("pdf")) {
      setFiles(rowData.attachment);
      console.log("pddfff", rowData.attachment);
    } else if (
      rowData.attachment.includes("jpeg") ||
      rowData.attachment.includes("jpg") ||
      rowData.attachment.includes("png")
    ) {
      setFiles(rowData.attachment);
    } else {
      setFiles(rowData.attachment);
    }
  };

  const download = async (identifier: any) => {
    let imagename = files && files?.slice(8);
    if (identifier === "image") {
      let reqData = {
        imagename: files,
        identifier: "image",
      };
      HandlePDF(reqData).then((itemSeached: any) => {
        console.log("@");
      });
    } else if (identifier === "pdf") {
      let reqData = {
        imagename: files,
        identifier: "pdf",
      };
      HandlePDF(reqData).then((itemSeached: any) => {
        console.log("@");
      });
    } else if (identifier === "txt") {
      let reqData = {
        imagename: files,
        identifier: "txt",
      };
      HandlePDF(reqData).then((itemSeached: any) => {
        console.log("@");
      });
    }
  };

  const handleMarkAsComplete = () => {
    console.log("W@@@@@@@@@@@@markAsComplete");
  };

  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <Box className={subs.maindisplay}>
            <BreadcrumbsHeading
              First="Home"
              Middle="Courses"
              Text="VIEW"
              Link="/user/course"
            />
            <Box className={courseStyle.backbtn}>
              <Link href="/user/course" style={{ textDecoration: "none" }}>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  className={courseStyle.backbtncs}
                >
                  <ArrowBackOutlinedIcon />
                  &nbsp;Back
                </Button>
              </Link>
            </Box>
          </Box>
          {/* main content */}
          <Card>
            <CardContent>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <Item className={subs.shadoww}>
                      {files && files?.includes("mp4") ? (
                        <Fragment>
                          <Grid item xs={7}>
                            <ReactPlayer
                              controls={true}
                              url={`${BASE_URL}/${files}`}
                            />
                            {/* <Item> */}
                            <Typography
                              variant="h5"
                              className={subs.useNameFront1}
                            >
                              {capitalizeFirstLetter(
                                sessionData && sessionData?.title
                              )}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              className={courseStyle.fontCS}
                            >
                              {capitalizeFirstLetter(
                                sessionData &&
                                  sessionData?.description?.replace(
                                    /(<([^>]+)>)/gi,
                                    ""
                                  )
                              )}
                            </Typography>
                            {/* </Item> */}
                          </Grid>

                          <Box className={courseStyle.backcss}>
                            <Button
                              type="submit"
                              size="large"
                              variant="contained"
                              className={courseStyle.backbtncs12}
                              onClick={handleMarkAsComplete}
                            >
                              Mark as complete
                            </Button>
                          </Box>
                        </Fragment>
                      ) : files && files?.includes("pdf") ? (
                        <Grid item xs={7}>
                          <Box className={subs.maindisplay}>
                            <Typography
                              variant="h5"
                              className={subs.useNameFront1}
                            >
                              {capitalizeFirstLetter(
                                sessionData && sessionData?.title
                              )}
                            </Typography>
                            &nbsp;
                            <Button onClick={() => download("pdf")}>
                              <FileDownloadOutlinedIcon
                                className={courseStyle.filedownloadcss}
                              />
                            </Button>
                          </Box>
                          <Typography
                            variant="subtitle2"
                            className={courseStyle.fontCS}
                          >
                            {capitalizeFirstLetter(
                              sessionData &&
                                sessionData?.description?.replace(
                                  /(<([^>]+)>)/gi,
                                  ""
                                )
                            )}
                          </Typography>
                          {/* </Item> */}
                        </Grid>
                      ) : files && files?.includes("txt") ? (
                        <Grid item xs={7}>
                          <Box className={subs.maindisplay}>
                            <Typography
                              variant="h5"
                              className={subs.useNameFront1}
                            >
                              {capitalizeFirstLetter(
                                sessionData && sessionData?.title
                              )}
                            </Typography>
                            &nbsp;
                            <Button onClick={() => download("txt")}>
                              <FileDownloadOutlinedIcon
                                className={courseStyle.filedownloadcss}
                              />
                            </Button>
                          </Box>
                          <Typography
                            variant="subtitle2"
                            className={courseStyle.fontCS}
                          >
                            {capitalizeFirstLetter(
                              sessionData &&
                                sessionData?.description?.replace(
                                  /(<([^>]+)>)/gi,
                                  ""
                                )
                            )}
                          </Typography>
                          {/* </Item> */}
                        </Grid>
                      ) : (files && files?.includes("jpeg")) ||
                        (files && files?.includes("jpg")) ||
                        (files && files?.includes("png")) ? (
                        <Grid item xs={8}>
                          <Item>
                            <Image
                              className={courseStyle.imgwidth}
                              alt="image"
                              src={`${BASE_URL}/${files}`}
                              width={350}
                              height={400}
                            />
                            <Box className={subs.maindisplay}>
                              <Typography
                                variant="h5"
                                className={subs.useNameFront1}
                              >
                                {capitalizeFirstLetter(
                                  sessionData && sessionData?.title
                                )}
                              </Typography>
                              &nbsp;
                              <Button onClick={() => download("image")}>
                                <FileDownloadOutlinedIcon
                                  className={courseStyle.filedownloadcss}
                                />
                              </Button>
                            </Box>
                            <Typography
                              variant="subtitle2"
                              className={courseStyle.fontCS}
                            >
                              {capitalizeFirstLetter(
                                sessionData &&
                                  sessionData?.description?.replace(
                                    /(<([^>]+)>)/gi,
                                    ""
                                  )
                              )}
                            </Typography>
                            <a href={`#`} download>
                              Download
                            </a>
                          </Item>
                        </Grid>
                      ) : !files ? (
                        <Fragment>
                          <Typography
                            variant="h4"
                            className={subs.useNameFront1}
                          >
                            {capitalizeFirstLetter(
                              couseData && couseData?.title
                            )}
                          </Typography>
                          <br />
                          <Typography
                            variant="subtitle2"
                            className={subs.fontCSS1}
                          >
                            {capitalizeFirstLetter(
                              (couseData && couseData?.long_description) ||
                                (couseData && couseData?.short_description)
                            )}
                          </Typography>
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </Item>
                  </Grid>
                  <Grid item xs={5}>
                    <Box className={subs.maindiv}>
                      <Typography variant="h5" className={subs.useNameFront2}>
                        Course Curriculum
                      </Typography>
                      {couseData &&
                        couseData?.modules?.map((item: any) => (
                          <Accordion key={item?.id}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={courseStyle.typoTitle}>
                                <MenuBookIcon className={subs.iconcss} /> &nbsp;{" "}
                                {capitalizeFirstLetter(item?.title)}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="vvv">
                              {item?.sessions.map((ee: any) => {
                                const togglee =
                                  ee?.id === activeToggle ? "active" : "";
                                return (
                                  <Box
                                    sx={{
                                      width: "100%",
                                      bgcolor: "background.paper",
                                    }}
                                    key={ee?.id}
                                  >
                                    <nav aria-label="main mailbox folders">
                                      <List>
                                        <ListItem disablePadding>
                                          <ListItemButton
                                            className={
                                              togglee &&
                                              courseStyle.backgroundClick
                                            }
                                            onClick={() => handlebtnClick(ee)}
                                          >
                                            <Typography
                                              variant="subtitle2"
                                              className={courseStyle.typolist}
                                            >
                                              {capitalizeFirstLetter(ee?.title)}
                                            </Typography>
                                          </ListItemButton>
                                        </ListItem>
                                      </List>
                                    </nav>
                                    <Divider />
                                  </Box>
                                );
                              })}
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </Box>
                  </Grid>
                  {/* <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    className={subs.btncss}
                  >
                    Enroll Now
                  </Button> */}
                  <br />
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
