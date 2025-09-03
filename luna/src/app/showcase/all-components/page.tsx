'use client';

import { useState } from 'react';
import {
  Stack,
  Container,
  Typography,
  Box,
  Paper,
  Button,
  ButtonGroup,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  AlertTitle,
  Autocomplete,
  TextField,
  Avatar,
  AvatarGroup,
  Badge,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
  Pagination,
  Popover,
  LinearProgress,
  CircularProgress,
  Radio,
  RadioGroup,
  Rating,
  Slider,
  Stepper,
  Step,
  StepLabel,
  Switch,
  Tabs,
  Tab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Breadcrumbs,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DataGrid } from '@mui/x-data-grid';
import { SimpleTreeView as TreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
// LoadingButton is now part of Button component with loading prop
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';

// ----------------------------------------------------------------------

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
];

const speedDialActions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function AllComponentsShowcasePage() {
  const [tabValue, setTabValue] = useState('1');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(30);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [rating, setRating] = useState(3);
  const [activeStep, setActiveStep] = useState(0);
  const [alignment, setAlignment] = useState('left');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handlePopoverClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchor(event.currentTarget);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Stack spacing={4}>
        <Typography variant="h2" gutterBottom>
          Minimal UI Components Showcase
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Minimal 템플릿의 모든 UI 컴포넌트를 한 곳에서 확인할 수 있습니다.
        </Typography>

        {/* Accordion */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Accordion
          </Typography>
          <Stack spacing={2}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Paper>

        {/* Alert */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Alert
          </Typography>
          <Stack spacing={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              This is an error alert — check it out!
            </Alert>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              This is a warning alert — check it out!
            </Alert>
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              This is an info alert — check it out!
            </Alert>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              This is a success alert — check it out!
            </Alert>
            <Alert variant="outlined" severity="error">
              This is an outlined error alert
            </Alert>
            <Alert variant="filled" severity="success">
              This is a filled success alert
            </Alert>
          </Stack>
        </Paper>

        {/* Autocomplete */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Autocomplete
          </Typography>
          <Stack spacing={2}>
            <Autocomplete
              options={options}
              renderInput={(params) => <TextField {...params} label="Basic Autocomplete" />}
              sx={{ width: 300 }}
            />
            <Autocomplete
              multiple
              options={options}
              defaultValue={[options[0]]}
              renderInput={(params) => <TextField {...params} label="Multiple values" />}
              sx={{ width: 300 }}
            />
          </Stack>
        </Paper>

        {/* Avatar */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Avatar
          </Typography>
          <Stack direction="row" spacing={2}>
            <Avatar>H</Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>OP</Avatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <PersonIcon />
            </Avatar>
            <Avatar src="/static/images/avatar/1.jpg" />
            <AvatarGroup max={4}>
              <Avatar>A</Avatar>
              <Avatar>B</Avatar>
              <Avatar>C</Avatar>
              <Avatar>D</Avatar>
              <Avatar>E</Avatar>
            </AvatarGroup>
          </Stack>
        </Paper>

        {/* Badge */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Badge
          </Typography>
          <Stack direction="row" spacing={4}>
            <Badge badgeContent={4} color="primary">
              <MailIcon />
            </Badge>
            <Badge badgeContent={10} color="secondary">
              <MailIcon />
            </Badge>
            <Badge badgeContent={100} max={99} color="error">
              <MailIcon />
            </Badge>
            <Badge variant="dot" color="success">
              <MailIcon />
            </Badge>
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={4}
              color="warning"
            >
              <Avatar>N</Avatar>
            </Badge>
          </Stack>
        </Paper>

        {/* Breadcrumbs */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Breadcrumbs
          </Typography>
          <Stack spacing={2}>
            <Breadcrumbs>
              <Link underline="hover" color="inherit" href="/">
                MUI
              </Link>
              <Link underline="hover" color="inherit" href="/">
                Core
              </Link>
              <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
            <Breadcrumbs separator="›">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/">
                Catalog
              </Link>
              <Typography color="text.primary">Accessories</Typography>
            </Breadcrumbs>
          </Stack>
        </Paper>

        {/* Button */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Button
          </Typography>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <Button variant="text">Text</Button>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="soft">Soft</Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary">
                Primary
              </Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="contained" color="success">
                Success
              </Button>
              <Button variant="contained" color="error">
                Error
              </Button>
              <Button variant="contained" color="warning">
                Warning
              </Button>
              <Button variant="contained" color="info">
                Info
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" size="small">
                Small
              </Button>
              <Button variant="contained" size="medium">
                Medium
              </Button>
              <Button variant="contained" size="large">
                Large
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" startIcon={<DeleteIcon />}>
                Delete
              </Button>
              <Button variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
              <Button variant="contained" disabled>
                Loading...
              </Button>
              <Button variant="contained" onClick={() => setLoading(!loading)}>
                {loading ? 'Loading...' : 'Click me'}
              </Button>
            </Stack>
            <ButtonGroup variant="contained">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Stack>
        </Paper>

        {/* Checkbox */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Checkbox
          </Typography>
          <FormGroup row>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Checked" />
            <FormControlLabel control={<Checkbox />} label="Unchecked" />
            <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
            <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
            <FormControlLabel control={<Checkbox defaultChecked color="secondary" />} label="Secondary" />
            <FormControlLabel control={<Checkbox defaultChecked color="success" />} label="Success" />
          </FormGroup>
        </Paper>

        {/* Chip */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Chip
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Basic" />
            <Chip label="Clickable" onClick={() => {}} />
            <Chip label="Deletable" onDelete={() => {}} />
            <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
            <Chip icon={<FavoriteIcon />} label="With Icon" />
            <Chip label="Primary" color="primary" />
            <Chip label="Secondary" color="secondary" />
            <Chip label="Success" color="success" />
            <Chip label="Error" color="error" />
            <Chip label="Warning" color="warning" />
            <Chip label="Info" color="info" />
            <Chip label="Outlined" variant="outlined" />
            <Chip label="Filled" variant="filled" />
            <Chip label="Soft" variant="soft" />
            <Chip label="Small" size="small" />
            <Chip label="Medium" size="medium" />
          </Stack>
        </Paper>

        {/* Data Grid */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Data Grid
          </Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Paper>

        {/* Date Picker */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Date Picker
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} sx={{ width: 300 }}>
              <DatePicker
                label="Basic date picker"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
              <DatePicker
                label="Disabled"
                disabled
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </Stack>
          </LocalizationProvider>
        </Paper>

        {/* Dialog */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Dialog
          </Typography>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Open Dialog
          </Button>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <Typography>
                To subscribe to this website, please enter your email address here. We will send
                updates occasionally.
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setDialogOpen(false)}>Subscribe</Button>
            </DialogActions>
          </Dialog>
        </Paper>

        {/* Drawer */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Drawer
          </Typography>
          <Button variant="contained" onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 250, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Drawer Content
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary="About" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Paper>

        {/* List */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            List
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" secondary="Go to home page" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" secondary="View your profile" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" secondary="Manage your preferences" />
            </ListItem>
          </List>
        </Paper>

        {/* Menu */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Menu
          </Typography>
          <Button variant="contained" onClick={handleMenuClick}>
            Open Menu
          </Button>
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
            <MenuItem onClick={() => setMenuAnchor(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setMenuAnchor(null)}>My account</MenuItem>
            <MenuItem onClick={() => setMenuAnchor(null)}>Logout</MenuItem>
          </Menu>
        </Paper>

        {/* Pagination */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Pagination
          </Typography>
          <Stack spacing={2}>
            <Pagination count={10} />
            <Pagination count={10} color="primary" />
            <Pagination count={10} color="secondary" />
            <Pagination count={10} variant="outlined" />
            <Pagination count={10} variant="outlined" shape="rounded" />
            <Pagination count={10} size="small" />
            <Pagination count={10} size="large" />
            <Pagination count={10} showFirstButton showLastButton />
            <Pagination count={10} hidePrevButton hideNextButton />
          </Stack>
        </Paper>

        {/* Popover */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Popover
          </Typography>
          <Button variant="contained" onClick={handlePopoverClick}>
            Open Popover
          </Button>
          <Popover
            open={Boolean(popoverAnchor)}
            anchorEl={popoverAnchor}
            onClose={() => setPopoverAnchor(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography>The content of the Popover.</Typography>
            </Box>
          </Popover>
        </Paper>

        {/* Progress */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Progress
          </Typography>
          <Stack spacing={2}>
            <LinearProgress />
            <LinearProgress color="secondary" />
            <LinearProgress variant="determinate" value={50} />
            <LinearProgress variant="buffer" value={50} valueBuffer={70} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <CircularProgress />
              <CircularProgress color="secondary" />
              <CircularProgress variant="determinate" value={75} />
              <CircularProgress size={20} />
            </Box>
          </Stack>
        </Paper>

        {/* Radio */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Radio
          </Typography>
          <RadioGroup value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
            <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
            <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
            <FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />
          </RadioGroup>
        </Paper>

        {/* Rating */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Rating
          </Typography>
          <Stack spacing={2}>
            <Rating value={rating} onChange={(_, value) => setRating(value || 0)} />
            <Rating value={3} readOnly />
            <Rating value={2} disabled />
            <Rating value={4.5} precision={0.5} />
            <Rating value={1} size="small" />
            <Rating value={3} size="large" />
          </Stack>
        </Paper>

        {/* Skeleton */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Skeleton
          </Typography>
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </Stack>
        </Paper>

        {/* Slider */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Slider
          </Typography>
          <Box sx={{ width: 300 }}>
            <Stack spacing={2}>
              <Slider value={sliderValue} onChange={(_, value) => setSliderValue(value as number)} />
              <Slider defaultValue={50} step={10} marks min={0} max={100} />
              <Slider defaultValue={30} valueLabelDisplay="auto" />
              <Slider defaultValue={[20, 40]} valueLabelDisplay="on" />
              <Slider defaultValue={30} color="secondary" />
              <Slider defaultValue={30} disabled />
            </Stack>
          </Box>
        </Paper>

        {/* Snackbar */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Snackbar
          </Typography>
          <Button variant="contained" onClick={() => setSnackbarOpen(true)}>
            Open Snackbar
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message="Note archived"
            action={
              <Button color="inherit" size="small" onClick={() => setSnackbarOpen(false)}>
                UNDO
              </Button>
            }
          />
        </Paper>

        {/* Speed Dial */}
        <Paper sx={{ p: 3, position: 'relative', height: 320 }}>
          <Typography variant="h4" gutterBottom>
            Speed Dial
          </Typography>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {speedDialActions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Paper>

        {/* Stepper */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Stepper
          </Typography>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Select campaign settings</StepLabel>
            </Step>
            <Step>
              <StepLabel>Create an ad group</StepLabel>
            </Step>
            <Step>
              <StepLabel>Create an ad</StepLabel>
            </Step>
          </Stepper>
          <Box sx={{ mt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => prev - 1)}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              disabled={activeStep === 2}
              onClick={() => setActiveStep((prev) => prev + 1)}
            >
              Next
            </Button>
          </Box>
        </Paper>

        {/* Switch */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Switch
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={<Switch checked={switchChecked} onChange={(e) => setSwitchChecked(e.target.checked)} />}
              label="Checked"
            />
            <FormControlLabel control={<Switch />} label="Unchecked" />
            <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Secondary" />
            <FormControlLabel control={<Switch defaultChecked color="success" />} label="Success" />
            <FormControlLabel disabled control={<Switch />} label="Disabled" />
          </FormGroup>
        </Paper>

        {/* Table */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Table
          </Typography>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Calories</th>
                <th>Fat</th>
                <th>Carbs</th>
                <th>Protein</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Frozen yoghurt</td>
                <td>159</td>
                <td>6</td>
                <td>24</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Ice cream sandwich</td>
                <td>237</td>
                <td>9</td>
                <td>37</td>
                <td>4.3</td>
              </tr>
              <tr>
                <td>Eclair</td>
                <td>262</td>
                <td>16</td>
                <td>24</td>
                <td>6</td>
              </tr>
            </tbody>
          </table>
        </Paper>

        {/* Tabs */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Tabs
          </Typography>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={(_, value) => setTabValue(value)}>
                <Tab label="Item One" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">Item One Content</TabPanel>
            <TabPanel value="2">Item Two Content</TabPanel>
            <TabPanel value="3">Item Three Content</TabPanel>
          </TabContext>
        </Paper>

        {/* Text Field */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Text Field
          </Typography>
          <Stack spacing={2} sx={{ width: 300 }}>
            <TextField label="Outlined" variant="outlined" />
            <TextField label="Filled" variant="filled" />
            <TextField label="Standard" variant="standard" />
            <TextField label="Required" required />
            <TextField label="Disabled" disabled />
            <TextField label="Password" type="password" />
            <TextField label="Read Only" InputProps={{ readOnly: true }} defaultValue="Read only" />
            <TextField label="Number" type="number" />
            <TextField label="Search" type="search" />
            <TextField label="Helper text" helperText="Some important text" />
            <TextField label="Error" error helperText="Incorrect entry." />
            <TextField label="Multiline" multiline rows={4} defaultValue="Default Value" />
            <TextField
              label="Select"
              select
              value="option1"
            >
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </TextField>
          </Stack>
        </Paper>

        {/* Timeline */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Timeline
          </Typography>
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Eat</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Code</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Sleep</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>Repeat</TimelineContent>
            </TimelineItem>
          </Timeline>
        </Paper>

        {/* Toggle Button */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Toggle Button
          </Typography>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={(_, value) => value && setAlignment(value)}
          >
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="center">Center</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
            <ToggleButton value="justify" disabled>
              Justify
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>

        {/* Tooltip */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Tooltip
          </Typography>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add" arrow>
              <Button variant="contained">Arrow</Button>
            </Tooltip>
            <Tooltip title="You don't have permission to do this" placement="top">
              <span>
                <Button disabled>Top</Button>
              </span>
            </Tooltip>
            <Tooltip title="Bottom tooltip" placement="bottom">
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip title="Left tooltip" placement="left">
              <Button>Left</Button>
            </Tooltip>
            <Tooltip title="Right tooltip" placement="right">
              <Button>Right</Button>
            </Tooltip>
          </Stack>
        </Paper>

        {/* Tree View */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Tree View
          </Typography>
          <TreeView
            sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}
          >
            <TreeItem itemId="1" label="Applications">
              <TreeItem itemId="2" label="Calendar" />
              <TreeItem itemId="3" label="Chrome" />
              <TreeItem itemId="4" label="Webstorm" />
            </TreeItem>
            <TreeItem itemId="5" label="Documents">
              <TreeItem itemId="6" label="MUI">
                <TreeItem itemId="7" label="src">
                  <TreeItem itemId="8" label="index.js" />
                  <TreeItem itemId="9" label="tree-view.js" />
                </TreeItem>
              </TreeItem>
            </TreeItem>
          </TreeView>
        </Paper>

        {/* Transfer List - Manual Implementation */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Transfer List
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Transfer List는 사용자가 두 리스트 간에 항목을 이동할 수 있는 컴포넌트입니다.
            실제 구현은 프로젝트 요구사항에 따라 커스터마이징이 필요합니다.
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
}
