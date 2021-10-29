import { PlayerType } from '../services';

export function createResource<T>(promise: Promise<T>): {
  read: () => T | Promise<T>
} {
  let status = 'PENDING';

  let result: T | Promise<any> = promise.then(
    resolve => {
      result = resolve;
      status = "SUCCESS";
    },
    rejected => {
      result = rejected;
      status = "ERROR"
    }
  );

  return {
    read: () => {
      if (status === 'PENDING') throw result;
      if (status === 'ERROR') throw result;
      if (status === 'SUCCESS') return result;
      throw new Error('This should be impossible');
    }
  }

};

export const isEven = (number: number) => number % 2 === 0 ? true : false;

export const getAge = (birth: string) => {
  const currentDate = new Date();
  const birthDate = new Date(birth);

  return currentDate.getFullYear() - birthDate.getFullYear();
};

export const filterByAge = (age: number, array: PlayerType[]) =>
  array.filter((player) => age === getAge(player.dateOfBirth));

export const filterByName = (name: string, array: PlayerType[]) =>
  array.filter((player) => player?.name?.toLowerCase().includes(name.toLowerCase()));

export const filterByPosition = (position: string, array: PlayerType[]) =>
  array.filter((player) => player?.position?.toLowerCase()?.includes(position.toLowerCase()));