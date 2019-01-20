import { parse, format } from 'date-fns';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CampaignLeadsTable from './CampaignLeadsTable';

const styles = theme => ({
  root: {
    margin: '20px auto',
    width: '60%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function Campaign({ data, classes }) {
  const {
    id, name, subject, body, createdAt, n_leads, n_delivered, n_opened,
  } = data;
  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <DataList
          data={{
            'Campaign Name': name,
            'Created At': format(parse(createdAt), 'h:mma, D MMM YYYY'),
          }}
        />
        <DataList data={{
          '# Leads': n_leads,
          '% Delivered': `${Math.round(n_delivered / n_leads * 100)}%`,
          '% Opened': `${Math.round(n_opened / n_leads * 100)}%`,
        }}
        />
      </ExpansionPanelSummary>

      <ExpansionPanelDetails style={{ display: 'block' }}>
        <DataList
          data={{
            'Email Subject': subject,
            'Email Body': body,
          }}
          styles={{ width: '100%' }}
        />

        <CampaignLeadsTable campaignId={id} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

function DataList({ data, styles }) {
  return (
    <List dense={true} style={{ width: '50%', ...styles }}>
      {Reflect.ownKeys(data).map(k => (
        <ListItem key={k}>
          <ListItemText>
            <Typography variant="caption">{k}</Typography>
            <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>{data[k]}</Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

export default withStyles(styles)(Campaign);
