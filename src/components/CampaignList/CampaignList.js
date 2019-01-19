import React from 'react';

import Campaign from './Campaign';
import { getCampaigns } from '../../services/campaign';

class CampaignList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
      error: '',
    };
  }

  componentDidMount() {
    this.refreshCampaigns();
  }

  async refreshCampaigns() {
    let campaigns;
    try {
      campaigns = await getCampaigns();
    } catch (e) {
      if (e.name === 'AuthError') {
        this.setState({ error: 'Authentication failure. Please log out and log in again.' });
        // TODO: log the user out automatically
      } else {
        this.setState({ error: e.message });
      }
      return;
    }
    campaigns.sort((a, b) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
    this.setState({ campaigns });
  }

  render() {
    const { campaigns, error } = this.state;

    return (
      <div className="campaign-list" style={{ textAlign: 'center' }}>
        {error ?
          <div style={{ color: 'red' }}>{error}</div> :
          campaigns.map(campaign => <Campaign key={campaign.id} data={campaign} />)}
      </div>
    )
  }
}

export default CampaignList;
