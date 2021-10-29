import React, { Fragment } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux';
import { setFilterParams, setFilteredPlayers } from '../../redux/reducer';

import { filterByAge, filterByName, filterByPosition } from '../../utils';
import { PlayerType } from '../../services';

import {
  Input,
  Select,
  Button,
} from '../../Components';

type FiltersType = {
  dropDownOptions: any
};

const MIN_AGE = 18;
const MAX_AGE = 40;

const Filters: React.FC<FiltersType> = ({ dropDownOptions }) => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.players);
  const filterParams = useAppSelector((state) => state.filters.params);

  const { name, age, position } = filterParams;

  const resetAge = () => {
    const updatedParams = Object.assign({}, filterParams, { age: '' });
    dispatch(setFilterParams({ params: updatedParams }));
  };

  const checkAgeRange = (age: number, fn: () => void) => {
    const isvalidAgeRange = age >= MIN_AGE && age <= MAX_AGE;

    if (isNaN(age)) {
      return
    };

    if (age < 10 || isvalidAgeRange) {
      return fn();
    };

    resetAge();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    const updatedParams = Object.assign({}, filterParams, { [name]: value });
    dispatch(setFilterParams({ params: updatedParams }));
  };

  const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const age = Number(event.target.value);

    checkAgeRange(age, () => handleChange(event))
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const updatedParams = Object.assign({}, filterParams, { position: event.target.value });
    dispatch(setFilterParams({ params: updatedParams }));

    const searchResult = [...filterByPosition(event.target.value, players)];
    dispatch(setFilteredPlayers({ filteredPlayers: searchResult }));
  };

  const searchResult = () => {
    const byAge = Boolean(age);
    const byName = Boolean(name.length);
    const byPosition = Boolean(position.length);

    const isSearchingBy = byName || byPosition || byAge;

    if (isSearchingBy) {
      let searchResult: PlayerType[] = [...players];

      if (byAge) searchResult = [...filterByAge(Number(age), searchResult)];
      if (byName) searchResult = [...filterByName(name, searchResult)];
      if (byPosition) searchResult = [...filterByPosition(position, searchResult)];

      dispatch(setFilteredPlayers({ filteredPlayers: searchResult }));
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchResult();
    }
  };

  return (
    <Fragment>
      <Input
        placeholder="Player Name"
        name="name"
        value={filterParams.name}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <Select
        options={dropDownOptions}
        value={filterParams.position}
        onChange={handleSelectChange}
      />
      <Input
        name="age"
        value={filterParams.age === 0 ? '' : filterParams.age}
        placeholder="Age"
        onChange={handleAge}
        onKeyDown={handleKeyPress}
      />
      <Button>Search</Button>
    </Fragment>
  )
};

export default Filters;