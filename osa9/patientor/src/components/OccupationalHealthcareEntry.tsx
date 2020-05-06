import React from 'react';
import { OccupationalHealthCareEntry } from '../types';
import { Segment, Icon } from 'semantic-ui-react';

const OccupationalHealthcareItem: React.FC<{entry: OccupationalHealthCareEntry}> = ({ entry }) => {
  return (
    <Segment>
      {entry.date} <Icon name='user md' size='large' /> <br />
      {entry.description} <br />
    </Segment>
  ); 
};

export default OccupationalHealthcareItem;
