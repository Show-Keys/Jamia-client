import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJamiyas } from '../features/jamiya/jamiyaSlice';

const JamiyaList = () => {
  const dispatch = useDispatch();
  const { jamiyas, loading, error } = useSelector((state) => state.jamiya);

  useEffect(() => {
    dispatch(fetchJamiyas());
  }, [dispatch]);

  return (
    <div>
      <h2>Available Jamiyas</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {jamiyas.map((jamiya) => (
          <li key={jamiya._id}>
            <h3>{jamiya.jcode}</h3>
            <p>{jamiya.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JamiyaList;