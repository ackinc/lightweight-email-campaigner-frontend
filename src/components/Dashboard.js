import React from 'react';
import Typography from '@material-ui/core/Typography';

import NewCampaignDialogComponent from './NewCampaign/NewCampaignDialog';

function DashboardComponent() {
  return (
    <div className="dashboard">
      <Typography variant="h6" color="inherit">
        Your Past Campaigns
      </Typography>

      <NewCampaignDialogComponent />
    </div>
  );
}

export default DashboardComponent;
