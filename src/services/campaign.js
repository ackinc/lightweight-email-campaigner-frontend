import { get, post } from "./http";

export async function getCampaigns() {
  const { campaigns } = await get("/campaigns", null, true);
  return campaigns;
}

export async function getLeadsForCampaign(campaignId) {
  const { leads } = await get(`/campaigns/${campaignId}/leads`, null, true);
  return leads;
}

export async function createCampaign(name, subject, body, leads) {
  await post("/campaigns", { name, subject, body, leads }, true);
}
