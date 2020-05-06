import React from 'react';
import { HealthCheckEntry } from '../types';
import { Segment, Icon } from 'semantic-ui-react';

const healthRating = (rating: number) => {
  switch (rating) {
    case 0:
      return 'green';
    case 1:
      return 'yellow';
    case 2:
      return 'red';
    case 3:
      return 'black';
    default:
      return 'pink';
  }
};

const HealthCheckItem: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {
  return (
    <Segment>
      {entry.date} <Icon name='heartbeat' size='large' /> <br/>
      <p>{entry.description}</p>
      <Icon name='heart' color={healthRating(entry.healthCheckRating)} /><br/>
    </Segment>
  ); 
};

export default HealthCheckItem;
