import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,

  Pagination,
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// CSS Import
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../../styles/sidebar.module.css";
import courseStyle from "../../../styles/course.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";

import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import { SearchOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import {  HandleCourseGet } from "@/services/course";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import { usePagination } from "@/common/Pagination/paginations";
import { Controller, useForm } from "react-hook-form";
import { handleSortData } from "@/common/Sorting/sorting";

interface Column {
  id:
    | "id"
    | "title"
    | "module"
    | "session"
    | "is_chargeable"
    | "percent"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "ID" },
  { id: "title", label: "COURSE NAME", minWidth: 170 },
  { id: "module", label: "NO. MODULE", minWidth: 100 },
  { id: "session", label: "NO. SESSION", minWidth: 100 },
  { id: "is_chargeable", label: "TYPE", minWidth: 100 },
  { id: "percent", label: "COMPLETE (%)", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const AllCourses = () => {
  const [rows, setRows] = React.useState<any>([]);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState("");
  const [deleteRow, setDeleteRow] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [getFilter, setFilter] = React.useState<number>(0);
  const [filterObject, setFilterObject] = React.useState<any>("");

  const router = useRouter();
  //pagination
  const [row_per_page, set_row_per_page] = React.useState(5);
  let [page, setPage] = React.useState<any>(1);
  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  const PER_PAGE = row_per_page;
  const count = Math.ceil(rows?.length / PER_PAGE);
  const DATA = usePagination(rows, PER_PAGE);
  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };

  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (event: any) => {
    HandleCourseGet("", event).then((itemFiltered) => {
      setRows(itemFiltered.data);
      setFilterObject(event);
    });
  };

  const handleClickOpen = (row: any) => {
    router.push(`/user/course/detail/${row}`);
    setOpen(!open);
  };

  const resetFilterValue = () => {
    setFilter(0);
    reset({ is_chargeable: 0, status: 0 });
    HandleCourseGet("", { is_chargeable: 0, status: 0 }).then((itemSeached) => {
      setRows(itemSeached.data);
    });
  };
  const handleSort = (rowsData: any) => {
    const sortData = handleSortData(rowsData);
    setRows(sortData);
    setToggle(!toggle);
  };

  const handleSearch = (e: any, identifier: any) => {
    setPage(1);
    DATA.jump(1);
    if (identifier === "reset") {
      HandleCourseGet("", { is_chargeable: 0, status: 0 }).then(
        (itemSeached) => {
          setRows(itemSeached.data);
        }
      );
      setSearch(e);
    } else {
      const search = e.target.value;
      setSearch(e.target.value);
      HandleCourseGet(search, filterObject).then((itemSeached) => {
        setRows(itemSeached.data);
      });
    }
  };

  const getAllCourseData = () => {
    HandleCourseGet("", filterObject).then((courses) => {
      setRows(courses.data);
    });
  };

  React.useEffect(() => {
    getAllCourseData();
  }, []);

  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Courses"
            Text="COURSES"
            Link="/user/course"
          />

          {/* main content */}
          <Card>
            <CardContent>
              <TextField
                id="standard-search"
                value={search}
                variant="outlined"
                placeholder="Search by course"
                onChange={(e) => handleSearch(e, "")}
                InputProps={{
                  endAdornment: !search ? (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ) : (
                    <IconButton onClick={(e) => handleSearch("", "reset")}>
                      {" "}
                      <CloseIcon />
                    </IconButton>
                  ),
                }}
              />
              <Box
                sx={{ float: "right", display: "flex", alignItems: "center" }}
              >
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <Box>
                      <Button
                        sx={{ display: "inline-flex", color: "#1976d2" }}
                        {...bindTrigger(popupState)}
                      >
                        <FilterAltOutlinedIcon />
                        Filter
                      </Button>
                      <Popover
                        {...bindPopover(popupState)}
                        style={{ width: "35% !important" }}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Box>
                          <Container
                            className="filter-box"
                            style={{ padding: "15px" }}
                          >
                            <Grid>
                              <Typography
                                variant="h5"
                                sx={{ fontWeight: "bold" }}
                              >
                                Filter
                              </Typography>
                              <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                                sx={{ mt: 1 }}
                              >
                                <Stack
                                  style={{ marginTop: "10px" }}
                                  className="form-filter"
                                >
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={6}>
                                      <Stack spacing={2}>
                                        <InputLabel
                                          htmlFor="enddate"
                                          sx={{ fontWeight: "bold" }}
                                        >
                                          Type
                                        </InputLabel>
                                        <Controller
                                          name="is_chargeable"
                                          control={control}
                                          defaultValue={getFilter}
                                          render={({ field }) => (
                                            <FormControl fullWidth>
                                              <Select {...field} displayEmpty>
                                                <MenuItem value={0}>
                                                  All
                                                </MenuItem>
                                                <MenuItem value={"free"}>
                                                  Free
                                                </MenuItem>
                                                <MenuItem value={"paid"}>
                                                  Paid
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                          )}
                                        />
                                      </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                      <Stack spacing={2}>
                                        <InputLabel
                                          htmlFor="enddate"
                                          sx={{ fontWeight: "bold" }}
                                        >
                                          Status
                                        </InputLabel>
                                        <Controller
                                          name="status"
                                          control={control}
                                          defaultValue={getFilter}
                                          render={({ field }) => (
                                            <FormControl fullWidth>
                                              <Select {...field} displayEmpty disabled>
                                                <MenuItem value={0}>
                                                  All
                                                </MenuItem>
                                                <MenuItem value={"active"}>
                                                  Active
                                                </MenuItem>
                                                <MenuItem value={"inactive"}>
                                                  In-active
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                          )}
                                        />
                                      </Stack>
                                    </Grid>

                                    <Grid item xs={12} lg={12}>
                                      <Box>
                                        <div
                                          onClick={popupState.close}
                                          className={courseStyle.divcss}
                                        >
                                          <Button
                                            className={courseStyle.boxInFilter}
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            type="button"
                                            onClick={resetFilterValue}
                                          >
                                            Reset
                                          </Button>
                                        </div>
                                        <Button
                                          size="medium"
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          className={
                                            courseStyle.applyButtonInFiltter
                                          }
                                          onClick={popupState.close}
                                        >
                                          Apply
                                        </Button>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Stack>
                              </Box>
                            </Grid>
                          </Container>
                        </Box>
                      </Popover>
                    </Box>
                  )}
                </PopupState>
                &nbsp;
              </Box>
              <Paper>
                <TableContainer className={courseStyle.tableContainer}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ top: 0, minWidth: column.minWidth }}
                            onClick={() => {
                              column.label === "ID" ? handleSort(rows) : "";
                            }}
                          >
                            {toggle ? (
                              column.label === "ID" ? (
                                <Typography>
                                  ID{" "}
                                  <ArrowDownwardOutlinedIcon fontSize="small" />{" "}
                                </Typography>
                              ) : (
                                column.label
                              )
                            ) : column.label === "ID" ? (
                              <Typography>
                                ID <ArrowUpwardOutlinedIcon fontSize="small" />{" "}
                              </Typography>
                            ) : (
                              column.label
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows && rows.length > 0 ? (
                        DATA.currentData() &&
                        DATA.currentData().map((row: any) => {
                          const statusColor =
                            row.course.status === "active"
                              ? courseStyle.activeClassColor
                              : row.course.status === "inactive"
                              ? courseStyle.inactiveClassColor
                              : courseStyle.draftClassColor;
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
                            >
                              <TableCell>{row.course.id}</TableCell>
                              <TableCell>
                                {capitalizeFirstLetter(row?.course?.title)}
                              </TableCell>
                              <TableCell>
                                {row?.moduleCount?.length !== 0
                                  ? row?.moduleCount[0]?.moduleCount
                                  : 0}
                              </TableCell>
                              <TableCell>
                                {row?.sessionCount?.length !== 0
                                  ? row?.sessionCount[0]?.sessionCount
                                  : 0}
                              </TableCell>
                              <TableCell>
                                {capitalizeFirstLetter(
                                  row?.course?.is_chargeable
                                )}
                              </TableCell>
                              <TableCell
                              //  className={statusColor}
                              >
                                {row?.course?.complete_percent === null
                                  ? "0%"
                                  : `${row?.course?.complete_percent}%`}
                              </TableCell>
                              <TableCell>
                                <Button
                                  className={courseStyle.editDeleteButton}
                                  //   href="/user/subscription/view"
                                  variant="outlined"
                                  color="primary"
                                  onClick={() =>
                                    handleClickOpen(row?.course?.id)
                                  }
                                >
                                  <VisibilityIcon />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            sx={{ fontWeight: 600, textAlign: "center" }}
                          >
                            {" "}
                            Record not Found{" "}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <Stack
                    className={courseStyle.stackStyle}
                    direction="row"
                    alignItems="right"
                    justifyContent="space-between"
                  >
                    <Pagination
                      className="pagination"
                      count={count}
                      page={page}
                      color="primary"
                      onChange={handlePageChange}
                    />
                    <FormControl>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={5}
                        onChange={handlerowchange}
                        size="small"
                        style={{ height: "40px", marginRight: "11px" }}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </TableContainer>
              </Paper>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* <Footer/> */}
    </>
  );
};

export default AllCourses;
