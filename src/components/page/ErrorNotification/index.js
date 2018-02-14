
import { notification } from 'antd';
import { markReadedError } from 'store/error/action';

const errorNotification = (store) => {
  store.subscribe(() => {
    const unReadErrors = store.getState().errors.errors.filter(item => !item.readed);
    unReadErrors.forEach((item) => {
      notification.error({
        message: item.msg,
        key: item.id,
      });
      store.dispatch(markReadedError(item.id));
    });
  });
};

export default errorNotification;

