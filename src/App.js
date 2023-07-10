import logo from './logo.svg';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import Form from './form/Form.js'
import { FluentProvider, teamsLightTheme, teamsDarkTheme } from '@fluentui/react-components';



function App() {
  try 
  {
    microsoftTeams.app.initialize();
  }
  catch(err)
  {
    console.log("Error in initializing teams");
  }
  
  return (
    <FluentProvider theme={teamsLightTheme} >
    <Form />
    </FluentProvider>
  );
}

export default App;
