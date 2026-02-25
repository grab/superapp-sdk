import { WrappedResponse } from '../../core/types';

/**
 * Result object containing the scanned QR code data
 */
export type ScanQRCodeResult = {
  /** The QR code content that was scanned */
  qrCode: string;
};

/**
 * Response from the scanQRCode method
 */
export type ScanQRCodeResponse = WrappedResponse<ScanQRCodeResult>;

/**
 * Request parameters for scanning QR codes
 */
export type ScanQRCodeRequest = {
  /** Title to display in the camera view (optional) */
  title?: string;
};
