import React from "react";
import Typography from "@material-ui/core/Typography";

import NewCampaignDialogComponent from "./NewCampaign/NewCampaignDialog";
import CampaignListComponent from "./CampaignList/CampaignList";

function DashboardComponent() {
  return (
    <div className="dashboard" style={{ backgroundColor: "#EEE" }}>
      <Typography variant="h3" color="inherit" style={{ padding: "40px 0" }}>
        Your Past Campaigns
      </Typography>

      <CampaignListComponent />

      <NewCampaignDialogComponent />
    </div>
  );
}

export default DashboardComponent;
