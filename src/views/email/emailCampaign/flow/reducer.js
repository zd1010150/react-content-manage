import { combineReducers } from 'redux';
import {

} from './actionType';

const mockCampaign = [
    {
        id: 0,
        name: '2018 Lottery',
        subscriberList: {
            id: 0,
            name: '2018 Lottery'
        },
        type: 'Advertisement',
        createdDate: '28-02-2018',
        startDate: '28/02/2018',
        endDate: '29/02/2018',
        createdBy: 'Wesley',
        status: 'open',
        description: 'Live account'
    }
]

const campaigns = (state = mockCampaign, action) => {
    const { type } = action;
    switch (type) {
        default:
            return state;
    }
};

const ui = (state = {}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    default:
      return state;
  }
};


export default combineReducers({
  ui,
    campaigns
});

