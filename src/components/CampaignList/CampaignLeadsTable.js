import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getLeadsForCampaign } from '../../services/campaign';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      leads: null,
    };
  }

  toggleTable = () => {
    this.setState(({ hide }) => {
      if (hide && this.state.leads === null) this.getLeads();
      return { hide: !hide };
    });
  }

  async getLeads() {
    try {
      const leads = await getLeadsForCampaign(this.props.campaignId);
      this.setState({ leads });
    } catch (e) {
      alert(e.message);
      throw e;
      // TODO: if AuthError, ask user to log back in
      // else display the error somehow
    }
  }

  render() {
    const { classes } = this.props;
    const { hide, leads } = this.state;

    if (hide) return <Button color="primary" variant="outlined" onClick={this.toggleTable}>Show leads</Button>;

    return (
      <React.Fragment>
        <Button color="primary" variant="outlined" onClick={this.toggleTable}>Hide leads</Button>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">Delivered At</TableCell>
                <TableCell align="right">Opened At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads ?
                leads.map(lead => (
                  <TableRow key={lead.id}>
                    <TableCell component="th" scope="row">{lead.email}</TableCell>
                    <TableCell align="right">{lead.deliveredAt}</TableCell>
                    <TableCell align="right">{lead.openedAt}</TableCell>
                  </TableRow>
                )) :
                null}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  campaignId: PropTypes.number.isRequired,
};

export default withStyles(styles)(SimpleTable);
