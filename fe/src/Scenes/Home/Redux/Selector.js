import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { getUserAddress } from '../../../Contract/contract';
import { reduce, map, find } from 'lodash';

const homeSelector = (state) => state.home;
const campaignsSelector = (state) => state.home.allCampaigns;

export const allCampaignsSelector = createSelector(homeSelector, (state) => state.allCampaigns);
export const userAddressSelector = createSelector(homeSelector, (state) => state.userAddress);
export const isLoadingSelector = createSelector(homeSelector, (state) => state.loading);
export const backedCampaignIdsSelector = createSelector(homeSelector, (state) => {
  return reduce(
    state.backedCampaignIds,
    (filtered, id) => {
      id = parseInt(id);
      if (id > 0) filtered.push(id);
      return filtered;
    },
    []
  );
});
export const myCampaignsSelector = createSelector(
  campaignsSelector,
  userAddressSelector,
  (items, address) => items.filter((item) => item.creator === address)
);

export const backedCampaignsSelector = createSelector(
  campaignsSelector,
  backedCampaignIdsSelector,
  (items, ids) => {
    console.log('supported:', ids);
    return map(ids, (id) => find(items, { id: id })).reverse();
  }
);
