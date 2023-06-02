import * as React from "react";
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// CSS Import
import styles from "../../../styles/sidebar.module.css";
import courseStyle from "../../../styles/course.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import {
  HandleSubscriptionGetByUserID,
  HandleSearchSubsGet,
} from "@/services/subscription";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import { usePagination } from "@/common/Pagination/paginations";
import { handleSortData } from "@/common/Sorting/sorting";
import { SearchOutlined } from "@mui/icons-material";

interface Column {
  id: "id" | "name" | "amount" | "next_pay" | "status" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "name", label: "NAME", minWidth: 100 },
  { id: "amount", label: "AMOUNT", minWidth: 100 },
  { id: "next_pay", label: "NEXT PAY", minWidth: 100 },
  { id: "status", label: "STATUS", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const Subscription = () => {
  const [rows, setRows] = React.useState<any>([]);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState("");
  const [userId, setUserId] = React.useState<any>("");

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

  const handleClickOpen = (id: any) => {
    router.push(`/user/subscription/view/${id}`);
  };

  React.useEffect(() => {
    let localData: any;
    let getId: any;

    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      getId = JSON.parse(localData);
    }
    setUserId(getId);
    getAllCourseData(getId);
  }, []);

  const handleSort = (rowsData: any) => {
    const sortData = handleSortData(rowsData);
    setRows(sortData);
    setToggle(!toggle);
  };
  const handleSearch = (e: any, identifier: any) => {
    setPage(1);
    DATA.jump(1);
    if (identifier === "reset") {
      HandleSubscriptionGetByUserID(userId?.id).then((subs) => {
        setRows(subs.data);
      });
      setSearch(e);
    } else {
      const search = e.target.value;
      if (search === "") {
        setSearch("");
        HandleSubscriptionGetByUserID(userId?.id).then((subs) => {
          setRows(subs.data);
        });
      } else {
        setSearch(e.target.value);
        HandleSearchSubsGet(search, userId?.id).then((itemSeached) => {
          setRows(itemSeached.data);
        });
      }
    }
  };

  const getAllCourseData = (data: any) => {
    HandleSubscriptionGetByUserID(data?.id).then((subs) => {
      setRows(subs.data);
    });
  };

  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Subscription"
            Text="SUBSCRIPTION"
            Link="/user/subscription"
          />

          {/* main content */}
          <Card>
            <CardContent>
              <TextField
                id="standard-search"
                value={search}
                variant="outlined"
                placeholder="Search by course"
                onChange={(e: any) => handleSearch(e, "")}
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
                          let color = row?.status;
                          const statusColor =
                            color === "active"
                              ? courseStyle.activeClassColor
                              : color === "canceled"
                              ? courseStyle.inactiveClassColor
                              : courseStyle.draftClassColor;
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
                            >
                              <TableCell>{row?.id}</TableCell>
                              <TableCell>
                                {capitalizeFirstLetter(row?.name)}
                              </TableCell>
                              <TableCell>${row?.price}</TableCell>
                              <TableCell>
                             
                                25 May 2023
                              </TableCell>
                              <TableCell className={statusColor}>
                                {capitalizeFirstLetter(row?.status)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  className={courseStyle.editDeleteButton}
                                  //   href="/user/subscription/view"
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => handleClickOpen(row?.id)}
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
    </>
  );
};

export default Subscription;
