declare var swal: any;

export class AlertService {

  success(title: string, html: string) {
    swal({
      title: title,
      html: html,
      type: 'success'
    });
  };

  error(title: string, html: string) {
    swal({
      title: title,
      html: html,
      type: 'error'
    });
  };
}
