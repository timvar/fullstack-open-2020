import React from 'react';
import { HospitalEntry } from '../types';
import { Segment, Icon } from 'semantic-ui-react';


const HospitalItem: React.FC<{entry: HospitalEntry}> = ({ entry }) => {
  return (
    <Segment>
      {entry.date} <Icon name='hospital' size='large' /> <br />
      {entry.description} <br />
    </Segment> 
  ); 
};

export default HospitalItem;
