import React from 'react';

import Campaign from './Campaign';
import { getCampaigns } from '../../services/campaign';
import { logoutUser } from '../../services/user'

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
        this.setState({ error: 'Your token has expired. Please log in again. Redirecting you to the log in page...' });

        // log the user out automatically
        logoutUser();
        setTimeout(() => window.location.href = "/", 4 * 1000);
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
          campaigns.length ?
            campaigns.map(campaign => <Campaign key={campaign.id} data={campaign} />) :
            <p>No campaigns to show</p>}
      </div>
    )
  }
}

export default CampaignList;
