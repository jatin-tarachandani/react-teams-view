
import {ClusterHealthForm} from "./subforms/ClusterHealthForm.js";
import {JStackForm} from "./subforms/JStackForm.js";

const dropDownOptions = [
    { key: "clusterHealth", text: "Cluster Health" },
    { key: "jStack", text: "JStack" },
];


function getSubFormMapping(command, formData, setFormData) {
    switch(command) {
        case "clusterHealth":
            return <ClusterHealthForm formData={formData} setFormData={setFormData} />;
            break;
        case "jStack":
            return <JStackForm formData={formData} setFormData={setFormData} />;
            break;
        case '': 
            return <div></div>;
        default:
            throw new Error("Invalid command");
    }
}

export {dropDownOptions, getSubFormMapping};