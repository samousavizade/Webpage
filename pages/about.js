import {React} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    ButtonGroup,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography, useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LiveIconComponent from "../components/live_icon_component";
import SchoolIcon from "@mui/icons-material/School";
import InterestsIcon from "@mui/icons-material/Interests";
import PersonIcon from "@mui/icons-material/Person";
import CodeIcon from "@mui/icons-material/Code";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import ScienceIcon from "@mui/icons-material/Science";
import {drawerSecondaryItemsParts} from "@/components/drawer_items";
import ConstructionIcon from '@mui/icons-material/Construction';
import useBreakpoint, {responsiveIconSize} from "@/components/use_breakpoint";

const elevationValue = 3;

const About = () => {
    const theme = useTheme()

    const sectionItems = [
        {
            id: 1,
            icon: <CodeIcon sx={{fontSize: 100}} color="primary"/>,
            title: "Programming",
            description: "Python - Julia - Java - C - C++ - Matlab",
        },
        {
            id: 2,
            title: "Technical",
            icon: <ArchitectureIcon sx={{fontSize: 100}} color="primary"/>,
            description:
                "Pandas - Plotly - FastAPI - ReactJS - PyTorch - OpenCV - HuggingFace ",
        },
        {
            id: 3,
            title: "Scientific",
            icon: <ScienceIcon sx={{fontSize: 100}} color="primary"/>,
            description:
                "ML - DL - CV - NLP - Statistics - Fin. Econometrics - Macroeconomics",
        },
    ];

    const iconSize = responsiveIconSize(useBreakpoint())


    return (
        <Grid container spacing={2} padding={3}>
            <Grid
                item
                key={"avatar-name-social_media_links"}
                xs={12}
                sm={12}
                md={5}
                lg={5}
            >
                <Paper elevation={elevationValue}>
                    <Stack
                        display="flex"
                        alignItems="center"
                        justifycontent="center"
                        spacing={2}
                        padding={2}
                    >
                        <Avatar
                            key={"avatar"}
                            alt="S.Alireza Mousavizade"
                            variant="rounded"
                            src="/static/me.png"
                            sx={{width: "100%", height: "100%"}}
                        />

                        <Typography textAlign={"center"} key={"full name"} variant="h4" component={"h2"}>
                            <b>
                                S. Alireza Mousavizade
                            </b>
                        </Typography>

                        <Typography textAlign={"center"} key={"university_name"} variant="h5" component={"h3"}>
                            <span style={{color: theme.palette.primary.main}}><b> Sharif</b></span> University of Technology
                        </Typography>

                        <Typography key={"departemnts_name"} variant="h6" component={"h5"}>
                            <span style={{color: theme.palette.primary.main}}><b>CS</b></span> and <span style={{color: theme.palette.primary.main}}><b>Econ</b></span> Department
                        </Typography>

                        <ButtonGroup
                            aria-label="large button group"
                        >

                            {drawerSecondaryItemsParts.map((item) => {
                                return (
                                    <LiveIconComponent
                                        key={item.title}
                                        text={item.title}
                                        icon={item.icon}
                                        to={item.to}
                                        sx={{fontSize: iconSize}}
                                    />
                                );
                            })}

                        </ButtonGroup>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item key={"cv-summary"} xs={12} sm={12} md={7} lg={7}>
                <Paper
                    style={{backgroundColor: "light-grey"}}
                    elevation={elevationValue}
                >
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="about-me"
                        >
                            <PersonIcon/>
                            <Typography marginLeft={1}>Bio</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant={"p"}>
                                Hi, My name is Alireza afnd I'm a Computer Science and Economics
                                student at Sharif University of Technology since 2018. I'm
                                interested in Natural Language Processing, Computer Vision,
                                Financial ML and Macroeconomics. My highlighted courses and it's
                                projects are described in the webpage.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="education"
                            id="education"
                        >
                            <SchoolIcon/>
                            <Typography marginLeft={1}>Education</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List
                                sx={{width: "100%"}}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton alignItems="flex-start">
                                    <ListItemIcon>
                                        <Avatar
                                            src="https://en.sharif.edu/documents/51481/1963774/Sharif-University-of-Technology.jpg/d16d578c-4a49-1489-1fb9-e2d6f7db7d6e?t=1667282361389"/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="BSc in Computer Science"
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{display: "inline"}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    2018 - now
                                                </Typography>
                                                {" — in Sharif University of Technology - as a Major"}
                                            </>
                                        }
                                    />
                                </ListItemButton>
                                <ListItemButton alignItems="flex-start">
                                    <ListItemIcon>
                                        <Avatar
                                            src="https://en.sharif.edu/documents/51481/1963774/Sharif-University-of-Technology.jpg/d16d578c-4a49-1489-1fb9-e2d6f7db7d6e?t=1667282361389"/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="BSc in Economics"
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{display: "inline"}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    2019 - now
                                                </Typography>
                                                {" — in Sharif University of Technology - as a Minor"}
                                            </>
                                        }
                                    />
                                </ListItemButton>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="experience"
                            id="experience"
                        >
                            <ConstructionIcon/>
                            <Typography marginLeft={1}>Experience</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List
                                sx={{width: "100%"}}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton alignItems="flex-start">
                                    <ListItemIcon>
                                        <Avatar
                                            variant={"rounded"}
                                            src="/static/risklab.jpg"/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Research Assistant"
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{display: "inline"}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    2022 - now
                                                </Typography>
                                                {" — RiskLab Middle East"}
                                                <br/>
                                                {"working on development of Fin. ML Julia and Python library "}
                                            </>
                                        }
                                    />
                                </ListItemButton>
                                <ListItemButton alignItems="flex-start">
                                    <ListItemIcon>
                                        <Avatar
                                            variant={"rounded"}
                                            src="/static/shomara.jfif"/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Research Assistant"
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{display: "inline"}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    2022 - 2023
                                                </Typography>
                                                {" — Shomara"}
                                                <br/>
                                                {"working on Double/Debiased Machine Learning algorithm for Causal Inference"}
                                            </>
                                        }
                                    />
                                </ListItemButton>
                                <ListItemButton alignItems="flex-start">
                                    <ListItemIcon>
                                        <Avatar
                                            variant={"rounded"}
                                            src="/static/risklab_ai.jfif"/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Junior Quant"
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{display: "inline"}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    2022 - now
                                                </Typography>
                                                {" — RiskLab AI"}
                                            </>
                                        }
                                    />
                                </ListItemButton>
                            </List>
                        </AccordionDetails>
                    </Accordion>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="interests"
                            id="interests"
                        >
                            <InterestsIcon/>
                            <Typography marginLeft={1}>Interests</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <dl>
                                <dt>Statistics</dt>
                                <dd>- Statistical Inference - Hyphotesis Testing</dd>
                                <dt>Sthochastic Process</dt>
                                <dd>- Martingle - Poisson Process - Markov Chain</dd>
                                <dt>Computer Vision</dt>
                                <dd>- Recognition - Detection</dd>
                                <dt>NLP</dt>
                                <dd>- LSTM - ELMO - Transformers - Bert</dd>
                                <dt>Financial ML</dt>
                                <dd>- Portfolio Optmiziation - Information Theory</dd>
                                <dt>Economics</dt>
                                <dd>- Macroeconomics - Financial Econometrics</dd>
                            </dl>
                        </AccordionDetails>
                    </Accordion>
                </Paper>
            </Grid>
            <Grid item key={"skills-header"} xs={12} sm={12} md={12} lg={12}>
                <Typography
                    textAlign={"center"}
                    style={{borderRadius: 5}}
                    sx={{backgroundColor: "primary.main"}}
                    color={theme.palette.text.primary}
                    variant="h3"
                >
                    Skills
                </Typography>
            </Grid>
            {sectionItems.map((item) => (
                <Grid
                    item
                    sx={{
                        height: 250,
                    }}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12 / sectionItems.length}
                    key={"skills-" + item.id}
                >
                    <Paper elevation={elevationValue} sx={{height: "100%"}}>
                        <Stack
                            display="flex"
                            alignItems="center"
                            justifycontent="center"
                            padding={2}
                        >
                            {item.icon}

                            <Typography textAlign={"center"} component={"h2"} variant="h4">
                                <b>{item.title}</b>
                            </Typography>

                            <Typography marginTop={2} textAlign={"center"} variant={"p"}>
                                {item.description}
                            </Typography>
                        </Stack>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default About;
