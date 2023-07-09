import { Dropdown, Input, Label, Option, makeStyles, shorthands } from "@fluentui/react-components";
import { useEffect } from "react";


const useStyles = makeStyles({
    root: {
        // Stack the label above the field
        display: "flex",
        flexDirection: "column",
        
        // Use 2px gap below the label (per the design system)
        ...shorthands.gap("2px"),
        // Prevent the example from taking the full width of the page (optional)
        width: '100%',
    },
    input: {

        height: "35px",

        marginBottom: "10px",
        height: "35px",
        width: "100%",
        borderTopWidth: "2px",
        borderRightWidth: "2px",
        borderBottomWidth: "2px",
        borderLeftWidth: "2px",

    },
});

function JStackForm({formData, setFormData}) {

    const defaultdata = {
        "nodeName": undefined,
        "jNumStacks": undefined,
        "jRegexThrd": undefined,
        "jRegexCls": undefined,
    }
    
    


    function updateDropdownData(e, val){
        e.preventDefault();
        // console.log("updating dropdown selection");
        // console.log(val.optionValue);
        setFormData({...formData, data: { ...formData.data, "nodeName": val.optionValue}});
    }

    function updateTextData(e, value) {
        e.preventDefault();
        setFormData({ ...formData, data: { ...formData.data, [e.target.id]: value.value} });
    }

    const params = new URLSearchParams(window.location.search);
    let pidStrings = ["node1:1234", "node2:4567"];

    try {
        const urlPidStrings = params.get("pidstring");
        if (urlPidStrings) {
            pidStrings = JSON.parse(urlPidStrings);
        }
    } catch (err) {
        console.log("Error in getting pidstring from URL");
    }

    

    return (
        <div className={useStyles().root}>
        <br />
        <Label htmlFor={'jProcID'}>JStack Process ID</Label>
        <Dropdown
            id={'jProcID'}
            placeholder="Select a nodename"
            value={formData.data.nodeName || ''}
            onOptionSelect={(e, option) => {updateDropdownData(e, option);}}
            className={useStyles().input}
        >
            {pidStrings.map((pidString, index) => (
                <Option key={index} value={pidString} >
                    {pidString}
                </Option>
            ))}
        </Dropdown>
        <Label htmlFor={"jNumStacks"}>Number of JStacks</Label>
        <Input className={useStyles().input} id="jNumStacks" type="number" value={formData.data.jNumStacks || ''} onChange={(e, data) => {updateTextData(e, data);}} />
        <Label htmlFor={"jRegexThrd"}> Only show threads matching this regex </Label>
        <Input className={useStyles().input} id="jRegexThrd" type="text" value={formData.data.jRegexThrd || ''} onChange={(e, data) => {updateTextData(e, data);}}/>
        <Label htmlFor={"jRegexCls"}> Only show classes matching this regex </Label>
        <Input className={useStyles().input} id="jRegexCls" type="text" value={formData.data.jRegexCls || ''} onChange={(e, data) => {updateTextData(e, data);}}/>
        <br />
        </div>
    );
}

export {JStackForm};