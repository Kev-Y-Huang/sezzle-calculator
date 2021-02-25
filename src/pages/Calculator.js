import Keypad from "../components/Keypad";
import History from "../components/History";
import {Grid} from "@material-ui/core";

function Calculator() {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} alignContent={"center"}>
        <Keypad/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <History/>
      </Grid>
    </Grid>
  )
}

export default Calculator;
