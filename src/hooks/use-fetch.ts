import { StatusCode } from 'status-code-enum';
import Swal from 'sweetalert2';

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
};
/* eslint-disable */
export default function useFetch(url: any, options = {}) {
  return fetch(url, { ...DEFAULT_OPTIONS, ...options })
    .then((res) => {
      if (res.status >= StatusCode.ServerErrorInternal) {
        Swal.fire('Server Internal Error');
        return;
      }
      if (res.status >= StatusCode.ClientErrorPaymentRequired) {
        Swal.fire('Server Error!');
        return;
      }
      return res.json();
    })
    .catch(() => Swal.fire('No Internet Connection'));
}
