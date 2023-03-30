import React from 'react';
import {FormControlLabel, Radio, RadioGroup, Slider, Switch, Typography,} from '@mui/material';
// import './Settings.module.scss';

export const DefaultSettingsT = {
    autoPlay: true,
    animation: "fade",
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: false,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: false,
    swipe: true
}


const Settings = ({settings, setSettings}) => {

    /** Default function for Switches */
    const toggler = (event) => {
        setSettings({
            ...settings,
            [event.target.value]: !settings[event.target.value]
        })
    }

    /** Default function for Radio Groups */
    const radio = (event) => {
        setSettings({
            ...settings,
            [event.target.name]: event.target.value
        })
    }

    /** Default function for Sliders */
    const slider = (event, value) => {
        console.log(event);
        console.log(value);
        setSettings({
            ...settings,
            [event.target.name]: value
        })
    }

    const Toggler = ({name}) => {
        return (
            <FormControlLabel
                control={
                    <Switch onChange={toggler} checked={settings[name]} value={name}
                            color="primary"/>
                }
                label={name}
                labelPlacement='end'
            />
        )
    }

    return (
        <>
            <div className="Options">
                <div>
                    <Typography>General Options</Typography>
                    <Toggler name="autoPlay"/>
                    <Toggler name="indicators"/>
                    <Toggler name="swipe"/>
                </div>

                <div>
                    <Typography>Navigation (Buttons) Options</Typography>
                    <Toggler name="cycleNavigation"/>
                    <Toggler name="navButtonsAlwaysVisible"/>
                    <Toggler name="navButtonsAlwaysInvisible"/>
                    <Toggler name='fullHeightHover'/>
                </div>

                <div>
                    <Typography>Animation Options</Typography>
                    <FormControlLabel
                        control={
                            <div>
                                <RadioGroup
                                    name="animation"
                                    value={settings.animation}
                                    onChange={radio}
                                    row
                                    style={{marginLeft: "10px"}}
                                >
                                    <FormControlLabel value="fade" control={<Radio color="primary"/>} label="Fade"/>
                                    <FormControlLabel value="slide" control={<Radio color="primary"/>} label="Slide"/>
                                </RadioGroup>
                            </div>
                        }
                        label=""
                    />

                    <FormControlLabel
                        control={
                            <div style={{width: '100%'}}>
                                {/* <Typography>
                                    Animation Duration in ms
                                </Typography> */}
                                <Slider
                                    defaultValue={500}
                                    getAriaValueText={() => `${settings.duration}ms`}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={100}
                                    marks
                                    min={100}
                                    max={3000}
                                    onChangeCommitted={(e, v) => {
                                        e.target.name = 'duration';
                                        slider(e, v);
                                    }}
                                />
                            </div>
                        }
                        label="Animation Duration in ms"
                        labelPlacement='bottom'
                    />
                </div>
            </div>
        </>
    )
}

export default Settings;