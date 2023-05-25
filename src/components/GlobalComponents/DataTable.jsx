import { useEffect } from "react";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useTranslation } from "react-i18next";
import { resources } from "@/lib/resources";
import DynamicMenu from "./DynamicMenu";

export default function DataTable({ items, getPagination, count, model }) {
  const { t } = useTranslation();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  useEffect(() => {
    getPagination(page, limit);
  }, [page, limit]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {resources[model]?.headers?.map((header) => (
                  <TableCell key={header} color="textPrimary" variant="body1">
                    {t(header)}
                  </TableCell>
                ))}
                <TableCell>{t("actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((item) => (
                <TableRow hover key={item._id}>
                  {resources[model]?.fields?.map((field) => (
                    <TableCell key={field} color="textPrimary" variant="body1">
                      {item.field}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DynamicMenu model={model} item={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}