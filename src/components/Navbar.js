import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Welcome user {user.username}!
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
