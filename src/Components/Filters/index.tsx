import React, { Fragment, useEffect } from 'react';

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

  const searchResult = () => {
    const byAge = Boolean(age);
    const byName = Boolean(name.length);
    const byPosition = Boolean(position.length);

    const isSearching = byName || byPosition || byAge;

    if (isSearching) {
      let searchResult: PlayerType[] = [];

      if (byAge) searchResult = [...filterByAge(Number(age), players)];
      if (byName) searchResult = [...filterByName(name, players)];
      if (byPosition) searchResult = [...filterByPosition(position, players)];

      console.log('==========> byPosition: ', byPosition)

      dispatch(setFilteredPlayers({ filteredPlayers: searchResult }));
    }
  }

  useEffect(() => {
    searchResult()
  }, [position, searchResult]);

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
  }

  return (
    <Fragment>
      <Input
        placeholder="Player Name"
        name="name"
        value={filterParams.name}
        onChange={handleChange}
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
      />
      <Button>Search</Button>
    </Fragment>
  )
};

export default Filters;