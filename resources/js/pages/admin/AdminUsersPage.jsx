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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbOnTotalSilenceIcon from '@mui/icons-material/DoNotDisturbOnTotalSilence';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
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

  function createData(nom, prenom,tel, email, ) {
    return { nom, prenom, tel, email };
  }
  
  const rows = [
    createData('Gogo', 'Juju', 111155545554,"gogo@gmail.com"),
    createData('Gogo', 'Juju', 111155545554,"gogo@gmail.com"),
    createData('Gogo', 'Juju', 111155545554,"gogo@gmail.com"),
    createData('Gogo', 'Juju', 111155545554,"gogo@gmail.com"),
    createData('Maassaamoooh  ', 'Leonard', 111155545554,"massamooh@gmail.com"),

  ];
  
  return (
    <Box mt={10} ml={2}>
      <Box>
        <Typography variant="h4">Gestion des Users</Typography>
      </Box>
      <Grid container columnSpacing={3}>
        <Grid item xs={6} md={4}>
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
         <Grid item xs={6} md={6}>
         
         </Grid>
      </Grid>
      <Grid container sx={{ mt:2,}} xs={12} md={12}>
      <Grid item xs={12} md={12}>
          <Paper elevate={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prenom</TableCell>
                  <TableCell>Tel</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Infos Detaillées</TableCell>
                  <TableCell>Modifier</TableCell>
                  <TableCell>Muter</TableCell>
                  <TableCell>Banir</TableCell>
                  <TableCell>Promouvoir</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
              {rows.map((row) => (
                <TableRow key={1}>
                  <TableCell>
                    {row.nom}
                  </TableCell>
                  <TableCell>
                    {row.prenom}
                  </TableCell>
                  <TableCell>
                    {row.tel}
                  </TableCell>

                  <TableCell>
                    {row.email}
                  </TableCell>
                  <TableCell>
                    <Button color="primary" variant="outlined" Style="width:4"> 
                    <Icon sx={{ fontSize:30}}>information-circle</Icon>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" variant="outlined" Style="width:4"> 
                    <EditIcon/>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" variant="outlined" Style="width:4"> 
                    <DoNotDisturbOnTotalSilenceIcon/>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" variant="outlined" Style="width:4"> 
                    <NotInterestedIcon/>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" variant="outlined" Style="width:4"> 
                    <UpgradeIcon/>
                    </Button>
                  </TableCell>
                </TableRow>))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        </Grid>

    </Box>

  )
}
export default AdminUsersPage;
