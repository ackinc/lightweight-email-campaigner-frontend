import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import NewCampaignFormComponent from './NewCampaignForm';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const btnStyles = {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
    };

    return (
      <div>
        <Fab variant="extended" color="primary" style={btnStyles} onClick={this.handleClickOpen}>
          <SendIcon style={{ margin: '10px' }} />
          Create Campaign
        </Fab>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a new campaign</DialogTitle>

          <DialogContent>
            <NewCampaignFormComponent onSubmit={this.handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
