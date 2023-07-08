import { useState } from "react";
import { Component } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import * as microsoftTeams from '@microsoft/teams-js';

import { Popup } from './Popup.js'
import { dropDownOptions, getSubFormMapping } from "./FormConfig.js";
import { makeStyles, shorthands, Dropdown, Option, Input, Label, useId, Divider, Button } from "@fluentui/react-components";



const useStyles = makeStyles({
    root: {
        // Stack the label above the field
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Use 2px gap below the label (per the design system)
        ...shorthands.gap("2px"),
        // Prevent the example from taking the full width of the page (optional)
        // maxWidth: "300px",

    },
});


function Form() {
    const [showPopup, setShowPopup] = useState(false);
    const defaultValues = {
        clusterName: "",
        command: "",
        data: {},
    }
    const formRef = useRef(null);
    const [formData, setFormData] = useState(defaultValues);
    const [submittable, setSubmittable] = useState(false);

    const params = new URLSearchParams(window.location.search);
    const clustername = params.get('clustername');
    // const clustername = "storyboard-es7";

    const [command, setCommand] = useState("clusterHealth");
    const styles = useStyles();




    function Subform(formData, setFormData) {
        return getSubFormMapping(command, formData, setFormData);
    }




    function onCommandChange(e, option) {
        e.preventDefault();
        setSubmittable(true); //since we can't change command back to null, we can always submit
        setFormData({ ...formData, "command": option.optionValue });
        setCommand(option.optionValue);

        console.log(option.optionValue);
    }

    function submitFormData(e) {
        e.preventDefault();

        console.log("Submit of Form Data");
        //setFormData({...formData, "clusterName": clustername});
        formData.clusterName = clustername;

        try {
            microsoftTeams.dialog.url.submit(formData);
        }
        catch (err) {
            console.log("teams.dialog.url.submit did not work, threw an error")
        }




        setFormData(defaultValues);
        setSubmittable(false);
        setShowPopup(true);

    }

    return (
        <div>
            <form ref={formRef} onSubmit={(e) => { submitFormData(e); }} className={styles.root} style={{ 'margin': '30px' }}>
                <Label htmlFor={"clusterNameInput"}>Cluster Name</Label>
                <Input id="clusterNameInput" style={{ 'width': '300px' }} defaultValue={clustername} disabled />
                <Label htmlFor={'command'}>Command</Label>
                <Dropdown
                    id={'command'}
                    placeholder={'Select a command'}
                    value={formData.command}
                    onOptionSelect={(e, option) => { onCommandChange(e, option) }}
                    style={{ 'width': '300px' }}
                >
                    {dropDownOptions.map((option, index) => (
                        <Option key={index} value={option.key} >
                            {option.text}
                        </Option>
                    ))}
                </Dropdown>
                <br />
                <Divider />
                <div>
                    {Subform(formData, setFormData)}
                </div>
                {submittable ? <Button type="submit" onClick={(e) => { submitFormData(e); }} appearance="primary" >Submit</Button> : <Button disabled appearance="primary">Submit</Button>}
                {/* <Button onClick={(e) => {submitFormData();}} appearance="primary">Submit</Button> */}
            </form>
        </div>
    );
}


export default Form;