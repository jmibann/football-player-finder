import React, { Fragment, useState, useEffect } from 'react';

import { useAppSelector } from '../../redux';
import { isEven, getAge } from '../../utils';

const PlayersInfo: React.FC<{}> = () => {
  const { players, filteredPlayers } = useAppSelector((state) => state.players);
  const { isSearchingActive } = useAppSelector((state) => state.filters.params);

  const rowClass = (isEven: boolean) => `flex flex-row w-full ${isEven ? 'white' : 'bg-blue-100'}`;
  const cellClass = "flex w-1/4 justify-center items-center h-12 border border-blue-600 border-2";

  const list = isSearchingActive ? filteredPlayers : players;

  return (
    <Fragment>
      {
        list?.map(({ name, position, nationality, dateOfBirth }, idx) =>
          <tr key={`${idx}-${name}-${dateOfBirth}`} className={rowClass(isEven(idx))}>
            <td className={cellClass}>{name}</td>
            <td className={cellClass}>{position}</td>
            <td className={cellClass}>{nationality}</td>
            <td className={cellClass}>{getAge(dateOfBirth)}</td>
          </tr>
        )

      }
    </Fragment>
  )
};

export default PlayersInfo;
