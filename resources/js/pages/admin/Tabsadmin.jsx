import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Grid container md={12} xs={12}>
      <Grid item md={6} xs={12} elevate={6}>
          <Typography variant="h6" sx={{ mt: 2 }}>
              Evolution des utilisateurs{" "}
          </Typography>
          <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                      Année
                  </InputLabel>
                  <Select
                      labelId="year-selection"
                      id="year-selection"
                   
                      value={annee}
                      label="Année"
                      onChange={handleChange}
                  >
                      <MenuItem value={2020}>2020</MenuItem>
                      <MenuItem value={2021}>2021</MenuItem>
                      <MenuItem value={2022}>2022</MenuItem>
                  </Select>
              </FormControl>
          </Box>
          <Chart />
          <Box >
          <Button variant="contained"  sx={{ml:2}}><InsertDriveFileIcon/>Exporter en XLS</Button>
          <Button variant="contained" sx={{ml:2}}><GridOnIcon/>Exporter en CSV</Button>
          <Button variant="contained" sx={{ml:2}}><PictureAsPdfIcon />Imprimer en PDF</Button>
          
          </Box>
      </Grid>
  </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
