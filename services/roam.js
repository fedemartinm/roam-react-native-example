import Roam from 'roam-reactnative';
import AsyncStorage from '@react-native-community/async-storage';

const Configuration = {
  eventListenerStatus: true,
  geofenceEvents: false,
  locationEvents: true,
  locationListenerStatus: true,
  movingGeofenceEvents: false,
  tripsEvents: true,
};

const ErrorCodes = {
  InvalidUserId: 'GS402',
};

const createTestUser = async () => {
  return new Promise((resolve, reject) => {
    const handleCreateUserCallback = async (success) => {
      AsyncStorage.setItem('userId', success.userId);
      resolve(success.userId);
    };

    const handleCreateUserError = (error) => {
      reject(error);
    };

    Roam.createUser(
      'test-user',
      handleCreateUserCallback,
      handleCreateUserError,
    );
  });
};

const loadTestUser = async (id) => {
  return new Promise((resolve, reject) => {
    const handleLoadUserCallback = async (success) => {
      resolve(success.userId);
    };

    const handleLoadUserError = (error) => {
      reject(error.errorCode);
    };
    Roam.getUser(id, handleLoadUserCallback, handleLoadUserError);
  });
};

export const roam = {createTestUser, loadTestUser, Configuration, ErrorCodes};
