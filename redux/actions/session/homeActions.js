import { homeTypes } from '../../reduxConstants';

export const storeSocket = socket => dispach => dispach({
  type: homeTypes.STORE_SOCKET,
  payLoad: socket,
});
