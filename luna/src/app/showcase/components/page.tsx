'use client';

import { useState } from 'react';
import { Stack, Container, Typography, Box, Paper } from '@mui/material';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  AlertTitle,
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  IconButton,
  LoadButton,
  Checkbox,
  CheckboxLabel,
  Chip,
  Drawer,
  Menu,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  RadioLabel,
  Rating,
  Slider,
  Stepper,
  Step,
  StepLabel,
  Switch,
  SwitchLabel,
  TabContext,
  TabList,
  TabPanel,
  TextField,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Tooltip,
} from 'src/components';

// ----------------------------------------------------------------------

export default function ComponentsShowcasePage() {
  const [tabValue, setTabValue] = useState('1');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(30);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [rating, setRating] = useState(3);
  const [activeStep, setActiveStep] = useState(0);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={4}>
        <Typography variant="h3" gutterBottom>
          컴포넌트 쇼케이스
        </Typography>

        {/* Accordion */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Accordion
          </Typography>
          <Box>
            <Accordion defaultExpanded>
              <AccordionSummary>
                <Typography>첫 번째 아코디언</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  아코디언 내용입니다. 클릭하여 확장하거나 축소할 수 있습니다.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <Typography>두 번째 아코디언</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>두 번째 아코디언의 내용입니다.</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Paper>

        {/* Alert */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Alert
          </Typography>
          <Stack spacing={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              에러 메시지입니다.
            </Alert>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              경고 메시지입니다.
            </Alert>
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              정보 메시지입니다.
            </Alert>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              성공 메시지입니다.
            </Alert>
          </Stack>
        </Paper>

        {/* Autocomplete */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Autocomplete
          </Typography>
          <Autocomplete
            options={['옵션 1', '옵션 2', '옵션 3', '옵션 4', '옵션 5']}
            label="자동완성"
            placeholder="검색어를 입력하세요"
            sx={{ width: 300 }}
          />
        </Paper>

        {/* Avatar */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Avatar
          </Typography>
          <Stack direction="row" spacing={2}>
            <Avatar>A</Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>B</Avatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>C</Avatar>
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
          <Typography variant="h5" gutterBottom>
            Badge
          </Typography>
          <Stack direction="row" spacing={4}>
            <Badge badgeContent={4} color="primary">
              <Avatar>U</Avatar>
            </Badge>
            <Badge badgeContent={10} color="secondary">
              <Avatar>S</Avatar>
            </Badge>
            <Badge variant="dot" color="error">
              <Avatar>N</Avatar>
            </Badge>
          </Stack>
        </Paper>

        {/* Buttons */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Buttons
          </Typography>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                추가
              </Button>
              <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                삭제
              </Button>
              <Button variant="contained" color="success" endIcon={<SaveIcon />}>
                저장
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <ButtonGroup variant="contained">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
              </ButtonGroup>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
              <LoadButton loading variant="contained">
                Loading
              </LoadButton>
            </Stack>
          </Stack>
        </Paper>

        {/* Checkbox */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Checkbox
          </Typography>
          <Stack direction="row" spacing={2}>
            <Checkbox checked={checked} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked)} />
            <CheckboxLabel control={<Checkbox />} label="체크박스 라벨" />
            <CheckboxLabel control={<Checkbox defaultChecked />} label="기본 체크됨" />
            <CheckboxLabel control={<Checkbox disabled />} label="비활성화" />
          </Stack>
        </Paper>

        {/* Chip */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Chip
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label="Basic" />
            <Chip label="Clickable" onClick={() => {}} />
            <Chip label="Deletable" onDelete={() => {}} />
            <Chip label="Primary" color="primary" />
            <Chip label="Secondary" color="secondary" />
            <Chip label="Success" color="success" />
            <Chip label="Error" color="error" />
            <Chip label="Outlined" variant="outlined" />
            <Chip label="Filled" variant="filled" />
          </Stack>
        </Paper>

        {/* Drawer */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Drawer
          </Typography>
          <Button variant="contained" onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 250, p: 2 }}>
              <Typography variant="h6">Drawer Content</Typography>
              <Typography>This is the drawer content.</Typography>
            </Box>
          </Drawer>
        </Paper>

        {/* Menu */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Menu
          </Typography>
          <Button variant="contained" onClick={handleMenuClick}>
            Open Menu
          </Button>
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>메뉴 항목 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>메뉴 항목 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>메뉴 항목 3</MenuItem>
          </Menu>
        </Paper>

        {/* Pagination */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Pagination
          </Typography>
          <Stack spacing={2}>
            <Pagination count={10} />
            <Pagination count={10} color="primary" />
            <Pagination count={10} color="secondary" variant="outlined" />
            <Pagination count={10} shape="rounded" />
          </Stack>
        </Paper>

        {/* Radio */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Radio
          </Typography>
          <RadioGroup value={radioValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadioValue(e.target.value)}>
            <RadioLabel value="option1" control={<Radio />} label="옵션 1" />
            <RadioLabel value="option2" control={<Radio />} label="옵션 2" />
            <RadioLabel value="option3" control={<Radio />} label="옵션 3" />
          </RadioGroup>
        </Paper>

        {/* Rating */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Rating
          </Typography>
          <Stack spacing={2}>
            <Rating value={rating} onChange={(_event: React.SyntheticEvent, value: number | null) => setRating(value || 0)} />
            <Rating value={3} readOnly />
            <Rating value={2} disabled />
            <Rating value={4} precision={0.5} />
          </Stack>
        </Paper>

        {/* Slider */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Slider
          </Typography>
          <Box sx={{ width: 300 }}>
            <Slider value={sliderValue} onChange={(_event: Event, value: number | number[]) => setSliderValue(value as number)} />
            <Slider defaultValue={50} step={10} marks min={0} max={100} />
            <Slider defaultValue={[20, 40]} valueLabelDisplay="auto" />
          </Box>
        </Paper>

        {/* Stepper */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Stepper
          </Typography>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Step 1</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 2</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 3</StepLabel>
            </Step>
          </Stepper>
          <Box sx={{ mt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => prev - 1)}
              sx={{ mr: 1 }}
            >
              이전
            </Button>
            <Button
              variant="contained"
              disabled={activeStep === 2}
              onClick={() => setActiveStep((prev) => prev + 1)}
            >
              다음
            </Button>
          </Box>
        </Paper>

        {/* Switch */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Switch
          </Typography>
          <Stack direction="row" spacing={2}>
            <Switch checked={switchChecked} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSwitchChecked(e.target.checked)} />
            <SwitchLabel control={<Switch defaultChecked />} label="스위치 라벨" />
            <SwitchLabel control={<Switch />} label="기본 꺼짐" />
            <SwitchLabel control={<Switch disabled />} label="비활성화" />
          </Stack>
        </Paper>

        {/* Tabs */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Tabs
          </Typography>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange}>
                <MuiTab label="Tab 1" value="1" />
                <MuiTab label="Tab 2" value="2" />
                <MuiTab label="Tab 3" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">Tab 1 Content</TabPanel>
            <TabPanel value="2">Tab 2 Content</TabPanel>
            <TabPanel value="3">Tab 3 Content</TabPanel>
          </TabContext>
        </Paper>

        {/* TextField */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            TextField
          </Typography>
          <Stack spacing={2} sx={{ width: 300 }}>
            <TextField label="Standard" variant="standard" />
            <TextField label="Outlined" variant="outlined" />
            <TextField label="Filled" variant="filled" />
            <TextField label="With Helper Text" helperText="도움말 텍스트" />
            <TextField label="Error" error helperText="에러 메시지" />
            <TextField label="Disabled" disabled />
          </Stack>
        </Paper>

        {/* Timeline */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Timeline
          </Typography>
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Step 1</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Step 2</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
              </TimelineSeparator>
              <TimelineContent>Step 3</TimelineContent>
            </TimelineItem>
          </Timeline>
        </Paper>

        {/* Tooltip */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Tooltip
          </Typography>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Default tooltip">
              <Button>Default</Button>
            </Tooltip>
            <Tooltip title="Top tooltip" placement="top">
              <Button>Top</Button>
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
      </Stack>
    </Container>
  );
}