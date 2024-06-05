// LatestEventComponent.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const LATEST_EVENT_QUERY = gql`
  query LatestEvent {
    latestEvent {
      id
      location
      participants
      dateTime
      eventType
      description
    }
  }
`;

const LatestEventComponent = () => {
  const { loading, error, data } = useQuery(LATEST_EVENT_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { location, participants, dateTime, eventType, description } = data.latestEvent;

  return (
    <section>
      <h2>Latest Event</h2>
      <p>Location: {location}</p>
      <p>Participants: {participants}</p>
      <p>Date & Time: {dateTime}</p>
      <p>Event Type: {eventType}</p>
      <p>Description: {description}</p>
    </section>
  );
};

export default LatestEventComponent;
