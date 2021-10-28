import React, { useEffect } from 'react';

import {
  PlayersInfo,
  Table,
  TableHeader,
  TableBody
} from '../../Components';


import { useAppDispatch, useAppSelector } from '../../redux';
import { setPlayers } from '../../redux/reducer';
import { ResponseType } from '../../services';

type PlayersTableType = {
  columns: string[];
  playersResource: {
    read: () => ResponseType | Promise<ResponseType>;
  };
}

const PlayersTable: React.FC<PlayersTableType> = ({ columns, playersResource }) => {
  const playerObject = playersResource.read() as ResponseType;
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.players);

  useEffect(() => {
    if (!players.length) {
      const convertObjectToArray = () => {
        const indexes = Object.keys(playerObject);
        return indexes?.map(index => playerObject[index])
      };

      dispatch(setPlayers({ players: convertObjectToArray() }));
    }
  }, [dispatch, playerObject, players])

  return (
    <Table>
      <TableHeader columns={columns} />
      <TableBody>
        <PlayersInfo />
      </TableBody>
    </Table>
  )
};

export default PlayersTable;