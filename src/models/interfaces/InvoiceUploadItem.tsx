import ReviewStatus from '../enum/ReviewStatus';

export default interface InvoiceUploadItem {
  status: ReviewStatus;
  docName: string;
  fileName: string;
  url: string;
}
