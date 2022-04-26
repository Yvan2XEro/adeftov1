import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Badge,
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Pagination,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddMemberModal from "../../components/AddMemberModal";


function AdminUsersPage() {
  const [selected, setSetSelected] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <Box mt={10} ml={2}>
      <Box>
        <Typography variant="h4">Gestion des Users</Typography>
      </Box>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} md={4}>
          <Button
            variant={selected ? "outlined" : "contained"}
            color="primary"
            onClick={() => {
              setOpenModal(true);
            }}
            startIcon={<AddIcon />}
          >
            Creer un nouvel utilisateur
          </Button>
          <AddMemberModal
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevate={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prenom</TableCell>
                  <TableCell>Tel</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Infos Detaillées</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={1}>
                  <TableCell>
                    {"Massamooh Tefoye"}
                  </TableCell>
                  <TableCell>
                    {"Leonard Cedric "}
                  </TableCell>
                  <TableCell>
                    {654241563}
                  </TableCell>

                  <TableCell>
                    {"franckzone2@gmail.com"}
                  </TableCell>
                  <TableCell>
                    <Button color="primary" variant="outlined" Style="width:4"> 
                    <Icon sx={{ fontSize:30}}>information-circle</Icon>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Switch />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>

  )
}
export default AdminUsersPage;
