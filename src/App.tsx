import React, { Suspense } from 'react';
import './index.css';

import { Filters, PlayersTable } from './Components';

import { createResource } from './utils';
import { getPlayers } from './services';

const TABLE_COLUMNS = ["Player", "Position", "Nationality", "Age"];

const POSITIONS = [
  {
    label: "Attacking Midfield",
    value: "Attacking Midfield",
  },
  {
    label: "Central Midfield",
    value: "Central Midfield",
  },
  {
    label: "Centre-Back",
    value: "Centre-Back",
  },
  {
    label: "Centre-Forward",
    value: "Centre-Forward",
  },
  {
    label: "Defensive Midfield",
    value: "Defensive Midfield",
  },
  {
    label: "Keeper",
    value: "Keeper",
  },
  {
    label: "Left Midfield",
    value: "Left Midfield",
  },
  {
    label: "Left Wing",
    value: "Left Wing",
  },
  {
    label: "Left-Back",
    value: "Left-Back",
  },
  {
    label: "Right-Back",
    value: "Right-Back",
  },
];

const createPlayersResource = () => createResource(getPlayers());

const playersResource = createPlayersResource();

function App() {

  const PageTitle = () => (
    <div className="flex w-ful my-8 justify-center content-center">
      <span className="text-3xl">Football Player Finder</span>
    </div>
  );

  const InputsContainer: React.FC<{}> = ({ children }) => (
    <div className="flex w-full content-center justify-around py-4">
      {children}
    </div>
  );

  return (
    <div className="flex flex-col flex-1 h-screen font-sans px-4 bg-gray-50">
      <PageTitle />

      <InputsContainer>
        <Filters dropDownOptions={POSITIONS} />
      </InputsContainer>

      <Suspense fallback={<div>Loading Players</div>}>
        <PlayersTable columns={TABLE_COLUMNS} playersResource={playersResource} />
      </Suspense>

    </div >
  );
}

export default App;
