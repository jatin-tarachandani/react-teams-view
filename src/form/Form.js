import { useState } from "react";

import { useRef } from "react";

import * as microsoftTeams from '@microsoft/teams-js';

import { dropDownOptions, getSubFormMapping } from "./FormConfig.js";
import { makeStyles, shorthands, Dropdown, Option, Input, Label, Divider, Button, Dialog, DialogTrigger, DialogBody, DialogSurface, DialogContent, DialogActions } from "@fluentui/react-components";




const useStyles = makeStyles({
    // ...existing styles...

    root: {
        // Stack the label above the field
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Use 2px gap below the label (per the design system)
        ...shorthands.gap("2px"),
        // Prevent the example from taking the full width of the page (optional)
        // maxWidth: "300px",
        width: "70%",

    },
  
    header: {
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      fontWeight: "bold",
      
      
      paddingBottom: "10px",
    },
  
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginBottom: "10px",
    },
  
    input: {
        height: "35px",
        width: "100%",
        borderTopWidth: "2px",
        borderRightWidth: "2px",
        borderBottomWidth: "2px",
        borderLeftWidth: "2px",
        
        
        
        
      },

    subForm:{
        width : "100%",
    },

    button: {
        width: "100%",
        height: "35px",
    }
  });

function Form() {
    

    const [open, setOpen] = useState(false);
    const defaultValues = {
        clusterName: "",
        command: ""
    }
    const formRef = useRef(null);
    const [formData, setFormData] = useState(defaultValues);
    const [submitDisabled, setSubmitDisabled] = useState(true);

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
        setSubmitDisabled(false); //since we can't change command back to null, we can always submit, so the submit should NOT be disabled
        
        setFormData({ ...formData, "command": option.optionValue });
        setCommand(option.optionValue);

        console.log(option.optionValue);
    }

    function submitFormData(e) {
        e.preventDefault();

        console.log("Submit of Form Data");
        //setFormData({...formData, "clusterName": clustername});
        formData.clusterName = clustername;
        console.log(formData);
        try {
            microsoftTeams.dialog.submit(formData, '420f59d0-db6c-48f3-b9da-22702831c5f0');

            // microsoftTeams.tasks.submitTask(formData, '420f59d0-db6c-48f3-b9da-22702831c5f0');
        }
        catch (err) {
            console.log("teams.tasks.submit did not work, threw an error")
        }



        
        setFormData(defaultValues);
        setCommand('');
        setSubmitDisabled(true);
        setOpen(true);
    }

    return (
        <div className={styles.header}>

            {/* <h1>Jenkins Actions </h1> */}

            <form ref={formRef} onSubmit={(e) => { submitFormData(e); }} className={styles.root} style={{ 'margin': '30px' }}>
                <div className={styles.mainContainer}>
                    <Label htmlFor={"clusterNameInput"}>Cluster Name</Label>
                    <Input className={styles.input} style={{ 'marginBottom': '15px', 'fontWeight': 'bold'}} id="clusterNameInput" defaultValue={clustername} disabled />
                    <Label htmlFor={'command'}>Command</Label>
                    <Dropdown
                        className={styles.input}
                        id={'command'}
                        placeholder={'Select a command'}
                        value={formData.command}
                        onOptionSelect={(e, option) => { onCommandChange(e, option) }}
                    >
                        {dropDownOptions.map((option, index) => (
                            <Option key={index} value={option.key} >
                                {option.text}
                            </Option>
                        ))}
                    </Dropdown>
                </div>
                <Divider />
                <div className={styles.mainContainer} >
                    {Subform(formData, setFormData)}
                    {/* <Button styles = {styles.button} onClick={(e) => { submitFormData(e); }} appearance="primary" disabled={submitDisabled}>Submit</Button> */}
                    <Dialog open={open} onOpenChange={(e, data) => setOpen(data.open)}> 
                        <DialogTrigger>
                        <Button styles = {styles.button} onClick={(e) => { submitFormData(e); }} appearance="primary" disabled={submitDisabled}>Submit</Button>
                        </DialogTrigger>
                        <DialogSurface>
                            <DialogBody>
                                <DialogContent>Your message has been submitted!</DialogContent>
                                <DialogActions>
                                    <DialogTrigger>
                                        <Button appearance="primary">Close</Button>
                                    </DialogTrigger>
                                </DialogActions>
                            </DialogBody>
                        </DialogSurface>
                    </Dialog>
                </div>
            </form>
        </div>
    );
}


export default Form;